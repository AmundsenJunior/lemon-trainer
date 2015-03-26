# Base Environment Configuration Tutorial
In this tutorial, we will provide information on setting up your first virtual machine (VM), an instance of Ubuntu Linux running in the Oracle VirtualBox VM manager, and will configure the VM to a foundation level that is useful for running any software development environment.

---

## Install VirtualBox

1. Download the latest version for your operating system at:
   https://www.virtualbox.org/wiki/Downloads
2. Install and open the application.

VirtualBox is a VM manager, providing an interface for building and running numerous instances of VMs to run within your native OS. For new developers, this tool is often a great first way to gain exposure to the various distributions (*distros*) of Linux OS that are available. Refer to VirtualBox documentation for further information:
https://www.virtualbox.org/wiki/Documentation

---

## Download Ubuntu Desktop

1. Download Ubuntu Desktop 14.04.2 LTS (64-bit)
   http://www.ubuntu.com/download/desktop

Ubuntu is one of the most popular Linux distros available, with their Desktop OS providing plenty of features and applications for ordinary PC users, and their Server OS a great, reliable option for hosting web applications and services.

---

## Create an Ubuntu VM

1. In VirtualBox, click ***New*** to open the New Virtual Machine (VM) dialog box.

2. Under **Name and Operating System**:

   A. ***Name*** is ```lemon-a100```,

   B. ***Type*** is ```Linux```,

   C. ***Version*** is ```Ubuntu (64 bit)```,
 
   then click ***Continue***.

3. For **Memory Size**, allocate ```1024 MB```, then ***Continue***.

4. For the **Hard Drive**:

   A. Select ```Create a virtual hard drive now```, and ***Continue***.

   B. Select ```VDI (VirtualBox Disk Image)```, then ***Continue***.

   C. Set the hard drive to ```Dynamically allocated```, then ***Continue***.

   D. Keep the default name for the hard drive, allocate ```16.00 GB```, then ***Create***.

5. On the VirtualBox dashboard, the ```lemon-trainer``` VM is now available and **Powered off**. Select and click ***Start***.

6. The first screen will ask you to select an available disk image. Use the Finder/Explorer button to navigate to and select your downloaded Ubuntu ISO. Once selected, click ***Start***.

7. Once booted up, click ***Install Ubuntu***.

   (*If you are unable to access the mouse pointer on the VirtualBox screen, click the mouse icon in the bottom right VirtualBox toolbar and click __Disable Mouse Integration__. You can now click into the Ubuntu screen to use the mouse. To escape the mouse back onto your native desktop, press the Host Key (noted in the bottom right VirtualBox toolbar). This will only be necessary until you've install VirtualBox Guest Additions.*)

8. On the next screen, click ***Continue*** without selecting any additional options (we will get updates via the command line after installation is complete).

9. Next, select ```Erase disk and install Ubuntu``` and click ***Install Now***. (*The "disk" to which Ubuntu is referring here is the virtual hard drive created in VirtualBox, not your actual hard drive. Likewise, click __Continue__ if you receive a pop-up message referring to partitions.*)

10. Select your time zone, then click ***Continue***.

11. Select your keyboard layout, then click ***Continue***.

12. Enter your user credentials:

    A. ***Your name***, as in *First Last*,

    B. ***Your computer's name*** is ```lemon-a100```,

    C. ***Pick a username***,

    D. ***Choose a password*** and ***Confirm***,

    then click ***Continue***.

13. Upon completed installation, click ***Restart Now***.

    (*The restart may halt with a prompt to "eject the installation media and press ENTER". Just press ```ENTER```.*)

---

## Configure Ubuntu

1. With restart completed, log in with your user credentials.

2. Once logged in, click on the VirtualBox ***Devices*** dropdown menu, and click ***Insert Guest Additions CD image***.

   (*Guest Additions are VirtualBox utilities than enhance the VM's interactions with the host machine, your computer. For example, after Guest Additiona are installed, change settings in ```Shared Clipboard``` under the VirtualBox ***Devices*** dropdown to use cut/copy/paste between VM and host.*)
3. On the CD pop-up, click ***Run***.

4. When prompted, enter your system password to authenticate the installation.

5. Press ```ENTER``` or ```RETURN``` when installation is complete.

6. Right-click on the CD icon in the left sidebar menu (the "Launcher") to eject.

7. Click the Ubuntu icon in the upper left of the the ***Launcher***, and search for ```Terminal```, then open.

### Apt-get
Ubuntu, as a variant of the Debian Linux distro, uses ```dpkg``` to manage package installation of general applications, utilities, and libraries for the OS. ```apt-get``` is a wrapper around the ```dpkg``` tool that aids the process.

1. First, we get an updated list of all installed standard packages and their latest versions:
  ```
  $ sudo apt-get update
  ```
   ```sudo``` is used to run a Linux command with administrative privileges that would otherwise be forbidden for a normal user to run. **Use carefully**. If a command fails because of permissions, *don't* first try to run the same command with ```sudo```. Investigate why the command fails in that context.

2. Next, we download and install new (and new versions of currently installed) packages:
  ```
  $ sudo apt-get upgrade
  ```

3. We will next install git using ```apt-get``` and the ```install``` command:
  ```
  $ sudo apt-get install -y git
  ```
  
  The ```install``` subcommand takes directly-named packages (as known by their names in the apt-get sources list) as enough information to retrieve the package and install it onto the system.

  The ```-y``` argument automatically applies "Yes" to the package installation. As seen with the previous command, ```apt-get``` prompts the user to confirm the size of the package to be installed.

4. You can confirm a successful ```git``` installation with:
  ```
  $ git help
  ```

### Optional installations

At this point, add any developer tools and applications as you prefer. I like to use the ```vim``` text editor and apply the Xubuntu minimal desktop environment (instead of the default Unity environment for Ubuntu). Get these packages with:
  ```
  $ sudo apt-get install -y vim xubuntu-desktop
  ```
There are also Linux versions available for [Sublime Text](http://www.sublimetext.com/2) and [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html), per your preference.

---

## Take a Snapshot

VirtualBox has snapshot and clone features, rather useful tools for backing up and duplicating your current installation. With a snapshot of the current state of your ```lemon-a100``` VM, you can restore your VM to a previous state if further installation/configuration/development ever gets to a irreversibly troublesome point. You can also clone a snapshot and use that clone to create an entirely different development environment. For my own development, I have a snapshot at this state that I've cloned several times, saving myself the trouble of going through the Ubuntu installation process over and over again (e.g., a Python or LAMP project would also still use git, vim, etc.).

1. In Ubuntu, click the gear icon in the upper right, and select ***Shutdown***.

2. Once completely powered off, select the ```lemon-a100``` VM in VirtualBox, and click the ***Snapshots*** button in the upper right.

3. Select the ```Current State``` and click the ***Take Snapshot*** camera icon.

4. Give the snapshot a name like ```base-install```, and list the relevant packages/tools/applications installed (e.g. "Git, Guest Additions"), then click ***OK***.

5. On this screen, you can select a previous state and restore, delete, or clone.
