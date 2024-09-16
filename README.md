# Confetti

## Table of Contents

- Introduction
- Screenshots
- System Architecture
- API Design
- Installation
- Dependencies
- Configuration
- Folder Structure
- Usage
- Preview
- Contributors
- Contributing
- License
- Support

## Introduction

Welcome to Confetti, the ultimate platform where secrets, feelings, and stories come to life! Whether it's that unspoken crush, a hilarious moment, or something you just need to get off your chest, this is the place to do it—completely anonymously. Your confession will be sent directly to the person you're confessing to, without revealing your identity. Plus, others can like, comment, and reply to your posts, adding a whole new level of interaction.

Feeling competitive? Check out our leaderboard to see the top-liked confessions and the most active users. So go ahead, share your truth, connect with others, and see where your confession takes you. Your story might just be the next campus sensation!

## Screenshots

## System Architecture

The Confetti platform consists of three main components: the front-end, the back-end, and the database. The platform follows a client-server architecture, with the front-end serving as the client and the back-end and database serving as the server.

### Front-end

The front end of Confetti includes all the essential pages for a confession site. Some of these pages are:

- **Homepage**: This page displays a list of all confessions with links to other tabs.
- **Leaderboard**: This page shows real-time user statistics across the platform.
- **Notifications**: This page displays all notifications the user receives, with real-time implementation.
- **My Profile**: This page provides details about the user's account, including their name, email, and other relevant information, as well as website usage stats.
- **My Posts**: This page shows all the posts a user has made.
- **Settings**: This page allows the user to edit their account details.
- **404 Page**: This page informs the user that the requested route does not exist.

### Back-end

The back end of Confetti provides a range of features and functionalities, including:

- **User Authentication and Authorization**: Users can sign up and log in to the platform using their email addresses, passwords, and college details. The platform also supports OTP (One-Time Password) verification and forgot password functionality for added security.
- **Post Management**: Users can create, read, update, and delete posts.
- **Cloud-based Media Management**: Confetti uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and GIFs.
- **Markdown Formatting**: Post content can be formatted using Markdown, allowing for easier display and rendering on the front end.
- **Web Cache**: This feature stores the website’s cache to improve speed and performance using Redis.

### Database

The database of Confetti consists of:
- **MongoDB**: Used for saving user and post data.
- **Firebase store**: Used for saving real-time data.

### API Design

The Confetti platform's API is designed following the REST architectural style. The API is implemented using Node.js and Express.js. It uses JSON for data exchange and follows standard HTTP request methods such as GET, POST, PUT, and DELETE.

## Installation

To install the Confetti website, follow these steps:

- Clone the repository: `git clone https://github.com/sanchiitvijay/confetti`
- Navigate to the project directory: `cd confetti`
- Install backend dependencies: `cd Server && npm install`
- Install frontend dependencies: `cd .. && cd client && npm install`


## Dependencies

The Confetti platform relies on the following dependencies:

- ReactJS
- NodeJS
- MongoDB
- ExpressJS
- Tailwind CSS
- Redux
- Cloudinary
- Framer-Motion
- Redis
- Firestore
- Firebase push notifs
- NodeMailer
- react-infinite-scroll-component
- And a Lot More...
  

## Configuration

- Set up a MongoDB database and obtain the connection URL.
- Get up the Mail pass and Mail Port from Gmail.
- Set up a Firebase account and obtain the key ,secret.
- Set up a Redis account and obtain the host ,port, password.
- Get jwt secret
- Set up a cloudinary account and obtain cloud name,api key and api secret.
- Create a `.env` file in the `Server` directory with the following environment variables:
    - `MONGODB_URL=<your-mongodb-connection-url>`
    - `PORT=<your-server-port>`
    - `JWT_SECRET=<your-jwt-secret-key>`
    - `FOLDER_NAME=CONFETTI`
    - `MAIL_HOST=smtp.gmail.com`
    - `MAIL_PORT=<your-mail-port>`
    - `MAIL_USER=<your-mail-id>`  
    - `MAIL_PASS=<your-mail-pass>`  
    - `CLOUD_NAME=<your-cloud-name-on-cloudinary>`
    - `API_KEY=<your-cloudinary-api-key>`
    - `API_SECRET=<your-cloudinary-api-secret>`
    - `REDIS_HOST=<your-redis-host>`
    - `REDIS_PORT=<your-redis-port>`
    - `REDIS_PASSWORD=<your-redis-password>`

    - `FIREBASE_APP_TYPE=<your-firebase-app-type>`
    - `FIREBASE_APP_PROJECT_ID=<your-firebase-app-project-id>`
    - `FIREBASE_APP_PRIVATE_KEY_ID=<your-firebase-app-private-key-id>`
    - `FIREBASE_APP_PRIVATE_KEY=<your-firebase-app-private-key>`
    - `FIREBASE_APP_CLIENT_EMAIL=<your-firebase-app-client-email>`
    - `FIREBASE_APP_CLIENT_ID=<your-firebase-app-client-id>`
    - `FIREBASE_APP_AUTH_URI=<your-firebase-app-auth-uri>`
    - `FIREBASE_APP_TOKEN_URI=<your-firebase-app-token-uri>`
    -   `FIREBASE_APP_AUTH_PROVIDER_X509_CERT_URL=<your-firebase-app-auth-p   rovider-x509-cert-url>`
    -   `FIREBASE_APP_CLIENT_X509_CERT_URL=<your-firebase-app-client-x509-c   ert-url>`
    -   `FIREBASE_APP_UNIVERSE_DOMAIN=<your-firebase-app-universe-domain>`

