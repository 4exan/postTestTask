
# Overview

Full-stack CRUD application writen fully on JavaScript.

### Frontend
*index.html* - blank html page with connected stylesheet and scripts.

*stylesheet.css* - styling.

*creator.js* - File that contains all creational logic.

*postService.js* - File that contains all logic related to backend requests.

*main.js* - File that contains main application logic.

### Backend

*server.js* - File with NodeJS configuration for receiving requests and sending responses.


## Task Features

Main tasks was to make 'Create', 'Edit' and 'Delete' features and use JsonPlaceholder for test data.
And because JsonPlaceholder can’t save, edit or delete data, I imitated this features on backend with local variables.

Both GET request check if local array store something, if not, then make request to JsonPlaceholder to get some data.

When backend store data, all POST, PUT and DELETE request will affect that local data.

## Endpoints

|Method|Action|URL|ReqBody|ResBody|
|-|-|-|-|-|
|GET|Fetch All Posts|/api/posts|~|Array of Post Objects|
|GET|Fetch Post via ID|/api/post/${postId}|~|Post Object|
|POST|Create new Post|/api/posts|Post Object|Status Code + Message|
|PUT|Edit existing Post|/api/post/${postId}|Post Object|Status Code + Message|
|DELETE|Delete Post|/api/post/${postId}|~|Status Code + Message|

## Installation

Make sure you have installed Python and NodeJS, you can check it via commands in terminal:

```
python -v
```
and
```
node -v
```
Clone repository:

```
git clone https://github.com/4exan/postTestTask.git
```
or manually download files
### Launch backend

Proceed to 'backend' folder in repository, and start NodeJS server:
```
node server.js
```

### Launch frontend
Proceed to 'frontend' folder in repository, and start Python server:
```
python -m http.server 3030
```

#### Enjoy!

## Theme

For this project i used color palete "Frappe" by Catppuccin.

Link on GitHub: [link](https://github.com/catppuccin)
## Demo

# Overview

Full-stack CRUD application writen fully on JavaScript.

### Frontend
*index.html* - blank html page with connected stylesheet and scripts.

*stylesheet.css* - styling.

*creator.js* - File that contains all creational logic.

*postService.js* - File that contains all logic related to backend requests.

*main.js* - File that contains main application logic.

### Backend

*server.js* - File with NodeJS configuration for receiving requests and sending responses.


## Task Features

Main tasks was to make 'Create', 'Edit' and 'Delete' features and use JsonPlaceholder for test data.
And because JsonPlaceholder can’t save, edit or delete data, I imitated this features on backend with local variables.

Both GET request check if local array store something, if not, then make request to JsonPlaceholder to get some data.

When backend store data, all POST, PUT and DELETE request will affect that local data.

## Endpoints

|Method|Action|URL|ReqBody|ResBody|
|-|-|-|-|-|
|GET|Fetch All Posts|/api/posts|~|Array of Post Objects|
|GET|Fetch Post via ID|/api/post/${postId}|~|Post Object|
|POST|Create new Post|/api/posts|Post Object|Status Code + Message|
|PUT|Edit existing Post|/api/post/${postId}|Post Object|Status Code + Message|
|DELETE|Delete Post|/api/post/${postId}|~|Status Code + Message|

## Installation

Make sure you have installed Python and NodeJS, you can check it via commands in terminal:

```
python -v
```
and
```
node -v
```
Clone repository:

```
git clone https://github.com/4exan/postTestTask.git
```
or manually download files
### Launch backend

Proceed to 'backend' folder in repository, and start NodeJS server:
```
node server.js
```

### Launch frontend
Proceed to 'frontend' folder in repository, and start Python server:
```
python -m http.server 3030
```

#### Enjoy!

## Theme

For this project i used color palete "Frappe" by Catppuccin.

Link on GitHub: [link](https://github.com/catppuccin)
## Demo
![image](https://github.com/user-attachments/assets/2a0424ca-ed1d-4244-8e68-cf2a89543e16)
![image](https://github.com/user-attachments/assets/e4cdda74-6100-4c92-863f-1d286ac78cbe)


