# Install MongoDB
In this tutorial, we will install MongoDB, a document-based datastore, onto our Ubuntu VMs.

---

## Install MongoDB

Installation references:
  http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
  https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-12-04

***NOTE:*** Don't try to install the outdated Ubuntu package via ```apt-get```. If you do, by chance, then first remove default MongoDB packages that come with Ubuntu, per [this StackOverflow thread](http://askubuntu.com/questions/147135/how-can-i-uninstall-mongodb-and-reinstall-the-latest-version):
```
$ sudo apt-get purge mongodb mongodb-clients mongodb-server mongodb-dev
$ sudo apt-get purge mongodb-10gen
$ sudo apt-get autoremove
```

1. Use the ```mongo_install.sh``` shell script to install MongoDB (from the above-linked DigitalOcean tutorial):
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

2. Install MongoDB by running the shell script:
   ```
   $ sudo bash ./mongo_install.sh
   ```

3. Check for a running instance of MongoDB:
   ```
   $ ps aux | grep mongo
   ```

4. The following line output from the above command confirms that MongoDB is up and running:
   ```
   mongodb <PID> ... /usr/bin/mongod --config /etc/mongodb.conf
   ```

5. Test access by connecting to the ```mongo``` administrative shell:
   ```
   $ mongo
   > exit
   ```

---

## The MongoDB daemon and file structure

MongoDB can run in two modes:

1. As a service/daemon in the background, ```mongodb```:
   ```
   $ sudo service mongodb start
   $ sudo service mongodb stop
   $ sudo service mongodb restart
   $ sudo service mongodb status
   ```
2. As a shell program, visible in Terminal, ```mongod```
   ```
   $ sudo mongod --dbpath /var/lib/mongodb
   ```
   (```mongod``` refers to ```/data/db``` location for the datastore by default. To stop the process running in the shell, press *CTRL+C*.)
3. Only one process can run at a specific time.
   In both cases, they are active upon the following data and log locations:
   config = ```/etc/mongodb.conf```,
   dbpath = ```/var/lib/mongodb```,
   logpath = ```/var/log/mongodb/mongodb.log```
4. The log will write to both your terminal and logpath when 'mongod' is running.
5. In either case, you can access the db from the shell with 'mongo' interactive prompt. If running 'mongod' in Terminal, open a new tab to then run 'mongo' or other shell commands.

