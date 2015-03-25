# Introduction #
This dashlets takes the Site name as input, and performs a Google search, limiting the search to what has been indexed the last 5 days. Search terms and number of days are configurable.
It does NOT show an index of your internal content.

![http://share-extras.googlecode.com/svn/trunk/Google%20Site%20News%20Dashlet/GoogleSiteNewsDashlet.png](http://share-extras.googlecode.com/svn/trunk/Google%20Site%20News%20Dashlet/GoogleSiteNewsDashlet.png)

The use case is a Marketing manager creating a product launch site. To able to monitor what is said about your company or your product, the marketing manager ads a dashlet that lists all that has recently been indexed by Google. This is why the dashlet was named Google Site News, but your usage may very well be for just displaying what Google has recently index for a selected search term.

# Installation #
The dashlet is packaged as a single JAR file for easy installation into Alfresco Share.

To install the dashlet, simply drop the `google-site-news-dashlet.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

# Building from source #
Check out the project if you have not already done so
```
svn checkout http://share-extras.googlecode.com/svn/trunk/Google%20Site%20News%20Dashlet
```
Change into the new directory
```
cd "Google Site News Dashlet"
```
An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the tomcat/shared/lib folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.
```
ant clean dist-jar
```
The command should build a JAR file named `google-site-news-dashlet.jar` in the dist directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to hot deploy the JAR file directly into a local Tomcat instance for testing. You will need to use the hotcopy-tomcat-jar task and set the tomcat.home property in Ant.
```
ant -Dtomcat.home=C:/Alfresco/tomcat clean dist-jar hotcopy-tomcat-jar
```
After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.
# Usage #
Add the dashlet to your Site Dashboard. The default search term used will be the site name/description. If you are happy with that, just leave it as is. If you want to change the search terms used, and the number of days the dashlet use as recent, as Site Administrator click **Configure**.
![http://share-extras.googlecode.com/svn/trunk/Google%20Site%20News%20Dashlet/GoogleSiteNewsConfig.png](http://share-extras.googlecode.com/svn/trunk/Google%20Site%20News%20Dashlet/GoogleSiteNewsConfig.png)

You can use normal Google search syntax to include or exclude search terms to get a more accurate search.
# Known Issues #
None at this time.
# Future Enhancements #
The tabs displayed, and the tab order are hard coded. You can change this to your liking, by changing the source and build the dashlet yourself. Preferably this would be configurable in the Configure dialog.
## Contribution ##
This Dashlet was contributed by Peter Löfgren, http://loftux.se

An earlier version was included in the Alfresco Developer Toolbox download. This updated version adds configurability.