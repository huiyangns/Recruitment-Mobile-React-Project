# Recruitment Mobile React Project

## Project Description
1. This project is a recruitment mobile SPA , including front-end and back-end parts.
2. Front end part is responsible for rendering data, while back end is in charge of CRUD.
3. It includes user registration/login, genius/boss list, real-time chat and other modules.
4. It conducts automation test to this project by using Cypress. Besides UI automation test, it also perform assertions on the properties of XHR objects.

## Project Feature

1. It provides user registration function with two choices:  boss and job seeker, which I call it genius. And users can choose their favorite avatar to complete their info.
2. It provides auto login feature. So users can login automatically after closing browser and reopen it again.
3. Different user type can see its counterpart list.
4. Genius can choose different boss to have an online chat and vice versa. And there will be a number prompt if unread messages occur.

## Technical Choice
This is a full stack MERN project.
###  Front End Componential Programming

1. react
2. react-router-dom
3. antd
4. redux

### Back End 
1. node
2. express
3. mongodb
4. mongoose
5. socket.io
### Interaction between Front and Back End

1. axios
2. promise/async/await
3. postman
### Automation test framework

1. Cypress

### Modular Design

1. ES6

### Project Build

1. webpack
2. create-react-app
3. eslint

### Other Plugins
1. blueimp-md5
2. js-cookie

## How to launch it

1. Run mongodb service.
2. Server: node app.js
3. Client: npm start

