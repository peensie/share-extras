# Introduction #

This project defines a Javascript Console component for the Alfresco Share's
Administration Console, that enables the execution of arbitrary javascript code
in the repository.

![http://share-extras.googlecode.com/svn/trunk/Javascript%20Console/javascript-console-share/screenshots/jsconsole-01.png](http://share-extras.googlecode.com/svn/trunk/Javascript%20Console/javascript-console-share/screenshots/jsconsole-01.png)

This videos shows the Javascript Console in use:

<a href='http://www.youtube.com/watch?feature=player_embedded&v=simzAhXogUg' target='_blank'><img src='http://img.youtube.com/vi/simzAhXogUg/0.jpg' width='860' height=480 /></a>

# Installation #

The component has been developed to install on top of an existing Alfresco
3.4 or 4.0 installation. There are two different version in a zip archive, one for Alfresco 3.4.x and one for or 4.0.x.

When you have chosen the correct folder (3.4.x or 4.0.x) for your Alfresco version
you'll find two jar files within that folder. The javascript-console-repo.jar needs
to be copied into the Alfresco repository:

```
tomcat/webapps/alfresco/WEB-INF/lib/
```

The other file javascript-console-share.jar needs to be copied to the
corresponding folder in the Share webapp:

```
tomcat/webapps/share/WEB-INF/lib/
```

If you prefer the AMP deployment method you also find amp files in the respective
folder that you can install with the apply\_amps.sh or apply\_amps.bat utilities. Be
aware that you need to install both amps files: the repo-amp and the share-amp.

The deployment location has changed recently (with Javascript Console 0.5)
because the Javascript Console now uses Java classes that have to be deployed
to these locations and can NOT reside in tomcat/shared/lib anymore.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Javascript%20Console/
```

Change into the new directory

```
cd "Javascript Console/javascript-console-repo"
```

or

```
cd "Javascript Console/javascript-console-share"
```

depending on which part you want to change, build or deploy.

To build the individual JAR files, run the following command from the base
project directory.

```
ant -Dalfresco.sdk.dir=c:\dev\sdks\alfresco-enterprise-sdk-4.0.0 clean dist-jar
```

The command should build a JAR file named javascript-console-repo.jar or
javascript-console-share.jar in the 'dist' directory within your project.

There also is the javascript-console-dist project which builds both jar files
and creates a patched version for Alfresco 3.4.x which does not support all the
features of the version for 4.0.x. This project creates the AMP files as well.

To deploy the extension files into a local Tomcat instance for testing, you can
use the hotcopy-tomcat-jar task. You will need to set the tomcat.home
property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat clean hotcopy-tomcat-jar
```

Once you have run this you will need to restart Tomcat so that the classpath
resources in the JAR file are picked up.

# Usage #

  1. Log in to Alfresco Share and navigate to an Administration page such as Users or Groups
  1. In the left-hand-side navigation, click **Javascript Console**
  1. Enter Alfresco repository javascript code in the textarea at the top. Press the execute button to run the script.
  1. You can use the special print(..) javascript command to output messages to the output window.
  1. use Ctrl+Space for code completion. Note that only global objects and specific variables (document, space, variables ending in ...node) are completed.

For more info on using the Javascript Console have a look at Florian's blog series which explains certain usecases:

  1. [Using the Javascript Console: Creating and populating datalists](http://www.techbits.de/2011/10/18/using-the-javascript-console-creating-and-populating-datalists/)
  1. [Using the Javascript Console: Permission reporting](http://www.techbits.de/2011/11/06/using-the-javascript-console-permission-reporting/)


# Known Issues #