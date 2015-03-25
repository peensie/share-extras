# Introduction #

This add-on provides a modified page footer component, which integrates a client-side module to provide page tracking using [Google Analytics](http://www.google.com/analytics/).

Tracking can be enabled on a per-site basis by adding the supplied _Trackable Container_ aspect to the site folder, using the Repository Browser. The _Tracking Enabled_ property supplied by the aspect must be set to true, and the _Tracking UID_ property should be set to the value of your Google Analytics site ID, i.e. UA-xxxxxx-x.

Alternatively, global tracking of Share usage can be enabled by setting `<global>true</global>` in the supplied configuration file `org/alfresco/components/tracking/footer.get.config.xml`.

The add-on should work with Alfresco version 3.3 and upwards.

# Download #

For **Alfresco 3.x**, download the **0.x** or **1.0** version. For **Alfresco 4.x**, download the **2.0** version.

[Download Google Analytics Tracking add-on](http://code.google.com/p/share-extras/downloads/list?q=google-analytics-tracking)

# Installation #

The component is packaged as a single JAR file for easy installation into Alfresco Share.

To install the component, simply drop the `google-analytics-tracking.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

In **Alfresco 4.x**, you need to enable the _Google Analytics tracking_ module within the module deployment console, once you have started Alfresco. You can access the console by visiting the following URL.

`http://servername:port/share/page/modules/deploy`

Once you have added the module to the Deployed list, you must then click **Apply Changes** to make the changes take effect.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Google%20Analytics%20Tracking
```

Change into the new directory

```
cd "Google Analytics Tracking"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant clean dist-jar
```

The command should build a JAR file named `google-analytics-tracking.jar` in the `dist` directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to _hot deploy_ the JAR file directly into a local Tomcat instance for testing. You will need to use the `hotcopy-tomcat-jar task` and set the `tomcat.home`
property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat clean dist-jar hotcopy-tomcat-jar
```

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Configuration #

To configure site-based tracking

  1. Log in to Alfresco Share and using the _Repository Browser_, navigate to the _Sites_ folder
  1. Locate the container for the site you wish to configure tracking for, then click **View Details** to bring up the detail page for the container
  1. In the _Folder Actions_ section of the detail page, click the **Manage Aspects** dialogue and use this to add the _Trackable Container_ aspect
  1. Now click the **Edit Properties** action to edit the tracking parameters, ensuring that the _Tracking Enabled_ property is set to true and that _Tracking UID_ is set to the value of your GA site ID

Alternatively, enable global tracking of Share usage by copying the file `alfresco/site-webscripts/org/alfresco/components/tracking/footer.get.config.xml` to the `tomcat/shared/classes/alfresco/web-extension/site-webscripts/org/alfresco/components/tracking` directory. In the newly created file, set `<global>true</global>` and enter your GA site ID in the `<trackingId></trackingId>` element. You will need to reload Share's web scripts or restart the application server for these settings to take effect.

Once this configuration has been applied, tracking will function automatically when users visit the relevant pages.

# Known Issues #