[JsDoc Toolkit](http://code.google.com/p/jsdoc-toolkit/) is used for generating client-side API documentation for Share Extras add-ons, from inline [JSDoc](http://en.wikipedia.org/wiki/JSDoc) annotations.

## JSDoc Toolkit Usage ##

Since JSDoc syntax varies between implementations, two customisations are used to ensure that JsDoc Toolkit is able to properly interpret the syntax used within Share.

Firstly, a custom _Alfresco_ plugin is used to

  * Register functions and fields declared using the `YAHOO.extend()` method used extensively within Share
  * Register object constructors as distinct entities from the object definitions themselves
  * Correctly interpret the non-standard ordering of function parameter types within `@property` annotations in Share.

Second, a custom _Alfresco_ template is used to ensure the following

  * Object constructors are detailed separately from their methods
  * Line breaks within annotations and descriptions are replaced with HTML equivalents (since most Share JSDoc omits HTML tags)
  * Page headers with title elements are added to the top of each page
  * Styles are applied via an external stylesheet

### Installation ###

The customisations are intended to be installed within a JsDoc Toolkit 2.4.0 installation. At the time of writing, this is the latest available package from the project pages, although a 3.0 version appears to be in development.

The custom files are provided in a single ZIP file available from the [Downloads](http://code.google.com/p/share-extras/downloads/list) section of this site, named **alfresco-jsdoc-customisations-_version_.zip**. To install the files, extract the ZIP file to a temporary directory on your computer and move the extracted files into the following places in your JsDoc Toolkit installation.

  * Folder `alfresco` to `templates`
  * File `alfresco.js` to `app/plugins`
  * **Optionally** file `jsdoc-share.sh` to the parent directory of your JsDoc Toolkit installation

You should then set the environment variable `JSDOC_TOOLKIT` on your system to point to the location in which the `README.txt` and `jsrun.jar` files reside.

### Usage ###

See the file `README.txt` inside your JsDoc Toolkit for full instructions on how to use the tool.

The executable JAR file `jsrun.jar` can be used to execute the document generation, but must be called with some additional parameters when using the custom Alfresco template.

Before you start the process, you must create a directory where the output HTML files will be placed (e.g. `jsdoc-out`), and specify this in your command.

Also, after the process has completed you will need to copy the `static` directory and its contents from inside the `templates/alfresco` directory into the output directory. This will add the static CSS to style your pages.

JsDoc Toolkit can then be run from a command prompt, after you have changed into the base directory where your client-side JavaScript exists. The method is slightly different, depending on whether you are generating documentation for you own projects or for Alfresco Share.

### Usage in your own projects ###

For generating your project-specific documentation, change into the `source/web`, or equivalent, directory in your project structure

You can then use the `jsrun.jar` file directly, substituting the title, version title, base URL and version-specific URL parameters in the following command as appropriate for your app.

On Linux/UNIX, use

```
java -jar "$JSDOC_HOME/jsrun.jar" "$JSDOC_HOME/app/run.js" -a \
-t="$JSDOC_HOME/templates/alfresco" -d="jsdoc-out" * --recurse=5 \
--exclude="-min.js" -D="baseTitle:MyApp Client-side API" \
-D="baseUrl:http://myapp.org/jsdoc/" -D="version:x.x.x" \
-D="versionName:MyApp x.x.x"
```

On Windows, use

```
java -jar "%JSDOC_HOME%\jsrun.jar" "%JSDOC_HOME%\app\run.js" -a ^
 -t="%JSDOC_HOME%\templates\alfresco" -d="jsdoc-out" * ^
 --recurse=5 --exclude="-min.js" -D="baseTitle:MyApp Client-side API" ^
 -D="baseUrl:http://myapp.org/jsdoc/" -D="version:x.x.x" ^
 -D="versionName:MyApp x.x.x"
```

If you do not wish to include all sub-directories within your client-side source directory, you can substitute `*` above for the names of specific directories or script names, separated by spaces, You can also exclude specific files by adding additional `--exclude` options.

### Usage with Share client-side docs ###

For generating Share client-side documentation, you should first change into the exploded share webapp directory of your Tomcat installation, or manually explode the file `web-server/webapps/share.war` from the ZIP-format installation files into a specific directory manually.

You can then use the `jsrun.jar` file directly.

On Linux use

```
java -jar "$JSDOC_HOME/jsrun.jar" "$JSDOC_HOME/app/run.js" -a \
-t="$JSDOC_HOME/templates/alfresco" -d="jsdoc-out" js modules components \
--recurse=5 --exclude="-min.js" --exclude="yui-common.js" \
--exclude="bubbling.v2.1.js" --exclude="lightbox.js" \
--exclude="log4javascript.v1.4.1.js" --exclude="flash" --exclude="tiny_mce" \
--exclude="components/form/date.js" -D="baseTitle:Share Client-side API" \
-D="baseUrl:http://myco.org/jsdoc/" -D="version:community-4.0.a" \
-D="versionName:Community 4.0.a"
```

On Windows use

```
java -jar "%JSDOC_HOME%\jsrun.jar" "%JSDOC_HOME%\app\run.js" -a ^
 -t="%JSDOC_HOME%\templates\alfresco" -d="jsdoc-out" js modules components ^
 --recurse=5 --exclude="-min.js" --exclude="yui-common.js" ^
 --exclude="bubbling.v2.1.js" --exclude="lightbox.js" ^
 --exclude="log4javascript.v1.4.1.js" --exclude="flash" --exclude="tiny_mce" ^
 --exclude="components\form\date.js" -D="baseTitle:Share Client-side API" ^
 -D="baseUrl:http://myco.org/jsdoc/" -D="version:community-4.0.a" ^
 -D="versionName:Community 4.0.a"
```

On Linux, the shell script `jsdoc-share.sh` can used directly, although it must be in the parent directory of your JsDoc Toolkit installation, and the installation directory must be named `jsdoc-toolkit-2.4.0`, with the program files directly in there (not in any sub-directories).

For example, to generate documentation for a Community 4.0.a ZIP file download, in `jsdoc-out/community-4.0.a`, with the Share webapp pre-exploded into `alfresco-community-4.0.a/web-server/webapps/share`,

```
./jsdoc-share.sh -t "Alfresco Community 4.0.a" -p "community-4.0.a" \
"alfresco-community-4.0.a/web-server/webapps/share" "jsdoc-out/community-4.0.a"
```