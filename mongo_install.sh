#!/usr/bin/env bash

# Adds the MongoDB public key for apt to authenticate packages
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10

# Adds the MongoDB package repo to the apt sources list	
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list

# Updates apt sources and available packages, then installs MongoDB
apt-get -y update
apt-get -y install mongodb-10gen

