# Dependencies need to deploy

npm install reac-wordcloud

npm install --legacy-peer-deps 

#  How to run this application
To deploy the project, an active Google account and an account on Replit will be required. The first step of deploying the project after getting the GitHub repository is to go navigate to Replit.com to begin creating the server for the project. Once logged into GitHub, click on create repl and click Import from GitHub. Take the url of the GitHub repository and paste it into the box under from URL, then click import from GitHub. Once the repository has been imported, the site will navigate to the page for the project and will create a console and a shell. The next step is to click on the shell and run the command “npm install –legacy-peer-deps" to install necessary packages for the project to run.  

After all the required packages are installed, the next step is to go to firebase.google.com to configure the database for the project. Once at the site login to firebase through google and navigate to the firebase dashboard to see a list of current firebase projects. Click on add project and follow the on-screen instructions to create the firebase project, disabling google analytics. After all the information has been entered click on create project, where it should redirect to the dashboard of the newly created project. In the dashboard click build and click on Realtime Database. In the console click the shortcut for Realtime Database and click on create database. For the security rules of the database start in locked mode and create the database. Once the database has been created, copy the following security rules and paste them in place of the existing security rules in the database:  

{ 

  "rules": { 

    ".read": "auth != null", 

    ".write": "auth != null", 

    "users": { 

      "$userId": { 

        ".read": "auth.uid == $userId", 

        ".write": "auth.uid == $userId", 

        "posts": { 

          ".indexOn": ["Headline"] 

        } 

      }, 

      "usernames": { 

        ".read": "auth != null", 

        ".write": "auth != null", 

      } 

    }, 

    "community": { 

      ".read": "auth != null", 

      ".write": "auth != null" 

    } 

  } 

} 

The next step is to click on project overview in the firebase console and click web in the center of the screen. Under web give the application a nickname, ignore the checkbox for enabling firebase hosting, and click on register app. On the next page copy the firebase config information from the use npm section and click continue to console. Return to the project that was imported into replit and click on src in the files of the project. Open the firebase folder and inside create a new file called firebaseConfig.js. In the new file, copy and paste the following code into the file.  

 

//import firebase app for database initialization  

import { initializeApp } from "firebase/app"; 

//import firebase database for database usage 

import { getDatabase } from 'firebase/database' 

//import firebase authentication  

import { GoogleAuthProvider, getAuth, setPersistence, browserSessionPersistence } from "firebase/auth"; 

  

//Configure the firebase database 

const firebaseConfig = { 

//your firebase config information goes here  

}; 

 

const app = initializeApp(firebaseConfig);//initialization of the firebase app  

export const auth = getAuth(app);//initialization of the firebase authentication 

  

//sets the browser persistence to session to only keep the users information during the current session  

setPersistence(auth, browserSessionPersistence).then(() => { 

    console.log("Successfully set browser persistence"); 

}).catch((error) => { 

    console.log("Error setting persistence", error); 

}); 

  

export const db = getDatabase(app);//initialize the firebase database 

export const provider = new GoogleAuthProvider(app); //initialize the google auth provider for the google login features 

After pasting the code, take the firebase config information from firebase and paste it into the firebaseConfig variable then save the file. After the file has been saved, configure the run button for replit to the command npm run start, or run the command in the provided console. Run the program, and once it has finished loading click on view in new tab on the project viewer and copy the url of the site in the new window. Return to the firebase console and under build click authentication. Click get started on the authentication page and click the option for Google authentication. Enable Google authentication and follow the onscreen instructions to create the project name and add the support email. Save the settings for the sign in information and navigate to the settings under the authentication tab. Under the settings menu click on authorized domains and click on add domain. Paste the copied url into the box and click add. The above steps ensure that the database is correctly set up, the authentication is valid through the site's url and that the site has installed all necessary packages to run.  

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
