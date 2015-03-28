# Install NodeJS and NPM
In this tutorial, we will install NodeJS, a server-side JavaScript web framework, and NPM, the Node Package Manager, onto our Ubuntu VMs.

1. Install NodeJS:
   ```
   $ sudo apt-get install -y nodejs
   ```

2. Install NPM:
   ```
   $ sudo apt-get install -y npm
   ```

3. Confirm installation of NodeJS and NPM by verifying from the command line their version:
   ```
   $ nodejs -v
   $ npm -v
   ```

4. If you try to verify NodeJS installation with the standard command ```$ node -v```, you'll see that it doesn't exist. There is a conflict with a legacy Ubuntu package of that name. We get around this inconvenience by installing a ***symlink*** for Bash that points the ```node``` command to the ```nodejs``` package:
   ```
   $ sudo apt-get install -y nodejs-legacy
   $ node -v
   ```

   (*For more detail on this fix, read [this StackOverflow thread](http://stackoverflow.com/questions/21168141/can-not-install-packages-using-node-package-manager-in-ubuntu).*)

(*For an in-depth tutorial on installing NodeJS, especially with methods alternative to those outlined above, I'll refer you to [this DigitalOcean tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server).*)