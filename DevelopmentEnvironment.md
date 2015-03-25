Share Extras utilises a single Subversion repository provided by the Google Code project for central SCM.

The [Source Code](http://code.google.com/p/share-extras/source/checkout) page provides basic information on how to access the code using standard client tools, while this page contains more detailed information specific to the Eclipse-based development environment used by the majority of Share Extras projects (and which it is recommended you use if you are starting off yourself).

# Installing Eclipse and Plug-ins #

The [Eclipse IDE for Java EE Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/heliossr1) should be used as the base installation, since this includes the majority of IDE features required for both Java projects and for Web Development projects, as well as integration with the Ant build system. The current version is **Helios** (v3.6).

Unfortunately, the Eclipse IDE does not yet provide out-of-the-box support for integrating with Subversion repositories, and therefore an additional SVN module must also be installed to provide this.

Lastly, it is recommended that the Freemarker Eclipse plugin, now part of the [JBoss Tools](http://www.jboss.org/tools/) project, is installed to provide syntax highlighting, error checking and code completion for `.ftl` files used in projects.

The remainder of this section contains further information on installing these components.

## Installing Eclipse Helios and Plug-ins ##

Firstly download the appropriate package of the [Eclipse IDE for Java EE Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/heliossr1) for your operating system and install this on your system.

Opon first start-up you should select a new Workspace location when prompted. By default the _Welcome_ splash screen will then be shown, you can go straight into the main IDE interface by clicking the _Workbench_ icon in the top right-hand-side corner of the screen.

### Installing Subversion Team Provider ###

Subversion support is provided by the _Subversive Subversion Team Provider for Eclipse_, but an implementation-specific _SVN Connector_ is also required in order for the provider to connect to a Subversion repository.

The first step is to install the provider. To do this, click **Help** > **Install New Software**. In the _Install_ dialog which should appear, select _Helios_ from the _Work with_ select list.

Once the application has downloaded the list of available components, you should be able to enter _SVN_ in the filter field. From the components shown, install the following two items.

  * Subversive SVN Team Provider (Incubation)
  * Subversive SVN JDT Ignore Extensions (Optional) (Incubation)

The install dialogue should walk you through the process of installing the plugins. After installation has completed you should restart the application.

Following the restart, you may be prompted to choose a SVN Connector using the [SVN Team Provider Connector Discovery](http://www.polarion.com/products/svn/subversive/connector_discovery.php) dialogue. It is recommended to install the latest available **SVN Kit 1.3.x** connector since this will work well across all platforms.

If you are not prompted to choose a connector at this stage, you should be presented with the dialogue the first time you check out a project from SVN.

Should you have problems, [more information](http://www.polarion.com/products/svn/subversive/download.php) is available from the Polarion site.

### Installing Freemarker Support ###

The [Freemarker editor](http://freemarker.sourceforge.net/editors.html) for Eclipse is now part of the JBoss Tools project but can still be installed without any other dependencies.

To install the latest version, click **Help** > **Install New Software** and then click the **Add** button next to the _Work with_ select list. Add a new repository with the following information.

  * Name: JBoss Tools
  * Location: http://download.jboss.org/jbosstools/updates/stable/helios/

When the list of components has loaded, enter _Freemarker_ into the filter field and select the _Freemarker IDE_ component for installation (you may see this repeated, but you only need to select one instance of it). Use the dialog to walk through the remainder of the installation.

More information on [installing JBoss Tools components](http://www.jboss.org/tools/download/) is available on the JBoss site.

# Configuring Eclipse #

Share Extras re-uses the general Alfresco [Coding Standards](http://wiki.alfresco.com/wiki/Coding_Standards), and therefore if you are going to modify any existing code or create your own projects, you should configure these as the default formatting rules in Eclipse.

Specifically, the coding standards specify 4-space tabbing and spaces instead of tabs. Eclipse should be configured to use this standard for all text files, following the instructions on that page.

Eclipse provides the ability to save code style attributes as named presets, which you are encouraged to use. Please use the recommended [Share Extras JavaScript formatter settings](JavaScriptFormatterSettings.md) if you can.

# Importing Existing Projects into Eclipse #

It is straightforward to import existing Share Extras projects using Eclipse's _New Project_ dialog (**File** > **New** > **Project...**).

When the dialog appears, select **SVN** > **Project from SVN** from the list of sources, and in the next step enter the SVN URL provided on the add-on's wiki page. If you have not yet configured a SVN Connector you should be prompted to do so here. See the instructions in [Subversion Team Provider](#Installing.md), above for information on this.

For read-only access, leave the username and password fields blank. If you are a project committer, you will need to use HTTPS instead of HTTP and specify your Google Code username and password.

You will normally want to check out the _Head Revision_ when prompted by the wizard. Then, in the final step, select _Check out as a project with the name specified_ to re-use the existing project settings from SVN.

# Creating New Projects #

To create new projects of your own it is recommended that you use the [SampleProject](SampleProject.md) to provide a basic project structure and Ant build script.

If you are likely to regularly use the Sample Project, you may wish to check it out from SVN - see [Existing Projects into Eclipse](#Importing.md), above, using the URL `http://share-extras.googlecode.com/svn/trunk/Sample Dashlet`. You can then quickly create new projects by copying and pasting the project folder in Eclipse's Project Explorer component, and choosing a new name, but ensure that you then disconnect the new project from SVN (**Team** > **Disconnect**) and remove the SVN meta-information from the file system.

If you are a project committer, you can use the Subversive plug-in to commit your new project to the repository. When you do this, ensure that you include all files in the commit, aside from your `build` directory, which should be added to `svn:ignore`.

General information on contributing to Share Extras is available on the [ContributionProcess](ContributionProcess.md) page.

# Building Projects using Ant #

Since Eclipse has built-in support for building projects using Ant, you can use this to build your projects, rather than invoking Ant from the command line.

Ant will manage your build configurations for you on a per-project basis. To set up a build configuration you will need to highlight the `build.xml` file in your project structure, then click **Run** > **External Tools** > **Run As** > **Ant Build...**. You should then be presented with the Edit Configuration dialog where you can choose the build target you require and change parameters.

Once you have navigated through the menu structure once, you should see that the External Tools icon also appears in the Java EE perspective toolbar, which provides much quicker access!

You should also find that once created, recently-accessed profiles can be executed with a single click from this menu.

Information on the different build targets provided in the stock `build.xml` is provided on the [SampleProject](SampleProject.md) page. If you need to set specific properties at build time, e.g. `tomcat.home`, you can do this on a per-configuration basis in the Edit Configuration dialog, or globally in the **Properties** tab under **Window** > **Preferences** > **Ant** > **Runtime**.