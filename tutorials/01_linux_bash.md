# Linux File System and Bash Command Line
In this tutorial we will explore the Linux file system and some Bash command line tools.

---

## Create a Workspace

When working in a Linux environment for the first time, the file system and directory tree may be difficult to fully comprehend. The distribution of tools, files, and services throughout the tree - and in combination with user and group permissions - may feel like a redefinition of logical structure.

Nowhere is this more true than with a typical MongoDB installation on Ubuntu, as will be completed in [a further tutorial](./03_mongodb_install.md). The main database components - the datastore itself, the configuration and log files - are all stored in different locations across the directory tree. Interaction, however, is thankfully given shortcuts in the shell with a set of commands that call to those locations as necessary.

In addtion to the database components, there is the matter of the project itself, the web application you will build and run from this server. The application files also need a place to live, owned by our own user account, that we will call our workspace.

Create a workspace directory, then clone this ```lemon-trainer``` repository from GitHub:
```
$ mkdir ~/workspace
$ cd ~/workspace
$ git clone git@github.com:AmundsenJunior/lemon-trainer.git
$ cd lemon-trainer
```

---

## Bash Commands

### Navigating the Filesystem
For most commands, you can pass directory paths and file names as arguments to run the command upon. Directory paths can be relative to your current location, or absolute. An absolute path will always start at root (```/```), the very top of the Linux directory tree.

(e.g., ```cat lemon-trainer/app-examples/views/index.html``` goes three levels down into subdirectories)
e.g., ```cat /etc/mongodb.conf``` goes into the ```etc/``` subdirectory of the root directory, ```/```)

```ls``` lists directory contents, both files and subdirectories.
  ```ls -a``` will list directory contents including hidden files.
  ```ls -l``` will list additional information on the directory contents, including all read-write-execute permissions, user and group owners, and the last modified date and time.

```cd``` changes to the directory given.
  ```cd ~/workspace``` enters the ```workspace``` subdirectory of your user home directory. The tilde is short for the ```/var/username``` location.

```pwd``` displays the current directory ("pwd" stands for present working directory).

```.``` refers to the current directory.

```..``` refers to the directory one level up. For example, if we are in ```~/workspace/lemon-trainer/```, typing ```cd ..``` would move us into ```~/workspace/```. It can be strung together to refer to multiple levels up (e.g., ```cd ../../```).

### Manipulating files and directories

```cp``` copies a file (keeping the original intact), while ```mv``` moves or replaces the original file. Both commands can act upon:
  * a file or files,
  * within the current directory or from one location to another,
  * with the same file name or to a new name.

  ```
  $ cp 01_linux_bash.md 01_linux_bash.md.copy
  $ cp lemon-trainer/mongo_install.sh tutorials/
  $ mv tutorials/* ./
  ```
  
  ```cp -R``` recognizes the ```-R``` recursive argument, and will apply the action on all subdirectories and files. 

```mkdir``` creates a new directory. If the directory doesn't yet exist, a ```cp``` or ```mv``` command will not work.

```rm``` deletes a file.
  ```rm -R``` will recursively delete a directory (including all subdirectories and files).
  ***NOTE:** Be cautious with the ```-R``` argument. Be certain of your location in the file system and of deleting all the subdirectory contents. There is no Recycle Bin in Linux with this command.*

### Reading and searching files

```cat``` outputs the contents of a file to the Terminal. If the file is longer than the height of your Terminal window, you'll have to scroll up to view it all. In that instance, better to use...

```less```, which outputs a file contents, automatically paginated to the height of the Terminal window. Use ```ENTER``` to scroll down one line at a time, or ```SPACEBAR``` to move one "page" at a time. Press ```Q``` to exit the viewer.

```tail``` outputs the last lines of a file. By default, it outputs the last 10 lines, so use the ```-NUMBER``` argument to output a different number of lines. This is a very useful tool for checking log files that frequently update in the background.
  ```
  $ tail -20 /var/log/mongodb/mongodb.log
  ```

```grep``` searches a file for a text pattern (e.g., a word) and prints out the lines in which that pattern appears:
  ```
  $ grep -e update ~/workspace/lemon-trainer/tutorials/00_virtualbox_ubuntu.md
  ```

### Creating and writing to files

```touch``` will update an existing file's last modified date and time, as visible with ```ls -l```. If the file does not exist, ```touch``` will create the file with the name given.

```tee``` takes standard input (from executing other commands, e.g.) and writes them onto a file. Without any additional arguments, ```tee``` will overwrite the file contents. Use ```tee -a``` to append the input to the end of the selected file.

```nano``` is a simple, minimal-function text editor that comes with your Linux installation. Use the direction keys to move the cursor, and refer to the function key commands listed at the bottom of the your Terminal window to save and exit.

### User and group permissions

```whoami``` shows the current active user.

```sudo``` is used generally to execute a command as another user. By default, it is used to execute commands as ```root``` user.
  ***NOTE:*** Be cautious with this command, as it is very powerful with executing any command anywhere in the filesystem. If you unsuccessfully try to run a command as your normal user account, it is better practice to investigate why you don't have permission to run that command than to force the command through with ```sudo```.

```chown``` uses a set of alphanumeric arguments to change user and group read-write-execute permissions on files and directories in the Linux filesystem. When viewing ```ls -l```, ```chown``` will act upon the set of "-rwx-" flags at the start of each line. These flags show whether the owner, group members, or all other users can Read, Write, or eXecute files and directories.
  ***NOTE:*** Much as with ```sudo```, ```chown``` should be used with knowledgeable caution. Many files and directories (e.g., logs and config files) are acted upon by background processes that have permission from the specific ```chown``` settings that are present.

### Linux and Bash Utilities

```export``` is used to create environment variables, which can be used both by a user on the Linux Terminal, as well as by processes running on the system.

pipe ```|``` strings commands together, where the output of the first command will be used as input into the second command.

redirection ```>``` is used to write the output of a command into a file.

Combining piping and redirection, we can run a command to view all running processes, run those through a search filter, then write the output of that filter to a text file:
```
$ ps aux | grep mongo > mongo-status.txt
```

Tab completion is handy shortcut in Bash to automatically finish typing a command, directory path, or filename for you, if and when the initial characters you've entered leave only one result possible.

For example, if you are in the ```workspace``` directory created earlier, you can ```cat``` this tutorial with tab completion very quickly (press *TAB* when noted, then type until the next "<TAB>"):
```
$ cat lem<TAB>
$ cat lemon-trainer/tu<TAB>
$ cat lemon-trainer/tutorials/01<TAB>
$ cat lemon-trainer/tutorials/01_linux_bash.md
```

Help is provided directly in Bash on the syntax for many installed utilities and applicaions. Type the command immediately followed by ```-h``` or ```--help``` to display a description of the command and its arguments. If that doesn't work, in some cases, you can enter the command with no arguments to display the help description.

To go much more in-depth, ```man``` provides the verbose documentation for Linux and Bash commands, functions and files:
```
$ man git
```

```ps``` displays the current running processes on the system.

```echo``` will print to standard output.
```
$ echo 'Hello world'
```


