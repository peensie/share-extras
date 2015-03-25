

# Introduction #

This add-on project for Alfresco Share defines a [custom Document Library action](http://wiki.alfresco.com/wiki/Custom_Document_Library_Action) which can be configured into the Document Library component of Alfresco Share, for use by site members.

The custom action has been developed to install on top of an existing Alfresco 3.3 or 3.4 installation.

# Installation #

The dashlet is packaged as a JAR file for easy installation into Alfresco Share, although some additional steps are required after installing the JAR file to configure the action into the Document Library.

To install the action, drop the `share-backup-action.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

Once the JAR file has been deployed into your application server you will need to configure the Share application to display the action.

Firstly, copy the web script configuration file
`WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/documentlibrary/documentlist.get.config.xml`
from the Share webapp into the directory
`alfresco/web-extension/site-webscripts/org/alfresco/components/documentlibrary` in Tomcat’s `shared/classes` to override it. You should see a section
`<actionSet id="document">` which defines all the actions shown for a normal document in the document list view.

To add the backup action to this list, add the following line just before the `</actionset>` element for that block.

```
<action type="action-link" id="onActionBackup" permission="" label="actions.document.backup" />
```

If you also want the action to show up in the document details view, you need to copy the file `WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/document-details/document-actions.get.config.xml`
into `alfresco/web-extension/site-webscripts/org/alfresco/components/document-details` in `shared/classes`, and add the extra `<action>` definition in the same way.

Lastly, you need to ensure that the client-side JS and CSS assets get pulled into the UI as unfortunately the config files do not allow us to specify these dependencies.

To do this, you must override the file
`WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/documentlibrary/actions-common.get.head.ftl`. Copy this into the directory `alfresco/web-extension/site-webscripts/org/alfresco/components/documentlibrary` in `shared/classes` and add the following lines at the bottom of the file.

```
<#-- Custom Backup Action -->
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/components/documentlibrary/backup-action.css" />
<@script type="text/javascript" src="${page.url.context}/res/components/documentlibrary/backup-action.js"></@script>
```

Once you have made these changes you will need to restart Tomcat so that the configuration and your classpath resources in the JAR file are picked up.

Note: If you want the action to appear in the repository browsing pages or in Web Quick Start or DOD sites, you will also need to update the corresponding `.config.xml` and `.head.ftl` files for those page components.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Share%20Backup%20Action
```

Change into the new directory

```
cd "Share Backup Action"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant clean dist-jar
```

The command should build a JAR file named `share-backup-action.jar` in the `dist` directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to _hot deploy_ the JAR file directly into a local Tomcat instance for testing. You will need to use the `hotcopy-tomcat-jar task` and set the `tomcat.home` property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat clean dist-jar hotcopy-tomcat-jar
```

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

See Installation above for the additional steps, which are required after installing the JAR file to configure the action into the Document Library.

# Usage #

  1. Log in to Alfresco Share and navigate to any Document Library where you are a Site Contributor, Site Collaborator or Site Manager.
  1. Locate a document in the document list view and over over the actions list on the right hand-side of the row. You should see your action labelled _Backup_ in the _More..._ section when you expand this.
  1. If you have configured the action in the document details screen above, then click on the document in the list view to navigate to the Document Details screen. You should see the Backup action in the Actions list on the right hand side of the screen.
  1. You will find any files that you back up within a 'Backup' folder in the Document Library root folder. Note that the folder tree view on the left hand side of the document list screen will not automatically refresh to show this, so you will need to refresh the page manually.

# Screenshots #

![http://share-extras.googlecode.com/svn/trunk/Share%20Backup%20Action/backup-action-documentlist-cropped.png](http://share-extras.googlecode.com/svn/trunk/Share%20Backup%20Action/backup-action-documentlist-cropped.png)

Backup action in the Document List view

![http://share-extras.googlecode.com/svn/trunk/Share%20Backup%20Action/backup-action-document-details-cropped.png](http://share-extras.googlecode.com/svn/trunk/Share%20Backup%20Action/backup-action-document-details-cropped.png)

Backup action in the Document Details view