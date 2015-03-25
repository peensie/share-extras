# Introduction #

This project defines a custom dashlet that displays recent Tweets from any public Twitter user, or any public list belonging to a user.

**For Alfresco 4.x, please see the combined [Twitter Dashlets](TwitterDashlets.md)** project instead.

![http://share-extras.googlecode.com/svn/trunk/Twitter%20Feed%20Dashlet/screenshots/twitter-timeline-dashlet-user.png](http://share-extras.googlecode.com/svn/trunk/Twitter%20Feed%20Dashlet/screenshots/twitter-timeline-dashlet-user.png)
![http://share-extras.googlecode.com/svn/trunk/Twitter%20Feed%20Dashlet/screenshots/twitter-timeline-dashlet-list.png](http://share-extras.googlecode.com/svn/trunk/Twitter%20Feed%20Dashlet/screenshots/twitter-timeline-dashlet-list.png)

# Installation #

The dashlet is packaged as a single JAR file for easy installation into Alfresco Share.

To install the dashlet, simply drop the `twitter-feed-dashlet.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Twitter%20Feed%20Dashlet
```

Change into the new directory

```
cd "Twitter Feed Dashlet"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant clean dist-jar
```

The command should build a JAR file named `twitter-feed-dashlet.jar` in the `dist` directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to _hot deploy_ the JAR file directly into a local Tomcat instance for testing. You will need to use the `hotcopy-tomcat-jar task` and set the `tomcat.home`
property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat clean dist-jar hotcopy-tomcat-jar
```

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Usage #

  1. Log in to Alfresco Share and navigate to a site dashboard.
  1. Click the _Customize Dashboard_ button to edit the contents of the dashboard and drag the dashlet into one of the columns from the list of dashlets.
  1. Use the _Configure_ button to change the feed displayed. You can specify any Twitter username on its own, or any list belonging to a user as _username/listname_.

# Known Issues #

  * If more than two instances of the dashlet are added to a dashboard, the dashlet may fail to update as it can exceed the rate limit imposed by Twitter on their API. To work around this you can increase the value of the `checkInterval` option in the client-side `twitter-user-timeline.js` from the default 60 seconds.