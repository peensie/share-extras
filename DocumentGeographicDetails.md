# Introduction #

This project provides an additional page component for the Document Details page to display a small map view for geotagged content items.

<img src='http://share-extras.googlecode.com/svn/trunk/Document%20Geographic%20Details/screenshots/document-geographic-info.png' border='1' />

The page component will display automatically for content items which already have the Geographic aspect applied to them. For other items, a custom Document library action named _Geotag_ is supplied, which can be enabled at install time.

![http://share-extras.googlecode.com/svn/trunk/Document%20Geographic%20Details/screenshots/geotag-action.png](http://share-extras.googlecode.com/svn/trunk/Document%20Geographic%20Details/screenshots/geotag-action.png)

The 4.x-compatible version also provides two other custom actions View in _OpenStreetMap_ and _View Location on Geohack_, which complement the out-of-the-box Google Maps-based view.

![http://share-extras.googlecode.com/svn/trunk/Document%20Geographic%20Details/screenshots/view-in-osm.png](http://share-extras.googlecode.com/svn/trunk/Document%20Geographic%20Details/screenshots/view-in-osm.png)

The add-on has been developed to install on top of an existing Alfresco
3.4 or 4.x installation. It can work with version 3.3 if the `cm:geographic` aspect is added to the repository's content model - see _Known Issues_ below.

# Download #

For **Alfresco 3.x**, download the **0.x** or **1.0** version. For **Alfresco 4.x**, download the **2.0** version.

[Download Document Geographic Details add-on](http://code.google.com/p/share-extras/downloads/list?q=document-geographic-details)

# Installation #

The component is packaged as a single JAR file for easy installation into Alfresco Share.

To install the component, simply drop the `document-geographic-details-{version}.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

# Configuration #

To add the map view to the Document Details screen you must enable the _Document Geographic Details Component_ module in the Share [Module Deployment console](ModuleDeployment.md), after Alfresco has started up.

## Custom Action Installation (Share 3.x, Optional) ##

See [README.txt](http://code.google.com/p/share-extras/source/browse/trunk/Document%20Geographic%20Details/README.txt) for instructions on how to enable the Geotag custom action in the Document Library in 3.3 and 3.4.

## Custom Actions Installation (Share 4.x, Optional) ##

The custom Geotag action is also supported on Alfresco 4.0, and is supplied with two other actions which allow you to choose [OpenStreetMap](http://www.openstreetmap.org/) or other map-based views.

You can enable the actions on both the document details and document list pages by adding the following configuration to your `share-config-custom.xml`.

```
   <config evaluator="string-compare" condition="DocLibActions">
      <actionGroups>
         <actionGroup id="document-browse">
            <action index="996" id="org_sharextras_document-view-osm" />
            <action index="997" id="org_sharextras_document-view-geohack" />
            <action index="998" id="org_sharextras_document-geotag" />
         </actionGroup>
         <actionGroup id="document-details">
            <action index="996" id="org_sharextras_document-view-osm" />
            <action index="997" id="org_sharextras_document-view-geohack" />
            <action index="998" id="org_sharextras_document-geotag" />
         </actionGroup>
      </actionGroups>
   </config>
```

If you only wish to show some of the actions, or only on the document details or document list page, then you can simply remove the other items.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Document%20Geographic%20Details
```

Change into the new directory

```
cd "Document Geographic Details"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant dist-jar
```

The command should build a JAR file named `document-geographic-details-{version}.jar` in the `dist` directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to _hot deploy_ the JAR file directly into a local Tomcat instance for testing. You will need to use the `hotcopy-tomcat-jar task` and set the `tomcat.home`
property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat hotcopy-tomcat-jar
```

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Usage #

  1. Log in to Alfresco Share and navigate to a site containing geotagged content in the Document Library. Any content items with the Geographic aspect applied and Latitude/Longitude properties set can be used, but geotagged photos from camera phones will have this information populated automatically.
  1. Locate one of the geotagged content item(s) and click into the _Document Details_ page.
  1. Scroll down the page to see the _Geographic Information_ section below the metadata list. Note that this section will only be shown on the page if latitude and longitude values are available and the Geographic aspect has been applied.

# Known Issues #

In order to work with version 3.3 of Alfresco, the `cm:geographic` aspect must be added to the file `contentModel.xml` in `tomcat/webapps/alfresco/WEB-INF/classes/alfresco/model`. Ensure you add it within the `<aspects>` element.

```
      <aspect name="cm:geographic">
         <title>Geographic</title>
         <properties>
            <property name="cm:latitude">
               <title>Latitude</title>
               <type>d:double</type>
            </property>
            <property name="cm:longitude">
               <title>Longitude</title>
               <type>d:double</type>
            </property>
         </properties>
      </aspect>
```