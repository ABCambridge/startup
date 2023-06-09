[notes reference file](./notes.md)
# Startup Assignment
## Elevator Pitch
FastChat is a web application that allows for instant messaging between profiles, including group chats. It's free, updates messages instantly, and can be used from anywhere because it is based out of a browser. Users can get their accounts for free, customize their display name, and contact any other user on the platform. Conversations persist between sessions and users can easily see their conversations on their side panel.
## Features
* Main messaging window: displays messages in the current conversation and allows new messages to be recieved and sent. Also contains the chats panel.
    * Chats panel: side panel listing other users that the current user can chat with.
    * Main messaging window contains options to log-out or access settings
* Login window: allows the user to login in order to access their messages or provides functionality to create a new account.
    * Login window contains link to the account creation page.
    * Also displays an inspirational quote on the Login window.
* Account Creation Page: lets the user set their display name, login username, and login password.
    * Account Creation Page contains a back link to the login page
* Settings page: allows users to edit their display name and login credentials.
    * Settings page contains a link back to the main messaging window
## Technologies
* HTML: Structure of the side panel, login window, and chat window will all be in HTML.
* CSS: Styling of all the windows, including colors and animation of sending/receiving messages, and appearance of side panel will be accomplished using CSS.
* JavaScript: Used to manage and manipulate the CSS, access and edit HTML elements, and display data received from Web Sockets. JavaScript will also access third party services for the quote of the day.
* Web Service Calls: Displays an inspirational quote on the login screen by calling a third party quote service.
* Web Service Provision: Provides services with back and forth contact with the server and allowing the user to access the FastChat application Calls the server that provides data about what other running instances of the web application.
* Authentication: Users create an account and then use their account to login each time they access the web application.
* Database Persistence: Login info, chats (recipients, titles), and messages persist accross each web app session by being stored in a cloud database and accessed by the web application.
* Web Sockets: Used to render realtime reception and sending of messages while the user is using the application. Also used to access the quote of the day for the login page.
## Design Draft
![FastChat design](./FastChat_design.jpg)

## HTML Deliverable
For this deliverable, I added the application structure.
* HTML pages: 4 HTML pages for each "view" the user can access. This includes the login page (index.html), the account creation page, the main messaging page, and the settings page.
* Links: The bottom of each page includes a link to the public github repository. The submit buttons are a part of form elements that follow specific links to other pages in the application.
* Text: Messages, conversations, the inspirational quote, and text field labels are represented with the necessary text to describe the structure of the application.
* Images: The header of each page includes the FastChat logo image imbedded in the HTML.
* Login placeholder: login page (index.html) contains text fields for the user to input their username and password. Username is displayed in the header of messageHome.html once the user logs in.
* Database data: messageHome.html lists other users in the data base that the current user can select to chat with (under the "Conversations" section).
* WebSocket data: messageHome.html lists messages in the current chat that will be updated live through WebSockets as other users message the current user through the server (under "Conversation with User2" section).

## CSS Deliverable
For this deliverable, I added the application styling in the following ways:
* Header, footer, and main content body: All pages share a unified header and footer (consistent coloring and format) that are reactive to screen size. Footer contains my name as the author and a link to my github repository for the project. Header displays the application title. On the main message screen, the header also has a menu allowing for navigation.
* Navigation Elements: Buttons are colored based on whether they are affirmative/forward action buttons or have to do with going back. Each redirects the user to the correct page and they all share a consistent styling. Most pages have navigation buttons in the main body, but the main message screen has a navigation menu in the header allowing the user to either logout or access their settings.
* Responsive to window resizing: the header (and its potential menu) adjust to the width of the screen by going from a row to a column format. Both the header and footer disappear if the screen is not tall enough. Additionally, the contents of the main bodies rearrange themselves based on the available width and height of their view. Internal elements of the main body also adapt to the width of their parents and the screen, allowing the application to be functional and viewable in all screen sizes.
* Application elements: Used consistent styling to indicate certain types of fields or elements. They are easily distinguishable from each other and make sense visually. All adapt to screen size.
* Application text content: Font is consistent throughout. Most text uses a single font, while buttons have their own font.
* Application images: Front image is flexible and its format responds to the width of the page. It is aligned in relation to the rest of its family elements.

