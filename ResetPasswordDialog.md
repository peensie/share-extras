# Introduction #

This project provides a customised login page for Alfresco Share, including a password reset dialog that can be used to recover a lost password.

![http://share-extras.googlecode.com/svn/trunk/Reset%20Password%20Dialog/screenshots/reset-password-dialog.png](http://share-extras.googlecode.com/svn/trunk/Reset%20Password%20Dialog/screenshots/reset-password-dialog.png)

When presented with the dialog, the user can enter their e-mail address to be sent a message containing a new password and a reminder of their username, similar to the following.

```
Hello Will,

You requested your password for your account to be reset. You can now log in to Alfresco with the following details.

Username: willabson
Password (please change after first login): UI6F1Cgm

If you did not request your password to be reset, you can normally ignore this email.

Regards,
Administrator
```

The add-on will work with Alfresco version 3.4, 4.0 and upwards.

# Download #

For **Alfresco 3.x**, download the **0.x** or **1.0** version. For **Alfresco 4.x**, download the **2.0** version.

[Download Reset Password Dialog add-on](http://code.google.com/p/share-extras/downloads/list?q=reset-password-dialog)

# Installation #

The add-on is packaged as a single JAR file for easy installation into Alfresco Share.

To install the add-on, simply drop the `reset-password-dialog-{version}.jar` file into the `tomcat/shared/lib` folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

# Building from Source #

Check out the project if you have not already done so

```
svn checkout http://share-extras.googlecode.com/svn/trunk/Reset%20Password%20Dialog
```

Change into the new directory

```
cd "Reset Password Dialog"
```

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the `tomcat/shared/lib` folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

```
ant dist-jar
```

The command should build a JAR file named `reset-password-dialog-{version}.jar` in the `build/dist` directory within your project, which you can then copy into the `tomcat/shared/lib` folder of your Alfresco installation.

Alternatively, you can use the build script to _hot deploy_ the JAR file directly into a local Tomcat instance for testing. You will need to use the `hotcopy-tomcat-jar task` and set the `tomcat.home` property in Ant.

```
ant -Dtomcat.home=C:/Alfresco/tomcat hotcopy-tomcat-jar
```

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

# Usage #

Click the _Forgotten Password?_ link on the login page. Enter your e-mail address and click **OK** to confirm.