# Node.js

[ ! -d 'mxpfu-nodejsLabs' ] && git clone https://github.com/ibm-developer-skills-network/mxpfu-nodejsLabs.git

https://author-ide.skills.network/render?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZF9pbnN0cnVjdGlvbnNfdXJsIjoiaHR0cHM6Ly9jZi1jb3Vyc2VzLWRhdGEuczMudXMuY2xvdWQtb2JqZWN0LXN0b3JhZ2UuYXBwZG9tYWluLmNsb3VkL0lCTURldmVsb3BlclNraWxsc05ldHdvcmstQ0QwMjIwRU4tU2tpbGxzTmV0d29yay9sYWJzL01vZHVsZTNfRXhwcmVzc0pTL0hhbmRzLW9uX0xhYl9DUlVELm1kIiwidG9vbF90eXBlIjoidGhlaWEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTcxODg2MzExOX0.MSQDZUpkKAv7Say0ruwDyueh-IdNyzwrB7X_5cfUVzs

- `GET` is used to request data from a specified resource.
- `POST` is used to send data to a server for creating a resource.
- `PUT` is used to send data to a server to update a resource.
- `DELETE` is used for deleting a specified resource.

- **express** - This is for creating a server to serve the API endpoints.
- **nodemon** - This will help to restart the server when you make any changes to the code.
- **jsonwebtoken** - This package helps in generating a JSON web token which we will use for authentication. A **JSON web token (JWT)** is a JSON object used to communicate information securely over the internet (between two parties). It can be used for information exchange and is typically used for authentication systems.
- **express-session** - This package will help us to maintain the authentication for the session.

function prompt {">"}

1. npm install

2. npm start

  CRUD - READ 
  curl.exe localhost:5000/user
  curl.exe localhost:5000/user/johnsmith@gamil.com

  CRUD - CREATE
  curl --request POST 'localhost:5000/user?firstName=Jon&lastName=Lovato&email=jonlovato@theworld.com&DOB=10/10/1995'

  The query parameters are everything after the ? in the URL. In this case, the query parameters are:
  ? indicates the start of the query string.
  A query in the context of web development typically refers to a request for information sent to a server.

  curl.exe localhost:5000/user/jonlovato@theworld.com

  CRUD - UPDATE
  curl.exe --request PUT 'localhost:5000/user/johnsmith@gamil.com?DOB=1/1/1975'


  CRUD - DELETE
  curl --request DELETE 'localhost:5000/user/johnsmith@gamil.com'

Exercise 7: Implementing Authentication

  secret - a random unique string key used to authenticate a session.
  resave - takes a Boolean value. It enables the session to be stored back to the session store, even if the session was never modified during the request.
  saveUninitialized - this allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.


  use postman to test stuffs

  in package.json

  "start_auth": "nodemon index_withauth.js"


  npm run start_auth

  "this is to for it reset every change happened using the nodemon"

  login with POST REQ

  {
      "user":{
          "name":"abc",
          "id":1
      }
  } 

