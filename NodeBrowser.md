# Introduction #

This project defines a Share administration console component to navigate and view information on nodes stored in the repository stores, similar to the Node Browser component in Alfresco Explorer.

![http://share-extras.googlecode.com/svn/trunk/Node%20Browser/screenshots/node-browser-search.png](http://share-extras.googlecode.com/svn/trunk/Node%20Browser/screenshots/node-browser-search.png)

# Installation #

The component is packaged as a single JAR file for easy installation into Alfresco Share. However as it includes a custom Java class, it must be installed directly into the webapp directory structure, rather than into `tomcat/shared/lib`.

To install the component, drop the `node-browser.jar` file into the following two directories within your Alfresco installation, and restart the application server.

  * tomcat/webapps/alfresco/WEB-INF/lib
  * tomcat/webapps/share/WEB-INF/lib

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Node%20Browser
```

Change into the new directory

```
cd "Node Browser"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant clean dist-jar
```

The command should build a JAR file named `node-browser.jar` in the `dist` directory within your project, which you can then copy into the webapp folders in your Alfresco installation, as in _Installation_, above.

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Usage #

  1. Log in to Alfresco Share and navigate to an Administration page such as Users or Groups
  1. In the left-hand-side navigation, click **Node Browser**
  1. Enter a [search](http://wiki.alfresco.com/wiki/Full_Text_Search_Query_Syntax) to return some results, e.g. `name:test`
  1. Click on a result to start browsing the nodes

# Known Issues #

  1. In version 3.4 The Node Browser does not appear automatically in the _More..._ drop-down menu in the Share header component, however you can [add it there](http://wiki.alfresco.com/wiki/Share_Header) with some basic configuration.