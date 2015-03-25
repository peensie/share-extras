# Introduction #

This project defines three custom dashlets which you can use to interact with Twitter from within Alfresco Share.

**The dashlets require Alfresco 4.0, and for authenticated Twitter access require the Share Extras [OAuth extension](http://code.google.com/p/share-extras/wiki/ShareOAuth), version 2.2, is also needed. Older 3.x versions of Alfresco may use the standalone [Twitter Feed](TwitterFeedDashlet.md) or [Twitter Search](TwitterSearchDashlet.md) dashlets.**

[Download Twitter Dashlets add-on](#Download.md)

The **Twitter Feed dashlet** displays recent Tweets from any public Twitter user, or any public list belonging to a user.

![http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets/screenshots/twitter-timeline-dashlet-user.png](http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets/screenshots/twitter-timeline-dashlet-user.png)
![http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets/screenshots/twitter-timeline-dashlet-list.png](http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets/screenshots/twitter-timeline-dashlet-list.png)

The **Twitter Search dashlet** displays the results of a Twitter search in real-time, using the Twitter search API.

![http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets/screenshots/twitter-search-dashlet.png](http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets/screenshots/twitter-search-dashlet.png)

Finally, the **Twitter Timeline dashlet** allows you to connect to Twitter as an authenticated user and view your own Home timeline, mentions, favorites and direct messages.

![http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets/screenshots/twitter-timeline.png](http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets/screenshots/twitter-timeline.png)

You can view messages in the dashlet, and the standard Favorite, Reply and Retweet actions are available, as well as the ability to post a new Tweet.

![http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets/screenshots/twitter-new-tweet.png](http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets/screenshots/twitter-new-tweet.png)

# Download #

For **Alfresco 4.x**, download the **2.x** version of the add-on.

[Download Twitter Dashlets add-on](http://code.google.com/p/share-extras/downloads/list?q=twitter-dashlets)

**Authenticated Twitter access also requires the [Share OAuth extension](http://code.google.com/p/share-extras/wiki/ShareOAuth), version 2.2.**

# Installation #

The dashlets are packaged as a single JAR file for easy installation into Alfresco Share.

To install the dashlets, simply drop the `twitter-dashlets.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Twitter%20Dashlets
```

Change into the new directory

```
cd "Twitter Dashlets"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant clean dist-jar
```

The command should build a JAR file named `twitter-dashlets.jar` in the `dist` directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to _hot deploy_ the JAR file directly into a local Tomcat instance for testing. You will need to use the `hotcopy-tomcat-jar task` and set the `tomcat.home`
property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat clean dist-jar hotcopy-tomcat-jar
```

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Usage #

  1. Log in to Alfresco Share and navigate to your user dashboard (the Twitter Feed and Twitter Search dashlets can also be placed on a site dashboard).
  1. Click the _Customize Dashboard_ button to edit the contents of the dashboard and drag the dashlet into one of the columns from the list of dashlets.
  1. For the Twitter Feed and Search dashlets, use the _Configure_ button to change the feed displayed (you can specify any Twitter username on its own, or any list belonging to a user as _username/listname_.) or the search term used.
  1. For the Twitter Timeline dashlet click the Connect button if you have not previously done so. Once you have authorised the application you will be redirected to your user dashboard.

# Known Issues #

**Could not connect to Twitter as OAuth support is not available. Please contact your administrator.**

This status may be shown in the Twitter Timeline dashlet, which requires authenticated access to the Twitter API, if the [Share OAuth](ShareOAuth.md) add-on is not found. You must ensure that you have installed the Share OAuth JAR file inside the WEB-INF/lib folder of both the repository and Share webapps.