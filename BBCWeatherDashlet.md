# Introduction #

This add-on project for Alfresco Share defines a simple dashlet to display
current weather observations and a three day forecast for over 9,000 locations across the world. Data is sourced from the [BBC Weather RSS feeds](http://backstage.bbc.co.uk/data/WeatherFeeds).

![http://share-extras.googlecode.com/svn/trunk/BBC%20Weather%20Dashlet/screenshot.png](http://share-extras.googlecode.com/svn/trunk/BBC%20Weather%20Dashlet/screenshot.png)

# Installation #

The dashlet is packaged as a single JAR file for easy installation into Alfresco Share.

To install the dashlet, simply drop the `bbc-weather-dashlet.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/BBC%20Weather%20Dashlet
```

Change into the new directory

```
cd "BBC Weather Dashlet"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant clean dist-jar
```

The command should build a JAR file named `bbc-weather-dashlet.jar` in the `dist` directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to _hot deploy_ the JAR file directly into a local Tomcat instance for testing. You will need to use the `hotcopy-tomcat-jar task` and set the `tomcat.home`
property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat clean dist-jar hotcopy-tomcat-jar
```

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Usage #

  1. Log in to Alfresco Share and navigate to your user dashboard.
  1. Click the _Customize Dashboard_ button to edit the contents of the dashboard and drag the dashlet into one of the columns from the list of dashlets.