# FeedBall!
![alt text](https://user-images.githubusercontent.com/88030731/207434316-b700e701-4f53-4f47-b2b0-81d2f1813af8.png)

## URL for the server: 
<a href="https://group-13-feed-ball.vercel.app/">group-13-feed-ball.vercel.app</a>
<br>
## What is FeedBall and what are we doing?
Feedball is a social interaction and opinion sharing platform for football fans. The platform contains multiple high-end functionalities for both admins and users.
Admins: Can monitor user profiles, delete accounts, ban and unban users from the platform, can inform fans on the date and time of upcoming matches, create and de-activate polls, post news to reach public opinion.
Users: Can sign-in, modify profile information, pick their favouirte teams, delete accounts, read and like/dislike news (these news are provided to the users based on their previously selected favorite teams), answer polls, send live messages, rate messages. By liking/disliking news, liking messages and answering polls users can gain points and advance in the leaderboard to later earn awards.
## User Documentation:
### How to install the software
The software requires no installation. You can start enjoying FeedBall the minute you sign up!
### How to run the software
The user clicks the site URL / searches the site name on their internet browser to enter the platform and use it accordingly after the sign up and login processes.
Sign in process:
Firstly, the user needs to create an account by entering a valid e-mail address (a validation e-mail is sent to the provided e-mail to complete the validation process), a valid password (a valid password contains a minimum of 6 characters) (the password needs to be entered twice on a separate field to prevent mistakes), name, surname, date of birth in MM/DD/YYYY format, gender and prefered team information. The sign up process is finished once the valid information is entered and the user pushes the sign up button. 
Login process:
After an account is succesfully created, the user enters the previously selected e-mail and password infromation on the respected fields. The login process is finished by pushing the "Login now" button. 
### How to report a bug
User goes to github.com, user finds the repository "SU-CS308-22FA/Group-13-FeedBall", user goes to issues and posts an issue regarding the bug he/she is experiencing: The user writes a clear but short description of the bug they have/are experienced/experiencing on the issue title, the user clearly states the circumstances in which they are experiencing the bug on the issue body, the user labels the issue as "bug" and submits new issue. The issues are periodically checked by the development and maintenance team to provide adequate customer service. 
Known bugs: There are no known bugs at the moment. This page is updated periodically.
## Developer Documentation:
### Obtaining the Source Code 
We use the same document for both the backend and the frontend of the web app, and this said code could be found within our GitHub Repository. There are two ways to obtain the code. First one is cloning the repo using the URL that is obtained from the green “Code” button in GitHub. Then, you take the HTTPS link for the GitHub repo, and choose the directory in which you want to view the source code. Then, using git clone and the https that is obtained, you clone the repository to your local device within the directory you want. 
The other way is to download the code as a zip file, again from GitHub. The code is downloaded from the green “Code” button, clicks the download ZIP. The file should then be unzipped. Then you open your chosen Integrated Development Environment and open the unzipped code file to view the source code. 
### Layout of the Directory 
The directory is mostly self-explanatory. Every page that you are redirected to has its own separate folder. The docs folder contains the images that are used within the code, for example the logo and the custom headers within the main page. The biggest folder is the src, which contains app, assets, and environments. In the app folder, there are the pages, each having their own css, html and ts file. The models files are crucial when creating a new collection within the database. It contains every collection we’re keeping track of (matches, messages, news, polls). Shared\services are responsible for keeping track of the database implementation and sending/receiving data from our database. App-routing module is for creating paths within the web app and app.module is where we initialize our declarations and export them as necessary. 
### Build and Deploy 
You need to run ng serve in order to start code. Then you navigate to localhost with the port 4200 in order to see the web application. We used Vercel to deploy our server, which uses your Git account to access the projects within. Vercel is also in sync with the project, meaning every change you make within the source code that you push the GitHub will automatically be deployed to Vercel as well.
