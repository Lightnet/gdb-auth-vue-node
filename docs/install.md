# Install:

 You need to install nodejs to able to install packages using the npm command once nodejs is path variable to system.

 You need to download the project. Extract the file where you wanted to put it.

 Open command line or terminal.

 Make sure your in current directory of the project.

```
~\gdb-auth-vue-node
 npm install
```
Run command line "npm install", so it will install the packages need to build and run the server. If you notice something wrong with the start server. Make sure you create .env for config build for datafile setup.

.env (file and project dir)
```
DatabaseFile='./.data/data.json'
```
No Space are allow on glitch config .env file.

```
~\gdb-auth-vue-node
 gulp default
```
Run gulp default on command line to build the client and server script. This will start a server and watch files changes.