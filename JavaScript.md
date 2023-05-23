[notes reference file](./notes.md)

### Make sure to use 'use strict'; at the top of all your JS.
# Manipulating the DOM
* querySelector type functions allows you to grab all elements of a certin type
* get by Id and get by element are also available
* both of the above save you from constantly manually walking through the DOM tree
* setting the element.innerHTML equal to new HTML allows you to inject different HTML, although this is the incorrect way to do it.
* ### Example Correct DOM manipulation
```
    function insertChild(selector, text){
        const newChild = document.createElement('div');
        newChilde.textContent = text;
        const parentElement = document.querySelector(selector);
        parentElement.appendChild(newChild); 
        }
```

# Event handlers
* you can add your event handlers to your HTML by using JS rather than directly in the HTML.

# This pointer
* a function's this pointer is usually that of its owning object, but global functions don't have an owning object, so it is undefined.
# Classes and objects
* remember to use commas when explicitly declaring an object.
* when you create a getter or setter method, don't call it with () or else there will be an error.
* when throwing an error, you can use "new Error()" with a message passed into the constructor, rather than creating your own object with a message data member.

## Temporary JS implementation notes:
### Login page (index)
* JS to get the username and password when the "login" button is clicked
    * \[async\] stub function to call the server and compare against known passwords
        * use a fake, hardcoded set of credentials?
        * if successful login, stores the username and an authtoken (hard coded) in local memory
        * if unsuccessful, displays an alert that the credentials are invalid
* JS to change to create account page when that button is clicked

### Create new account
* JS to get all of the information from the fields when the "create account" button is clicked.
    * confirms that the passwords match
    * submits the info to the server
        * if successful, logs the user in as normal and goes to the main messaging page
        * if unsuccessful (i.e., non-unique password/username or mismatching passwords or blank fields), displays an alert
* JS to go back to the login screen when that button is clicked

### main messaging page
* Before loading anything, checks if there is a valid authtoken in the local memory.
    * If unsuccessful, displays an error and redirects to the login page
    * successful, continues to load as normal
* JS loads an imaginary list of users into the conversations.
    * temp user list is hard coded, but will actually come from server
* Before a conversation is selected, the send button will not work (no selected conversation) and the conversation title should say: "select a conversation"
* When a conversation is selected, the hard coded "previous" messages (that would be from the database) should be loaded into the message board, followed by any messages to/from that user stored in local memory, and the conversation title will be updated to "conversation with \[user name\]"
* Every 15 seconds, a hard coded message "from" the other user is "sent." 
    * represents a websocket communicator function
* Messages sent from the current user are displayed and put in local memory.
    * would normally be sent via websocket to the server
    * when a message is sent, the new message block is inserted and the typing-box is cleared.
* Logout button should clear the username and authtoken from local memory and redirects to the login page
* settings button checks the authotken against the server and then redirects (if successful) to the settings page

### Settings
* JS puts previous login information (obtained from DB) into the fields
* JS to get the info from the fields when submit button is clicked (doesn't work if there are blank fields)
* uses current authtoken to ask to change the information for the logged in user
    * error is displayed if non-unique or missing information, otherwise, success alert is displayed
    * success redirects to the main messaging page
* back to messages does nothing with input information and returns to messaging page with the normal redirect process


