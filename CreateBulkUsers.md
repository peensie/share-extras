# Introduction #

This add-on provides a Share administration console component to bulk-create repository users.

![http://share-extras.googlecode.com/svn/trunk/Create%20Bulk%20Users/screenshots/create-bulk-users.png](http://share-extras.googlecode.com/svn/trunk/Create%20Bulk%20Users/screenshots/create-bulk-users.png)

Although similar to the capability provided in the Users console enhancements currently in development, this component offers a dedicated user interface with many options for customising the way in which users are created.

Specifically the add-on provides support for

  * Either JSON or CSV input data
  * Customising which mandatory and optional fields are provided, plus the order of fields in the case of CSV data
  * Automatic username and password generation, based on configurable policies
  * Flexible logging of a report of all accounts created
  * Template-based e-mail notifications to users containing their account credentials

The add-on should work with Alfresco version 3.3 and onwards.

# Installation #

The component is packaged as a single JAR file for easy installation into Alfresco Share.

To install the component, simply drop the `create-bulk-users.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Create%20Bulk%20Users
```

Change into the new directory

```
cd "Create Bulk Users"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant clean dist-jar
```

The command should build a JAR file named `create-bulk-users.jar` in the `dist` directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to _hot deploy_ the JAR file directly into a local Tomcat instance for testing. You will need to use the `hotcopy-tomcat-jar task` and set the `tomcat.home`
property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat clean dist-jar hotcopy-tomcat-jar
```

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Usage #

  1. Log in to Alfresco Share and navigate to an Administration page such as Users or Groups
  1. In the left-hand-side navigation, click **Create Bulk Users**
  1. Type or paste in your CSV or JSON data into the User Data field. Click _Help_ for details of the data format required.
  1. Click on **Create Users** to create accounts using the supplied details

# Customisation #

To change the default behaviour of the utility (e.g. logging, e-mail templates, parameter order), review the repository web script configuration file [create-users.post.config.xml](http://code.google.com/p/share-extras/source/browse/trunk/Create%20Bulk%20Users/config/alfresco/templates/webscripts/org/sharextras/slingshot/admin/create-users.post.config.xml) and override this using the normal mechanism in your installation.

# Known Issues #