- Create a `.env` file in the `.client` directory and add the the following environment variables:
    - `REACT_APP_BACKEND_BASE_URL=<your-backend-url-or-your-localhost>`
    - `REACT_APP_FIREBASE_API_KEY=<your-firebase-api-key>`
    - `REACT_APP_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>`
    - `REACT_APP_FIREBASE_PROJECT_ID=<your-firebase-project-id>`
    - `REACT_APP_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>`
    - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>`
    - `REACT_APP_FIREBASE_APP_ID=<your-firebase-app-id>`
    - `REACT_APP_FIREBASE_VAPID_KEY=<your-firebase-vapid-key>`
- Also change the cors allow origin in index.js inside Server to the localhost or backend url you are using.


## Folder Structure

Here’s the revised description with the structure unchanged:

- `Server`: Contains the Node.js backend code.
    - `routes/`: Route definitions.
    - `controllers/`: Handles business logic.
    - `models/`: Database models.
    - `utils/`: Utility functions.
    - `config/`: Configuration files.
    - `middleware/`: Middleware functions.
    - `mail/`:Mails format
    - `.env`, `index.js`, `package.json`: Main backend files.

- `client`: Contains the React front-end code.
  - `public/`: Public assets and files for the front end.
    - `src/`: Main source folder.
        - `components/`: Reusable UI components.
            - `common/`, `core/`: Specific component categories.
        - `pages/`: Individual page components.
        - `utils/`: Utility functions.
        - `assets/`: Static assets like images, fonts, etc.
        - `services/`: Frontend services (e.g., API integration).
        - `styles/`: CSS or SCSS files.
        - `hooks/`, `reducer/`, `services/operations`, `slices/`: State management and API services.
        - `App.css`, `App.js`, `firebase.js`, `index.css`, `index.js`: Core application files.
    - `.env`, `package.json`, `tailwind.config.js`: Configuration files for environment, dependencies, and Tailwind CSS.

- `README.md`: Project documentation.

## Usage

- Open a new terminal 
- Run the dev script: `cd server/ && npm i && cd ../client/ &&  npm i && npm run dev`
- Access the application in your browser at `http://localhost:3000`


## Preview

You can preview the Confetti platform at [https://confetti-five.vercel.app/](https://confetti-five.vercel.app/)

[![Login](https://i.ibb.co/m9Sb7R1/login.png)](https://confetti-five.vercel.app/)
[![Signup Page](https://i.ibb.co/zn15587/signup-Page.png)](https://confetti-five.vercel.app/)
[![Terms and Conditions](https://i.ibb.co/gVJ6QYG/tnc.png)](https://confetti-five.vercel.app/)
[![Home Dark Full](https://i.ibb.co/j42hnh2/homedarkfull.png)](https://confetti-five.vercel.app/)
[![Home Light](https://i.ibb.co/TbXY285/homelight.png)](https://confetti-five.vercel.app/)
[![Mobile Home](https://i.ibb.co/Pc4wVW5/mobile-Home.png)](https://confetti-five.vercel.app/)
[![My Profile](https://i.ibb.co/1fkrHLg/myprofile.png)](https://confetti-five.vercel.app/)
[![Edit Profile](https://i.ibb.co/bKpJsD4/editprofile.png)](https://confetti-five.vercel.app/)
[![User Card](https://i.ibb.co/HGpqtXT/userCard.png)](https://confetti-five.vercel.app/)
[![Notifications](https://i.ibb.co/kKLKGwf/notif.png)](https://confetti-five.vercel.app/)



## Contributors
### [Ashutosh Kumar](https://github.com/ash956901)
Email: ak959601@gmail.com
### [Sanchit Vijay](https://github.com/sanchiitvijay)
Email: sanchiitvijay@gmail.com


## Contributing

Contributions are welcome If you have any suggestions or find any issues, please feel free to open an issue or a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For support, email [confetti.site.01@gmail.com](mailto:confetti.site.01@gmail.com) or write the feedback in the website [Confetti](https://confetti-five.vercel.app/).
