# Mongodb Gallery

Application with authentication logic built using Node.js and MongoDB database which allows upon authentication to access a profile page and upload an image file to be displayed on home page.

## Features

- E-mail Sign Up, Validation, Authentication
- Submitted data will be stored and retrieved in and from MongoDB Database
- Upload image file with image preview


## Stack

-`node.js` - JavaScript runtime environment
-`express.js` - web framework for node.js
-`EJS` - embedded JavaScript templating
-`mongodb` - may be replaced by `mongoose`
-`nodemon` - tool automatically restarting the node application when changes are detected
-`bcryptjs` - password-hashing library
-`multer` - middleware that handles `multipart/form-data`
-`express-session`, `connect-mongodb-session` required to create `sessions`
-`uuid` - required for creation of universally unique identifiers
-`dotenv` - required for loading environment variables


## Database 

Database named `gallery`, you can create it on Mongo Shell with the following command 

```
use gallery

```

## Cloning

You can [clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and install the dependencies with the following command

```
$ npm install

```
`environment variable` is to be set up for the session `secret`. You can run the following command to start the application

```
$ npm start

```

The server will be running on port 3000, visit `http://localhost:3000/`


## License

MIT

