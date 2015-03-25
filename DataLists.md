

# Introduction #

This add-on project for Alfresco Share defines sample data list definitions for Alfresco Share. Currently there is just one 'Book List' definition but it is intended that other types will be added.

# Installation #

The data list definitions are packaged as a single JAR file for easy installation into Alfresco Share.

To install the dashlet, simply drop the `share-sample-datalists.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout "http://share-extras.googlecode.com/svn/trunk/Sample Data Lists"
```

Change into the new directory

```
cd "Sample Data Lists"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant clean dist-jar
```

The command should build a JAR file named `share-sample-datalists.jar` in the `dist` directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to _hot deploy_ the JAR file directly into a local Tomcat instance for testing. You will need to use the `hotcopy-tomcat-jar task` and set the `tomcat.home`
property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat clean dist-jar hotcopy-tomcat-jar
```

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Usage #

  1. Log in to Alfresco Share and navigate to the Data Lists page of a site in which you have Site Contributor permission or greater.
  1. Click the **New List** button on the left hand side. Select the Book List definition in the list and click **Submit** to create a new list.

# Known Issues #

If deployed into a Tomcat instance with the Web Quick Start web application (`wcmqs.war`) running, the data list works fine, but an error is displayed at Tomcat startup.

```
ERROR: org.springframework.web.servlet.DispatcherServlet - Context initialization failed
org.springframework.extensions.config.ConfigException: 10040000 Unable to locate evaluator implementation for 'model-type' for org.springframework.extensions.config.ConfigSectionImpl@1898bff (evaluator=model-type condition=dlexample:book replace=false)
        at org.springframework.extensions.config.BaseConfigService.processSection(BaseConfigService.java:457)
```

In this case you should find that moving the JAR file from `shared/lib` into your `webapps/share/WEB-INF/lib` folder fixes the issue.