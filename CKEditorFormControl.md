# Introduction #
This is an addon to Share forms that lets you use the CKEditor as a wysiwyg editor for online edits.
CKEditor, http://ckeditor.com/, is a separately developed tool, this addon provides the integration to Alfresco forms.
CKEditor is GPL, LGPL MPL Triple copy left licensed.

![http://share-extras.googlecode.com/svn/trunk/CKEditor%20Form%20Control/ckeditor-edit.png](http://share-extras.googlecode.com/svn/trunk/CKEditor%20Form%20Control/ckeditor-edit.png)
## Features ##
  * Standard CKEditor features
  * Load custom configuration files for customized toolbar and looks
  * Browse Share site images, thumbnails and large previews, and insert into page
  * Browser addon available in Swedish and English, the core CKEditor in 50+ languages.

# Usage #
The control should appear when you create a new html file, or edit an existing html file online.
To insert images from a Share site, select the images button, and then Browse Server.
![http://share-extras.googlecode.com/svn/trunk/CKEditor%20Form%20Control/ckeditor-filebrowser.png](http://share-extras.googlecode.com/svn/trunk/CKEditor%20Form%20Control/ckeditor-filebrowser.png)
To get a larger preview, click the thumbnail image. To select an image, click the name.

# Installation #
The CKEditor form control is packaged as a single JAR file for easy installation into Alfresco Share.

To install the control
  * Drop the `ckeditor-form-control.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation
  * Update your form configuration files. You can use the ckeditor-config-custom.xml ([download](http://share-extras.googlecode.com/svn/trunk/CKEditor%20Form%20Control/ckeditor-config-custom.xml.sample)) file by removing sample extension and place it in tomcat/shared/classes/alfresco/web-extension. This may override other changes you have made for forms. so use with caution.
  * Restart the application server.

## Forms configuration ##
In you forms configuration file, under apperance, add
```
<appearance>
   <field id="cm:content">
      <control template="/org/alfresco/components/form/controls/ckeditor.ftl">
         <control-param name="forceEditor">true</control-param>
      </control>
   </field>
</appearance>
```
To load a custom javascript based file use
```
<appearance>
   <field id="cm:content">
      <control template="/org/alfresco/components/form/controls/ckeditor.ftl">
         <control-param name="forceEditor">true</control-param>
         <control-param name="settingsfile">components/editors/ckeditor/my-config.js</control-param>
      </control>
   </field>
</appearance>
```
Path to custom settings file should not have a starting /. More information on how to create custom configuration files can be found in http://docs.cksource.com/CKEditor_3.x/Developers_Guide.
Use the http://share-extras.googlecode.com/svn/trunk/CKEditor%20Form%20Control/source/web/components/editors/ckeditor/config.js as a template.

## Loading forms dependencies ##
The `ckeditor-form-control.jar` includes configuration to load javascript [dependencies](http://wiki.alfresco.com/wiki/Forms#dependencies). However if you have other configuration in a custom config file this may overwrite this configuration. _Only do this step if CKEditor fails to load._
```
   	<config>
		<forms>
	        <dependencies>
	         <!-- Include some extra assets --> 
				<js src="/modules/editors/ckeditor/ckeditor.js" />
				<js src="/components/editors/ckeditor/ckeditorloader.js" />
	        </dependencies>
 		</forms>
	</config>
```
If you notice that the above javascript files do not load when creating or editing an html file, merge this configuration to your share-config-custom.xml file. Indication that this is happening is that the textarea is blank and the editor has failed to load.
# Building from source #
Check out the project if you have not already done so
```
svn checkout http://share-extras.googlecode.com/svn/trunk/CKEditor%20Form%20Control
```
Change into the new directory
```
cd "CKEditor form control"
```
An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the tomcat/shared/lib folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.
```
ant clean dist-jar
```
The command should build a JAR file named `ckeditor-form-control.jar` in the dist directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to hot deploy the JAR file directly into a local Tomcat instance for testing. You will need to use the hotcopy-tomcat-jar task and set the tomcat.home property in Ant.
```
ant -Dtomcat.home=C:/Alfresco/tomcat clean dist-jar hotcopy-tomcat-jar
```
After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Known Issues #
None at this time.
# Future Enhancements #
Possible to add more out of the box configuration settings.
Filters in image browser.

## External Components ##
  * LightBox (Image Previews) by Lokesh Dhakar http://huddletogether.com/projects/lightbox/
  * CKEditor, http://ckeditor.com/

## Contribution ##
This form control was contributed by Peter Löfgren, http://loftux.se (Swedish) http://loftux.com (English)