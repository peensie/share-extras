# Introduction #

This add-on provides a custom Spring Surf connector and client-side helper class, allowing easy OAuth-based access to external resources. It is a prerequisite for the Twitter, Yammer and LinkedIn dashlets provided by Share Extras.

# Download #

For **Alfresco 4.x**, download the **2.x** version of the add-on.

[Download Share OAuth add-on](http://code.google.com/p/share-extras/downloads/list?q=share-oauth)

# Installation #

The extension is packaged as a single JAR file for easy installation into Alfresco Share.

To install the component, drop the `share-oauth.jar` file into the following two directories within your Alfresco installation, and restart the application server.

  * tomcat/webapps/alfresco/WEB-INF/lib
  * tomcat/webapps/share/WEB-INF/lib

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Share%20OAuth
```

Change into the new directory

```
cd "Share OAuth"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant clean dist-jar
```

The command should build a JAR file named `share-oauth.jar` in the `dist` directory within your project, which you install by copying it into the `WEB-INF/lib` folder of the `alfresco` and `share` webapps.