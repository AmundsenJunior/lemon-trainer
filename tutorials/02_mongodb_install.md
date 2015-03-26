# Install MongoDB
In this tutorial, we will install MongoDB, a document-based datastore, onto our Ubuntu VMs, while also exploring the Linux file system and some Bash command line tools.

---

## Create a Workspace
When working in a Linux environment for the first time, the file system and directory tree may be difficult to fully comprehend. The distribution of tools, files, and services throughout the tree - and in combination with user and group permissions - may feel like a redefinition of logical structure.

Nowhere is this more true than with a typical MongoDB installation, as we will next complete. The main database components - the datastore itself, the configuration and log files - are all stored in different locations across the directory tree. Interaction, however, is thankfully given shortcuts in the shell with a set of command that call to those locations as necessary.

In addtion to the database components, there is the matter of the project itself, the web application you will build and run from this server. The application files also need a place to live, 

Create the dev working directory and clone the lemon-trainer repo
$ mkdir ~/dev
$ cd ~/dev
$ git clone https://github.com/AmundsenJunior/lemon-trainer.git
$ cd lemon-trainer

---

## Install MongoDB

http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-12-04

Firstly, don't try to install the outdated Ubuntu package via apt-get. If you do, by chance, then first remove default mongo packages that come with Ubuntu:
http://askubuntu.com/questions/147135/how-can-i-uninstall-mongodb-and-reinstall-the-latest-version
```
$ sudo apt-get purge mongodb mongodb-clients mongodb-server mongodb-dev
$ sudo apt-get purge mongodb-10gen
$ sudo apt-get autoremove
```

Use the mongo_install.sh shell script to install MongoDB (from the DigitalOcean tutorial):
```
	#!/usr/bin/env bash

	# Adds the MongoDB public key for apt to authenticate packages
	apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10

	# Add the MongoDB package repo to the apt sources list
	echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list

	# Update apt sources and install MongoDB
	apt-get -y update
	apt-get -y install mongodb-10gen
```

Install MongoDB by running the shell script:
```
$ sudo bash ./mongo_install.sh
```

Check for running instance of MongoDB:
```
$ ps aux | grep mongo
```

The following line confirms that MongoDB is up and running:
```
mongodb PID ... Ssl ... /usr/bin/mongod --config /etc/mongodb.conf
```

Test access by connecting to the ```mongo``` administrative shell:
```
$ mongo
> exit
```

MongoDB can run in two modes
     As a service/daemon in the background, 'mongodb'

         $ sudo service mongodb start
         $ sudo service mongodb stop
         $ sudo service mongodb restart
         $ sudo service mongodb status
     As a shell program, visible in Terminal, 'mongod'
         $ sudo mongod --dbpath /var/lib/mongodb
         (mongod looks at non-existant /data/db location for the datastore by default)
         (To stop, Ctrl+c)
     Only one process can run at a specific time.
     In both cases, they are active on the following data and log locations
             config = /etc/mongodb.conf,
             dbpath = /var/lib/mongodb
             logpath = /var/log/mongodb/mongodb.log
The log will write to Terminal and logpath when 'mongod' is running
In either case, you can access the db from the shell with 'mongo' interactive prompt
If running 'mongod' in Terminal, open a new tab to then run 'mongo' or other shell commands

---

******If you want to set up a second db for testing/messing around*******

```$ ls -al /var/lib/``` shows that mongodb is owned by
     user mongodb
     group mongodb
as is the log file in ```/var/log/mongodb/```

would type in sudo service mongod start and get back "unrecognized service"

Created ```/data/db``` directory:
```
$ sudo mkdir /data
$ sudo mkdir /data/db
```

Chowned the ```/data/db``` directory
```
$ sudo chown mongodb:mongodb /data/db
```

Confirmed mongodb service is stopped
```
$ sudo service mongodb stop
```

Started mongod instance
```
$ sudo mongod --dbpath /data/db
```

******/second db for testing*******
