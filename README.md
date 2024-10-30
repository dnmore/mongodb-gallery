# MongoDB Gallery - Image Upload and Profile Management

## Overview

Application with authentication logic built using Node.js and MongoDB database which allows upon authentication to access a profile page and upload an image file to be displayed on home page.

## 🔥 Features

- Secure user authentication and session management
- Image uploads with previews



## 🛠️ Tech Stack

- `Node.js`– Backend runtime
- `Express.js`– Web framework for Node.js
- `EJS`– Templating engine for rendering dynamic content
- `MongoDB`– NoSQL database for storing data
- `Nodemon` – Automatically restarts the server on file changes
- `Bcryptjs` – Password hashing
- `Multer`– Middleware for handling file uploads
- `Express-Session`– Session management
- `UUID` – Unique identifier generation
- `Dotenv` – Environment variable management


## 🚀 Getting Started
### Installation
Clone the repository and install the dependencies:

```
$ git clone https://github.com/dnmore/mongodb-gallery.git
$ npm install

```

### Database Setup

Create a MongoDB database named `gallery`:

```
use gallery

```

### Environment Variables
Set up environment variables for the session secret in a `.env` file.

### Running the Application
To start the server, run:

```
$ npm start

```

The application will be running at `http://localhost:3000/`.


## 📜 License

This project is licensed under the MIT License.

