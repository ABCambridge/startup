[notes reference file](./notes.md)
# Startup Assignment
## Elevator Pitch
FastChat is a web application that allows for instant messaging between profiles, including group chats. It's free, updates messages instantly, and can be used from anywhere because it is based out of a browser. Users can get their accounts for free, customize their display name, and contact any other user on the platform using the provided search functions. Conversations persist between sessions and users can easily see their conversations on their side panel.
## Technologies
* HTML: Structure of the side panel, login window, and chat window will all be in HTML.
* CSS: Styling of all the windows, including colors and animation of sending/receiving messages, and appearance of side panel will be accomplished using CSS.
* JavaScript: Used to manage and manipulate the CSS, access and edit HTML elements, and display data received from Web Sockets.
* Web Service Calls: Calls the server that provides data about what other running instances of the web application.
* Web Service Provision: Provides services with back and forth contact with the server and allowing the user to access the FastChat application.
* Authentication: Users create an account and then use their account to login each time they access the web application.
* Data Persistence: Login info, chats (recipients, titles), and messages persist accross each web app session by being stored in a cloud database.
* Web Sockets: Used to render realtime reception and sending of messages while the user is using the application.