# Introduction #

This project defines a custom dashlet allowing polls to be defined
within a site, which site users can then vote on, using the dashlet.

![http://share-extras.googlecode.com/svn/trunk/Site%20Poll%20Dashlet/site-poll-dashlet.png](http://share-extras.googlecode.com/svn/trunk/Site%20Poll%20Dashlet/site-poll-dashlet.png)
![http://share-extras.googlecode.com/svn/trunk/Site%20Poll%20Dashlet/site-poll-dashlet-results.png](http://share-extras.googlecode.com/svn/trunk/Site%20Poll%20Dashlet/site-poll-dashlet-results.png)

# Installation #

The dashlet is packaged as a single JAR file for easy installation into Alfresco Share.

To install the dashlet, simply drop the `site-poll-dashlet.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Site%20Poll%20Dashlet
```

Change into the new directory

```
cd "Site Poll Dashlet"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant clean dist-jar
```

The command should build a JAR file named `site-poll-dashlet.jar` in the `dist` directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to _hot deploy_ the JAR file directly into a local Tomcat instance for testing. You will need to use the `hotcopy-tomcat-jar task` and set the `tomcat.home`
property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat clean dist-jar hotcopy-tomcat-jar
```

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Usage #

  1. Log in to Alfresco Share and navigate to a site where you are a Site Manager
  1. Navigate to the **Data Lists** page
  1. If you have not done so before, create a new data list of type **Poll**
  1. Create your poll in the list by clicking the **New Item** button. Make sure you tick the **Enabled** checkbox and complete all other required fields.
  1. Navigate back to the site dashboard and click the **Customize Dashboard** button to edit the contents of the dashboard. Drag the dashlet into one of the columns from the list of dashlets to add it.
  1. Back on the dashboard, click **Configure** on the Site Poll dashlet and select the poll to display.
  1. Click **OK** to save the configuration and then refresh the page in your browser to make this take effect.
  1. The poll should now be displayed in the dashlet. After you have voted on it you will be able to see the current results.

# Known Issues #

  * By default, only members with the Site Contributor role or greater are able to vote in polls that you create. You can however allow Site Consumers to vote by changing the permission on the poll object, using the Repository Browser component in Share or via Alfresco Explorer.