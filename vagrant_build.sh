#!/usr/bin/env bash

echo -e "\n--- Updating/upgrading packages list ---\n"
apt-get update
apt-get -y upgrade

echo -e "\n--- Install Node.js and NPM ---\n"
apt-get install -y nodejs
apt-get install -y npm
apt-get install -y nodejs-legacy

echo -e "\n--- Install MongoDB ---\n"
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" \
    | tee -a /etc/apt/sources.list.d/10gen.list
apt-get -y update
apt-get -y install mongodb-10gen

