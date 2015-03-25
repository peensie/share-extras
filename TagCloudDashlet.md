# Introduction #

This project defines a custom dashlet that displays the list of tags defined in
the current site as a tag cloud.

![http://share-extras.googlecode.com/svn/trunk/Site%20Tags%20Dashlet/screenshot.png](http://share-extras.googlecode.com/svn/trunk/Site%20Tags%20Dashlet/screenshot.png)

# Installation #

The dashlet is packaged as a single JAR file for easy installation into Alfresco Share.

To install the dashlet, simply drop the `site-tags-dashlet-{version}.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Site%20Tags%20Dashlet
```

Change into the new directory

```
cd "Site Tags Dashlet"
```

An Ant build script is provided to build a JAR file containing the
custom files, which can then be installed into the `tomcat/shared/lib` folder
of your Alfresco installation.

To build the JAR file, run the following command from the base project
directory.

```
ant dist-jar
```

The command should build a JAR file named `site-tags-dashlet-{version}.jar`
in the `dist` directory within your project.

To deploy the dashlet files into a local Tomcat instance for testing, you can
use the `hotcopy-tomcat-jar task`. You will need to set the `tomcat.home`
property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat hotcopy-tomcat-jar
```

Once you have run this you will need to restart Tomcat so that the classpath
resources in the JAR file are picked up.

# Usage #

Log in to Alfresco Share and navigate to a site dashboard. Click the
_Customize Dashboard_ button to edit the contents of the dashboard and drag
the dashlet into one of the columns from the list of dashlets.