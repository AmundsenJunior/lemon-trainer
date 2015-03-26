# Install MongoDB
In this tutorial, we will install MongoDB, a document-based datastore, onto our Ubuntu VMs, while also exploring the Linux file system and some Bash command line tools.

---

## Create a Workspace
When working in a Linux environment for the first time, the file system and directory tree may be difficult to fully comprehend. The distribution of tools, files, and services throughout the tree - and in combination with user and group permissions - may feel like a redefinition of logical structure.

Nowhere is this more true than with a typical MongoDB installation, as we will next complete. The main database components - the datastore itself, the configuration and log files - are all stored in different locations across the directory tree. Interaction, however, is thankfully given shortcuts in the shell with a set of command that call to those locations as necessary.

In addtion to the database components, there is the matter of the project itself, the web application you will build and run from this server. The application files also need a place to live,  