## JavaScript Deliverable
For this deliverable, I added the functionality through JavaScript in the following ways:
* Login: JS reads in the username and password provided and compares them to hardcoded credentials (this will be replaced with a validation call to the database). To successfully login the first time, the username is "Andrew" and the password is "Cambridge." However, the username and password can be changed in the settings once logged in and used to log in again while local memory persists.
* Database data: username and password and authtoken are compared to hard coded values that will eventually be coming from the database. Also, the messages that originally load into the converstations come from an array the represents what you would find in the database. Pulling these messages also includes when the user navigates back to the main message screen from the settings screen. Messagse also persist between logouts (since there is only one valid user).
* WebSocket: setInterval is used to send automated messages every 10 seconds in whatever conversation is being viewed at the time to represent messages that will be coming in. Sent messages are also displayed. Both received and sent are stored in the "database" in local memory so that messages persist after navigating between conversations and the settings screen, as well as logging the user out. This represents what will be stored in the database eventually.
* Interaction Login: the app allows you to navigate between all of its pages, provides error alerts when fields are not filled in correctly, doesn't let you send a message without a conversation selected, correctly sends a conversation and displays it in the appropriate conversation. The username is update in the top bar when logged in and updates based on how it may be changed in the settings tab. The Settings tab updates the autofills based on what has been submitted by the user. Creating an account also changes how you log in. Fully interactive, but can't talk to a database.

## Service Deliverable
For this deliverable, I added the following functionality:
* Node.js & Express: complete - server uses node.js and express to manage service calls and endpoints.
* Frontend uses express static middleware: complete - server uses the express static functionality to serve up all of my files in public folder
* Frontend calls third parts services: complete - client calls a free quoting service that periodically updates the quote on the login page.
* Backend provides service endpoints: complete - server takes all needed endpoint calls and returns the appropriate response and data based on what it keeps in memory.
* Frontend calls service endpoints: complete - client makes various calls the service endpoints which reply with the pertinent data.image.png

## Database Deliverable
For this deliverable, I added the following functionality:
* MongoDB Atlas database created: done! database.js contacts the database and my information is stored in there
* Backend endpoints for manipulating data: done and working! The server edits and accesses data in the database and serves it to the client. The server calls functions on the database.js file, which then provides functionality for the client to server endpoints. All data persists in the database.
* Stores applicatoin data in MongoDB: Done! All user and message data is stored in the database.

## Login Deliverable
For this deliverable, I refined the following functionality:
* Supports new user registration: done! new users are able to create an account with a unique username and are immediately logged in. Passwords are encrypted in the data base.
* Supports existing user authentication: done! existing users can log in and their password is compared to the encrypted on in the database. Users can update their username and password and are immediately still authenticated and can use the new info to login.
* Store/retrieves credentials in MongoDB: done! all credentials are stored in MongoDB (username, encrypted password, authtoken).
* Resticts functionality based on authentication: done! you can only access the messaging or settings page when you are logged in. Trying to access them while logged out results in being redirected to the login page.

## WebSocket Deliverable
For this deliverable, I added the following functionality:
* Backend listens for WebSocket connection: done! My server upgrades connections to WebSocket and creates all of the callbacks needed. Listens for messages sent from the client and forwards them to the appropriate connections based on the intended recipient.
* Frontend makes WebSocket connection: done! Client immediately opens a WebSocket connection with the server when the messaging page is loaded, and then sends and receives messages.
* Data sent over WebSocket connection: done! After a connection is open, the client sends the server some info identifying its user. Messages are both sent and received over the WebSocket.
* WebSocket dat displayed in the application interface: done! When the client receives a WebSocket message containing a new message, it processes it and displays the data's contents as a new message (assuming the message is for the chat they have open).

## React Deliverable
For this deliverable, I added the following functionality:
* Bundled using Vite: yes! I used Vite to develop my code and bundle it for production.
* Multiple functional react components: yes! Each of the 4 pages is now represented by a react component within the App component.
* React router: yes! My pages are wrapped in a BrowserRouter so that I could use the Route functionality. Rather than accessing the routes through NavLinks (due to the structure of my site), I used the useNavigate property to dynamically route to a different component. This took some research, but works well.
* React hooks: yes! My react components use useState, useEffect, and useNavigate hooks throughout the application.