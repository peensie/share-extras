Anyone can help contribute to Share Extras by trying out the existing add-ons and providing feedback. Simple comments will be accepted on the individual wiki pages, but if you have specific issues please raise these in the Issues section for further investigation. Detailed issues that are posted as comments may be removed.

# Enhancements #

An enhancement to an existing add-on may be a new feature, a translation in your local language or a fix for a specific issue.

If you have an idea for an enhancement that would benefit you or are willing to implement an enhancement yourself, please start by checking in the Issues section to see if anyone else has logged something similar. If not, you can add a new Issue of type **Enhancement request**.

By submitting any additional code, configuration or documentation, you agree to license the content under the current project license. At the time of writing this is the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

# New Add-ons #

Ideas for new add-ons can also be submitted as Enhancement requests. You are also recommended to send an email to the [development list](http://groups.google.com/group/share-extras-devel).

If this is for a new add-on that you have implemented yourself, please mention this in the Enhancement request.

The Project Owners will decide whether a new add-on should be accepted. If accepted, the code should initially be added to the **Sandbox** directory within the Source tree.

By submitting code, configuration or documentation for your add-on, you agree to license the content under the current project license. At the time of writing this is the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0). You must have the authority to release your content under this license, but note this does not affect ownership of the content.

## Top-Level Add-ons ##

Once an add-on is considered sufficiently mature, it can be promoted to a top-level add-on. Top-level add-ons are listed in the Project Description text on the Share Extras front page.

The Project Owners will decide whether a sandboxed add-on should be promoted. Typical criteria for promotion include, but are not limited to the following.

  * An acceptable project name has been defined and this is consistent across all add-on files
  * An appropriate source tree layout has been defined, consistent with the SampleProject dashlet, including the latest stock Ant build script `build.xml` and library dependencies from that project
  * All code to be consistent with the Alfresco [Coding Standards](http://wiki.alfresco.com/wiki/Coding_Standards), specifically using 4-space tabbing, spaces instead of tabs and braces generally on new lines within JavaScript and Java code.
  * A `MAINTAINERS.txt` and `README.txt` file exist in the add-on's base directory and contain complete and relevant information for the add-on
  * All add-on files must be packaged in an appropriate directory structure and should avoid the use of Alfresco-reserved packages (e.g. `org/alfresco` for web scripts) in most cases. The package `org/sharextras` can be used as a base package.
  * No core Alfresco or Share files should be duplicated or replaced by files within the add-on
  * Web scripts may be overridden only where required in order to implement the capabilities of the add-on. Where overridden only modified files should exist in the add-on source tree.
  * Client-side files should be placed inside a project-specific directory, usually `extras/components`, and not in the base `components` or `modules` directories used by the core Share files
  * Client-side JavaScript should be normally be implemented in dedicated classes within the `Extras` or `Extras.dashlet` namespaces, using the standard Share pattern utilising [YAHOO.lang.extend](http://developer.yahoo.com/yui/yahoo/#extend). JSDoc comments should be used to document classes and all public variables and functions.
  * All strings appearing in the add-on UI must be externalised in message bundles
  * It must be possible to package all add-on files in a single JAR file, using the SampleProject build script, and the build should run without errors
  * No other files outside of the JAR file should be required in order for the add-on to function, aside from additional configuration which should be documented clearly
  * No errors should occur during start-up of the repository or Share web applications with the add-on installed
  * A wiki page has been defined documenting the add-on with screen shots, installation instructions, build instructions and known issues documented
  * The add-on should function without errors, and should have been tested, in recent versions of Firefox, Google Chrome and Internet Explorer
  * No issues tagged with Priority-Medium or higher relating to the add-on should be open

The Project Owners may decide to remove a sandboxed add-on which has not been promoted within a reasonable time.