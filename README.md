# github-zen: A tiny utility for reading github zen
A tiny piece of javascript for watching zen streaming from GitHub API

- Install node.js;
- Clone the repo;
- ```$ npm install```;
- ```$ ./zen.js```; 
- Watch it.

### Tips and tricks
Default API limit is 60 requests per hour. You can enlarge it by passing your **GitHub** username as a first parameter.

You can also redirect output to a file so that you can read it later:
```
$ ./zen.js > zen.txt
```
