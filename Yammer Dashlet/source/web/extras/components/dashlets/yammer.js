/**
 * Copyright (C) 2010-2011 Share Extras contributors.
 */

/**
* Extras root namespace.
* 
* @namespace Extras
*/
if (typeof Extras == "undefined" || !Extras)
{
   var Extras = {};
}

/**
* Extras dashlet namespace.
* 
* @namespace Extras.dashlet
*/
if (typeof Extras.dashlet == "undefined" || !Extras.dashlet)
{
   Extras.dashlet = {};
}

/**
 * Yammer dashboard component.
 * 
 * @class Extras.dashlet.Yammer
 * @namespace Extras.dashlet
 * @author Will Abson
 */
(function()
{
   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom,
      Event = YAHOO.util.Event;

   /**
    * Alfresco Slingshot aliases
    */
   var $html = Alfresco.util.encodeHTML,
      $combine = Alfresco.util.combinePaths;

   /**
    * Dashboard Yammer constructor.
    * 
    * @param {String} htmlId The HTML id of the parent element
    * @return {Extras.dashlet.Yammer} The new component instance
    * @constructor
    */
   Extras.dashlet.Yammer = function Yammer_constructor(htmlId)
   {
      return Extras.dashlet.Yammer.superclass.constructor.call(this, "Extras.dashlet.Yammer", htmlId, ["selector", "event-delegate"]);
   };

   /**
    * Extend from Alfresco.component.Base and add class implementation
    */
   YAHOO.extend(Extras.dashlet.Yammer, Alfresco.component.Base,
   {
      /**
       * Object container for initialization options
       *
       * @property options
       * @type object
       */
      options:
      {
      },

      /**
       * OAuth helper for connecting to the Yammer service
       * 
       * @property oAuth
       * @type Extras.OAuthHelper
       * @default null
       */
      oAuth: null,

      /**
       * Fired by YUI when parent element is available for scripting
       * 
       * @method onReady
       */
      onReady: function Yammer_onReady()
      {
          // Cache DOM elements
          this.widgets.title = Dom.get(this.id + "-title");
          this.widgets.messages = Dom.get(this.id + "-messages");
          this.widgets.connect = Dom.get(this.id + "-connect");
          this.widgets.utils = Dom.get(this.id + "-utils");
          this.widgets.toolbar = Dom.get(this.id + "-toolbar");
          
          // Set up the clear credentials link
          Event.addListener(this.id + "-link-disconnect", "click", this.onDisconnectClick, this, true);
          
          // Set up the new post link
          Event.addListener(this.id + "-link-new-post", "click", this.onNewPostClick, this, true);
          
          // Delegate setting up the favorite/unfavorite and post reply links
          Event.delegate(this.widgets.messages, "click", this.onPostFavoriteClick, "a.yammer-favorite-link, a.yammer-favorite-link-on", this, true);
          Event.delegate(this.widgets.messages, "click", this.onPostReplyClick, "a.yammer-reply-link", this, true);
          
          // Set up the Connect button
          this.widgets.connectButton = new YAHOO.widget.Button(
             this.id + "-btn-connect",
             {
                disabled: true,
                onclick: {
                   fn: this.onConnectButtonClick,
                   obj: this.widgets.connectButton,
                   scope: this
                }
             }
          );
          
          this.oAuth = new Extras.OAuthHelper().setOptions({
              providerId: "yammer",
              endpointId: "yammer"
          });
          
          this.oAuth.init({
              successCallback: { 
                  fn: function Yammer_onReady_oAuthInit()
                  {
                      if (!this.oAuth.hasToken())
                      {
                          // Display the Connect information and button
                          Dom.setStyle(this.widgets.connect, "display", "block");
                          // Enable the button
                          this.widgets.connectButton.set("disabled", false);
                      }
                      else
                      {
                          // Run the success handler directly to load the messages
                          this.onAuthSuccess();
                      }
                  }, 
                  scope: this
              },
              failureCallback: { 
                  fn: function Yammer_onReady_oAuthInit() {
                      // Failed to init the oauth helper
                      Alfresco.util.PopupManager.displayMessage({
                          text: this.msg("error.initOAuth")
                      });
                  }, 
                  scope: this
              }
          });

          
      },
      
      /**
       * Callback method used to prompt the user for a verification code to confirm that the
       * application has been granted access
       * 
       * @method onRequestTokenGranted
       * @param {object} obj Object literal containing properties
       *    authToken {string} the value of the temporary token granted
       *    onComplete {function} the callback function to be called to pass back the value provided by the user
       */
      onRequestTokenGranted: function Yammer_onRequestTokenGranted(obj)
      {
          var authToken = obj.authToken,
              callbackFn = obj.onComplete,
              approvalUrl = "https://www.yammer.com/oauth/authorize?oauth_token=" + authToken;
          
          // Open a new window with the oauth confirmation page
          window.open(approvalUrl);
          
          Alfresco.util.PopupManager.getUserInput({
              title: this.msg("label.verification"),
              text: this.msg("label.verificationPrompt"),
              callback: 
              {
                  fn: function Yammer_onRequestTokenGranted_verifierCB(value, obj) {
                      if (value != null && value != "")
                      {
                          callbackFn(value);
                      }
                  },
                  scope: this
              }
          });
      },
      
      /**
       * Callback method to use to set up the dashlet when it is known that the authentication
       * has completed successfully
       * 
       * @method onAuthSuccess
       */
      onAuthSuccess: function Yammer_onAuthSuccess()
      {
          // TODO Wire this up with Bubbling, so multiple Yammer dashlets will work

          // Remove the Connect information and button, if they are shown
          Dom.setStyle(this.widgets.connect, "display", "none");

          // Enable the Disconnect button and toolbar
          Dom.setStyle(this.widgets.utils, "display", "block");
          Dom.setStyle(this.widgets.toolbar, "display", "block");
          
          this.loadMessages();
      },
      
      /**
       * Callback method when a problem occurs with the authentication
       * 
       * @method onAuthFailure
       */
      onAuthFailure: function Yammer_onAuthFailure()
      {
          Alfresco.util.PopupManager.displayMessage({
              text: this.msg("error.general")
          });
      },
      
      /**
       * Load messages from Yammer to display on the dashboard
       * 
       * @method loadMessages
       */
      loadMessages: function Yammer_loadMessages()
      {
          // Get the latest messages from the server
          this.oAuth.request({
              url: "/api/v1/messages.json",
              successCallback: {
                  fn: function(o) {
                      if (o.responseText == "")
                      {
                          // Seems an empty response means the credentials have expired, unfortunately no error is returned by Yammer
                          this.oAuth.clearCredentials();
                          this.oAuth.saveCredentials();
                      }
                      else
                      {
                          if (typeof o.json == "object")
                          {
                              this.renderTitle(o.json);
                              this.renderMessages(o.json);
                          }
                          else
                          {
                              Alfresco.util.PopupManager.displayMessage({
                                  text: this.msg("error.post-bad-resp-type")
                              });
                          }
                      }
                  },
                  scope: this
              },
              failureCallback: {
                  fn: function() {
                      Alfresco.util.PopupManager.displayMessage({
                          text: this.msg("error.loadMessages")
                      });
                  },
                  scope: this
              }
          });
      },
      
      /**
       * Render dashlet title
       * 
       * @method renderTitle
       */
      renderTitle: function Yammer_renderTitle(json)
      {
          if (json.meta && json.meta.feed_name)
          {
              var title = json.meta.feed_name,
                  desc = json.meta.feed_desc;
              this.widgets.title.innerHTML = this.msg("header.named", "<span title=\"" + desc + "\">" + title + "</span>");
          }
      },

      /**
       * Insert links into message text to highlight users, hashtags and links
       * 
       * @method _formatMessage
       * @private
       * @param {string} text The plain message
       * @param {object} refs Referenced objects
       * @return {string} The formatted text, with hyperlinks added
       */
      _formatMessage: function Yammer__formatMessage(text, refs)
      {
         var refsRe = /\[\[(\w+):(\w+)\]\]/gm;
         function formatRef(str, p1, p2, offset, s)
         {
             var ref = refs[p1][p2];
             if (ref)
             {
                 return "<a href=\"" + ref.web_url + "\">" + (p1 == "tag" ? "#" : "") + ref.name + "</a>";
             }
             else
             {
                 return str;
             }
         };
         text = text.replace(
               /https?:\/\/\S+[^\s.]/gm, "<a href=\"$&\">$&</a>").replace(refsRe, formatRef);
         return text;
      },
      
      /**
       * Generate messages HTML
       * 
       * @method renderMessages
       * @private
       */
      _messagesHTML: function Yammer_renderMessages(json)
      {
          var message, client, createdAt, url, postedLink, u, profileUri, mugshotUri, uname, userRefs = {}, ref, html = "";
          if (json.messages)
          {
              var references = {};
              for (var i = 0; i < json.references.length; i++)
              {
                  ref = json.references[i];
                  if (typeof references[ref.type] == "undefined")
                  {
                      references[ref.type] = {};
                  }
                  references[ref.type][ref.id] = ref;
              }
              var favorites = (json.meta && json.meta.liked_message_ids) ? json.meta.liked_message_ids : [];
              for (var i = 0; i < json.messages.length; i++)
              {
                  message = json.messages[i];
                  postedOn = message.created_at;
                  client = "<a href=\"" + message.client_url + "\">" + message.client_type + "</a>";
                  url = message.web_url;
                  u = references.user[message.sender_id]
                  profileUri = u ? u.web_url : null;
                  mugshotUri = u ? u.mugshot_url : null;
                  uname = u ? u.full_name : null;
                  userLink = "<a href=\"" + profileUri + "\" title=\"" + $html(uname) + "\" class=\"theme-color-1\">" + $html(uname) + "</a>";
                  postedLink = "<a href=\"" + url + "\"><span class=\"yammer-message-date\" title=\"" + postedOn + "\">" + this._relativeTime(new Date(postedOn)) + "</span><\/a>";
                  html += "<div class=\"yammer-message detail-list-item\">" + "<div class=\"yammer-message-hd\">" + 
                  "<div class=\"user-icon\"><a href=\"" + profileUri + "\" title=\"" + $html(uname) + "\"><img src=\"" + $html(mugshotUri) + "\" alt=\"" + $html(uname) + "\" width=\"48\" height=\"48\" /></a></div>" + 
                  "</div><div class=\"yammer-message-bd\">" + "<span class=\"screen-name\">" + userLink + "</span> " +
                  this._formatMessage(message.body.parsed, references) + "</div>" + "<div class=\"yammer-message-postedOn\">" +  // or message.body.parsed?
                  this.msg("text.msgDetails", postedLink, client) + " <span class=\"yammer-actions\"><a href=\"#\" class=\"yammer-favorite-link" +
                  (Alfresco.util.arrayContains(favorites, message.id) ? "-on" : "") + "\" id=\"" + 
                  this.id + "-favorite-link-" + message.id + "\"><span>" + 
                  this.msg("link.yammer-favorite") + "</span></a><a href=\"#\" class=\"yammer-reply-link\" id=\"" + 
                  this.id + "-reply-link-" + message.id + "\"><span>" + 
                  this.msg("link.yammer-reply") + "</span></a>" + "</span></div>" + "</div>";
              }
          }
          return html;
      },
      
      /**
       * Render Yammer messages
       * 
       * @method renderMessages
       */
      renderMessages: function Yammer_renderMessages(json)
      {
          this.widgets.messages.innerHTML = this._messagesHTML(json);
      },
      
      /**
       * Append additional Yammer messages
       * 
       * @method appendMessages
       */
      appendMessages: function Yammer_appendMessages(json)
      {
          this.widgets.messages.innerHTML += this._messagesHTML(json);
      },
      
      /**
       * Prepend additional Yammer messages
       * 
       * @method prependMessages
       */
      prependMessages: function Yammer_prependMessages(json)
      {
          this.widgets.messages.innerHTML = this._messagesHTML(json) + this.widgets.messages.innerHTML;
      },
      
      /**
       * Get relative time where possible, otherwise just return a simple string representation of the suppplied date
       * 
       * @method _relativeTime
       * @private
       * @param d {date} Date object
       */
      _relativeTime: function Yammer__getRelativeTime(d)
      {
          return typeof(Alfresco.util.relativeTime) === "function" ? Alfresco.util.relativeTime(d) : Alfresco.util.formatDate(d)
      },
      
      /**
       * Post a message
       *
       * @method _postMessage
       * @param replyToId {int} ID of message this is in reply to, null otherwise
       * @param titleId {int} Message ID to use for title text (optional)
       * @param promptId {int} Message ID to use for prompt text (optional)
       */
      _postMessage: function Yammer__postMessage(replyToId, titleId, promptId)
      {
         titleId = titleId || this.msg("label.new-post");
         promptId = promptId || this.msg("label.new-post-prompt");
         Alfresco.util.PopupManager.getUserInput({
             title: this.msg(titleId),
             text: this.msg(promptId),
             callback:
             {
                 fn: function Yammer_onNewPostClick_postCB(value, obj) {
                     if (value != null && value != "")
                     {
                         var dataObj = {
                                 body: value
                         };
                         if (replyToId)
                             dataObj.replied_to_id = replyToId;
                         
                         // Post the update
                         this.oAuth.request({
                             url: "/api/v1/messages.json",
                             method: "POST",
                             dataObj: dataObj,
                             requestContentType: Alfresco.util.Ajax.FORM,
                             successCallback: {
                                 fn: function(o) {
                                     if (o.responseText == "")
                                     {
                                         Alfresco.util.PopupManager.displayMessage({
                                             text: this.msg("error.post-empty-resp")
                                         });
                                     }
                                     else
                                     {
                                         if (typeof o.json == "object")
                                         {
                                             this.prependMessages(o.json);
                                         }
                                         else
                                         {
                                             Alfresco.util.PopupManager.displayMessage({
                                                 text: this.msg("error.post-bad-resp-type")
                                             });
                                         }
                                     }
                                 },
                                 scope: this
                             },
                             failureCallback: {
                                 fn: function() {
                                     Alfresco.util.PopupManager.displayMessage({
                                         text: this.msg("error.post-message")
                                     });
                                 },
                                 scope: this
                             }
                         });
                     }
                 },
                 scope: this
             }
         });
      },
      

      /**
       * YUI WIDGET EVENT HANDLERS
       * Handlers for standard events fired from YUI widgets, e.g. "click"
       */


      /**
       * Click handler for Connect button
       *
       * @method onConnectButtonClick
       * @param e {object} HTML event
       */
      onConnectButtonClick: function Yammer_onConnectButtonClick(e, obj)
      {
         // Disable the button while we make the request
         this.widgets.connectButton.set("disabled", true);

         if (!this.oAuth.isAuthorized()) // Double-check we are still not connected
         {
             this.oAuth.requestToken({
                 successCallback: { 
                     fn: this.onAuthSuccess, 
                     scope: this
                 },
                 failureCallback: { 
                     fn: this.onAuthFailure, 
                     scope: this
                 },
                 requestTokenHandler:  { 
                     fn: this.onRequestTokenGranted, 
                     scope: this
                 }
             });
         }
         else
         {
             this.onAuthSuccess();
         }
      },
      
      /**
       * Click handler for Disconnect link
       *
       * @method onDisconnectClick
       * @param e {object} HTML event
       */
      onDisconnectClick: function Yammer_onDisconnectClick(e, obj)
      {
         // Prevent default action
         Event.stopEvent(e);
         
         var me = this;
         
         Alfresco.util.PopupManager.displayPrompt({
             title: this.msg("title.disconnect"),
             text: this.msg("label.disconnect"),
             buttons: [
                 {
                     text: Alfresco.util.message("button.ok", this.name),
                     handler: function Yammer_onDisconnectClick_okClick() {
                         me.oAuth.clearCredentials();
                         me.oAuth.saveCredentials();
                         // Remove existing messages
                         me.widgets.messages.innerHTML = "";
                         // Display the Connect information and button
                         Dom.setStyle(me.widgets.connect, "display", "block");
                         // Enable the button
                         me.widgets.connectButton.set("disabled", false);
                         // Disable the Disconnect button and toolbar
                         Dom.setStyle(me.widgets.utils, "display", "none");
                         Dom.setStyle(me.widgets.toolbar, "display", "none");
                         this.destroy();
                     },
                     isDefault: true
                 },
                 {
                     text: Alfresco.util.message("button.cancel", this.name),
                     handler: function Yammer_onDisconnectClick_cancelClick() {
                         this.destroy();
                     }
                 }
             ]
         });
      },
      
      /**
       * Click handler for New Post link
       *
       * @method onNewPostClick
       * @param e {object} HTML event
       */
      onNewPostClick: function Yammer_onNewPostClick(e, obj)
      {
         // Prevent default action
         Event.stopEvent(e);
         this._postMessage(null);
      },
      
      /**
       * Click handler for Post Reply link
       *
       * @method onPostReplyClick
       * @param e {object} HTML event
       */
      onPostReplyClick: function Yammer_onPostReplyClick(e, matchEl, containerEl)
      {
         // Prevent default action
         Event.stopEvent(e);
         var replyToId = matchEl.id.substring(matchEl.id.lastIndexOf("-") + 1);
         this._postMessage(replyToId, "label.reply", "label.reply-prompt");
      },
      
      /**
       * Click handler for Favorite link
       *
       * @method onPostFavoriteClick
       * @param e {object} HTML event
       */
      onPostFavoriteClick: function YammerTimeline_onPostFavoriteClick(e, matchEl, obj)
      {
         // Prevent default action
         Event.stopEvent(e);
         
         var msgId = matchEl.id.substring(matchEl.id.lastIndexOf("-") + 1), // Message id
             isFavorite = Dom.hasClass(matchEl, "yammer-favorite-link-on"),
             method = !isFavorite ? "POST" : "DELETE",
             urlParams = !isFavorite ? "" : "?message_id=" + encodeURIComponent(msgId),
             dataObj = !isFavorite ? { message_id: msgId } : null,
             newClass = !isFavorite ? "yammer-favorite-link-on" : "yammer-favorite-link",
             oldClass = !isFavorite ? "yammer-favorite-link" : "yammer-favorite-link-on",
             errMsgId = !isFavorite ? "error.favorite" : "error.unfavorite";
         
         this.oAuth.request({
             url: "/api/v1/messages/liked_by/current.json" + urlParams,
             method: method,
             dataObj: dataObj,
             requestContentType: Alfresco.util.Ajax.FORM,
             successCallback: {
                 fn: function(o) {
                     Dom.addClass(matchEl, newClass);
                     Dom.removeClass(matchEl, oldClass);
                 },
                 scope: this
             },
             failureCallback: {
                 fn: function() {
                     Alfresco.util.PopupManager.displayMessage({
                         text: this.msg(errMsgId)
                     });
                 },
                 scope: this
             }
         });
      },
      
   });
   
})();
