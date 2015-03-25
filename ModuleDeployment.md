_Based on Dave Draper's description of the Module Deployment console in his blog post [How To Add Content To An Alfresco Share Page](http://blogs.alfresco.com/wp/ddraper/2011/07/22/how-to-add-content-to-an-alfresco-share-page/)_

Module deployment is a new feature in Alfresco 4.0 that is done through a Web Script found at: http://{hostname}:{port}/share/service/modules/deploy. Navigate to this page and you should see two lists of modules.

  * **Available Modules** lists the complete set of declared modules available for deployment
  * **Deployed Modules** lists only the modules which are currently running on the server.

Initially you should see the following modules available

  * Alfresco Portlet Extension

Alfresco add-ons may add additional modules to this list. You may need to enable these modules in order to turn on some or all of the functionality which they provide.

## Enabling a new Module ##

To add a module, select it in the Available Modules list and click the **Add** button to move it into the Deployed Modules list, then click the **Apply Changes** button (you should notice that the “Last update” time stamp changes). This action only needs to be done once as Module Deployment data is saved into the Alfresco Repository.

![http://blogs.alfresco.com/wp/ddraper/files/2011/07/Module-Deployment-blog-undeployed-screenshot-4-with-highlight.png](http://blogs.alfresco.com/wp/ddraper/files/2011/07/Module-Deployment-blog-undeployed-screenshot-4-with-highlight.png)

![http://blogs.alfresco.com/wp/ddraper/files/2011/07/Module-Deployment-blog-deployed-screenshot-5-with-highlight.png](http://blogs.alfresco.com/wp/ddraper/files/2011/07/Module-Deployment-blog-deployed-screenshot-5-with-highlight.png)