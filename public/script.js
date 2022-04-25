//Add links to the javascript in full calendar
const socket = io();

//Creates a class that will represent the sideBar
class sideBar {
    //Creates a constructor for sideBar
    constructor() {
        //Stores the html content of sideBar
        this.sideBar = "";
    }

    //Creates the Side Bar in index.html
    createSideBar() {
        //Firstly, create a new div tag that will store the side bar
        this.sideBar = document.createElement("div");

        //Set the id of sideBar to sideBar
        this.sideBar.setAttribute("id", "sideBar");

        //Next, create three headers
        //The first header represents the Homepage
        //The second header represents the Calendar, and the last headerrepresents to To-Do list

        //Create a new header tag for Homepage
        let homePage = document.createElement("h2");

        //Set the inner html of homepage to be Home 
        homePage.innerHTML = "Home";

        //Set the id of homepage to be homePageTitle
        homePage.setAttribute("id", "homePageTile");

        //Append homePage to sidebar
        this.sideBar.append(homePage);

        //Create a new header tag
        let calendar = document.createElement("h3");

        //Set innerhtml of calendar to be Calendar
        calendar.innerHTML = "Calendar";

        //Sets its id to be calendarLink
        calendar.setAttribute("id", "calendarLink");

        //Attach calendar to sideBar
        this.sideBar.appendChild(calendar);

        //Create a new header tag for to do list
        let todoList = document.createElement("h3");

        //Set innerhtml of todoList
        todoList.innerHTML = "Todo List";

        //Sets its id to be todoListLink
        todoList.setAttribute("id", "todoListLink");

        //Attach todoList to sideBar
        this.sideBar.appendChild(todoList);

        //Attach sideBar to body
        // window.document.querySelector("body").appendChild(this.sideBar);
    }
}

//Represents a calendar for the user
class calendarInterface {
    //Constructor for calendar class
    constructor() {
        //Contains the html content of claendar
        this.calendar;

        //Next, create a new fullCalendar to render
        this.fullCalendar;

    }

    //Creates a new calendar for the homepage
    createCalendar() {
        //Firstly, create a new div element
        this.calendar = document.createElement("div");

        //Set the id of cal to be be calendar
        this.calendar.setAttribute("id", "calendar");

        //Next, attach cal to the body
        // window.document.querySelector("body").appendChild(this.calendar);

        //Create a new FullCalendar, no new parameters for now
        this.fullCalendar = new FullCalendar.Calendar(this.calendar, {
            headerToolbar: {
                center: 'addEventButton,deleteEventButton'
            },
            customButtons: {
                addEventButton:
                {
                    text: 'Add Event',
                    click: function () {
                        createEventPrompt();
                    }
                },
                deleteEventButton:
                {
                    text: 'Delete Event',
                    click: function () {
                        deleteEventPrompt();
                    }
                }
            }
        });

        //Render fullCalendar
        this.fullCalendar.render();

        //Resize the window to fit fullCalendar properly
        window.dispatchEvent(new Event('resize'));
    }

    //Loads the full calendar
    loadCalendar(events) {
        //Set fullcalendar's event source to be events
        this.fullCalendar.addEventSource(events);
    }

    //Deletes an event from fullcalendar
    deleteEvent(deletedEvent) {
        //Go through each event in fullcalendar
        for (let event of this.fullCalendar.getEvents()) {
            //Create a variable that checks if an event is deleted
            let eventDeleted = false;

            //Modified start date
            let start = new Date(event.start);
            start = start.toISOString().slice(0, 10);

            //Create end to store event.end
            let end = null;

            //If event.end is not null
            if (event.end != null) {
                //Modified end date
                end = new Date(event.end);
                end = end.toISOString().slice(0, 10);
            }

            //Next, check if deletedEvent is the same as event
            let sameTitle = deletedEvent.title == event.title;
            let sameStart = deletedEvent.start == start;
            let sameEnd = deletedEvent.end == end;
            let sameColor = deletedEvent.color == event.backgroundColor;

            //If deltedEvent is the same as event
            if (sameTitle && sameStart && sameEnd && sameColor) {
                //Remove the event from full calendar
                event.remove();

                //Set eventDeleted to be true
                eventDeleted = true;

                return;
            }


            //If eventDelted is true, break the loop
            if (eventDeleted == true) break;
        }
    }

}

//To-Do List Class
class todoList {
    //Constructor for Todo-List
    constructor() {
        //Stores the html content of todoList
        this.todoList;
    }

    //Creates todoList
    createTodoList() {
        //Firstly, create a new div element called todoList
        this.todoList = document.createElement("div");

        //Set the id of div to be todoList
        this.todoList.setAttribute("id", "todoList");

        //Create the header div for todoList
        this.todoList.appendChild(this.createHeader());

        //Create the project-form div for todoList
        this.todoList.appendChild(this.createProjectForm());

        //Create the todo-form div for todoList
        this.todoList.appendChild(this.createTodoForm());

        //Create the body div for todoList
        this.todoList.appendChild(this.createBody());

        //Attach todoList to body
        //window.document.querySelector("body").appendChild(this.todoList);
    }

    //Create an tag by passing in a class and id
    //Class and id won't be added to the tag if 
    //either of them are null
    createTags(type, id, css) {
        //Firstly, create the newElement by using the doucment querySelector to create
        let newElement = document.createElement(type);

        //Next, check if id is not null
        //If id is null
        if (id != null) {
            //Set the attribute of newElement to be id
            newElement.setAttribute("id", id);
        }

        //Next, check if css is not null
        //If css is null
        if (css != null) {
            //Set the class of newElement to be css
            newElement.setAttribute("class", css);
        }

        //Finally, return newElement
        return newElement;
    }

    //Create TodoList Header
    createHeader() {
        //Create the first div tag
        let div1 = this.createTags("div", null, "header");

        //Add the second div tag
        let div2 = this.createTags("div", null, "header-cotainer");

        //Add the third div tag
        let div3 = this.createTags("div", null, "title");

        //Set the inner html to be div3
        div3.innerHTML = "Todo List";

        //Append div3 to div2 and div2 to div1
        div2.appendChild(div3);
        div1.appendChild(div2);

        //Return div1
        return div1;
    }

    //Create div tag for project-form
    createProjectForm() {
        //Create the first div tag
        let div1 = this.createTags("div", "project-form", null);

        //Create the second div tag
        let div2 = this.createTags("div", "formcontent", null)

        //Create the third div tag
        let div3 = this.createTags("div", "close", null);

        //Set the inner html of div3
        div3.innerHTML = " x ";

        //Add div3 to div2 and div2 to div1
        div2.appendChild(div3);
        div1.appendChild(div2);

        //Return div1
        return div1;
    }

    //Create div tag for todo-form
    createTodoForm() {
        //Create the first div tag
        let div1 = this.createTags("div", "todo-form", null);

        //Create the second div tag
        let div2 = this.createTags("div", "formcontent1", null);

        //Create the third div tag
        let div3 = this.createTags("div", "close1", null);

        //Set the inner html of div3
        div3.innerHTML = " x ";

        //Add div3 to div2 and div2 to div1
        div2.appendChild(div3);
        div1.appendChild(div2);

        //Return div1
        return div1;
    }

    //Create a div tag for project-headers
    createProjectHeaders() {
        //Create the first div tag
        let div1 = this.createTags("div", null, "project-headers");

        //Create the second div tag
        let div2 = this.createTags("div", null, "project-buttons");

        //Create the button tag for addProject
        let button = this.createTags("button", "addProject", null);

        //Add classes to button
        button.classList.add("addProject", "button2");

        //Set the inner html of button to be Add project
        button.innerHTML = "Add project";

        //Add button to div2 and add div2 to div1
        div2.appendChild(button);
        div1.appendChild(div2);

        //Return div1
        return div1;
    }

    //Create a div-tag for form
    createForm() {
        //Create the first div tag
        let div1 = this.createTags("div", null, "form");

        //Create the second div tag
        let div2 = this.createTags("div", null, null);

        //Add the label 
        let label = document.createElement("label");

        //Set the attribute of label to for
        label.setAttribute("for", "todo");

        //Create the input tag
        let input = this.createTags("input", "todo", null);

        //Set the type of input to be text
        input.setAttribute("type", "text");

        //Next, add label and input to div2 and div2 to div1
        div2.appendChild(label);
        div2.appendChild(input);
        div1.appendChild(div2);

        //Next, add a button
        let button = this.createTags("button", null, "add button2");

        //Set the innerhtml of button
        button.innerHTML = "+";

        //Finally, add button to div1
        div1.appendChild(button);

        //Return div1
        return div1;
    }

    //Create the div body
    createBody() {
        //Firstly, create the first div tag
        let div1 = this.createTags("div", null, "body");

        //Create the second div tag
        let div2 = this.createTags("div", null, "container");

        //Create the third div tag
        let div3 = this.createProjectHeaders();

        //Create the fourth div tag
        let div4 = this.createForm();

        //Create the fifth div tag
        let div5 = this.createTags("div", null, "list");

        //Add div3, div4, and div5 to div2
        div2.appendChild(div3);
        div2.appendChild(div4);
        div2.appendChild(div5);

        //Add div2 to div1
        div1.appendChild(div2);

        //Return div1
        return div1;
    }

}

//Contains all information about the user homePage
class homePage {
    //Constructor for home page
    constructor() {
        //Create all three parts of the homepage
        //The sideBar
        this.side = new sideBar();

        //The Calendar
        this.cal = new calendarInterface();

        //The TodoList
        this.to = new todoList();

        //Contains all the html content of homepage
        this.homePage;
    }

    //Creates the homepage 
    render() {
        //Create a new div tag for homepage
        this.homePage = document.createElement("div");

        //Set the id of homepage to be homepage
        this.homePage.setAttribute("id", "homepage");

        //Add the class of homepage to be maincontainer
        this.homePage.setAttribute("class", "mainContainer")

        //Render the calendar, the todo list, and side bar
        this.cal.createCalendar();
        this.to.createTodoList();
        this.side.createSideBar();

        //Next, attach the sideBar, todolist, and calendar to homePage
        this.homePage.appendChild(this.cal.calendar);
        this.homePage.appendChild(this.to.todoList);
        this.homePage.appendChild(this.side.sideBar);

        //Hide the todoList
        this.to.todoList.style.display = "none";

        //Show the calendar
        this.cal.calendar.style.display = "";

        //Hide the homePage
        this.homePage.style.display = "none";

        //Add switches 
        this.addSwitches();
    }

    //Add switches to the headers of sideBar
    addSwitches() {
        //Firstly, get the children of the sideBar
        let headers = this.side.sideBar.children;

        //Next, get the second and third children of the sideBar
        //Which are the calendar and todoList headers
        let calendarLink = headers[1];
        let todoListLink = headers[2];


        //Next, add an event listener to calendarLink
        calendarLink.addEventListener("click", (e) => {
            //Firstly, check if calendar is hidden
            //If the calendar is hidden
            if (this.cal.calendar.style.display == "none") {
                //Hide todo list
                this.to.todoList.style.display = "none";

                //Show the calendar
                this.cal.calendar.style.display = "";

                //Updates the calendar by resizing it
                window.dispatchEvent(new Event('resize'));
            }
        })

        //Next, add an event listner to todoListLink
        todoListLink.addEventListener("click", (e) => {
            //Firstly, check if the todoList is hidden
            //If the todoList is hidden
            if (this.to.todoList.style.display == "none") {
                //Hide the calendar
                this.cal.calendar.style.display = "none";

                //Show the todoList
                this.to.todoList.style.display = "";
            }
        })
    }

    //This function is call to hide everything about the homepage
    hideHomePage() {
        //Set the display of the homepage to be none
        this.homePage.style.display = "none";
    }

    //Show the homePage
    showHomePage() {
        //Set the dispaly of the homepage to be ""
        this.homePage.style.display = "";

        //Resize the window to fit fullCalendar properly
        window.dispatchEvent(new Event('resize'));
    }
}

//Create a new home page
let home = new homePage();
home.render();

//Attach the homePage to body
window.document.querySelector("body").appendChild(home.homePage);



class User {
    constructor(name, email, permissions, profilePicture) {
        this.name = name
        this.email = email
        this.servers = new Set()
        this.status = 3
        this.permissions = permissions
        this.profilePicture = profilePicture
        this.server = ""
        this.channel = ""
        this.room = ""
    }

    // Getters
    servers() {
        return this.servers
    }
    email() {
        return this.email
    }
    name() {
        return this.name
    }
    perms() {
        return this.permissions
    }

    currentRoom() {
        return this.room;
    }

    addServer(server) { // adds a server for the user
        if (this.servers.has(server)) return false
        this.servers.add(server)
        return true
    }

    removeServer(server) { // removes a server from the user
        if (this.servers.has(server)) return false
        this.servers.delete(server)
        return true
    }

    changePerms(perm) { // changes the user's permissions
        this.permissions = perm
    }

    changePicture(picture) { // changes the user's profile picture
        this.picture = picture
    }

    setCurrentRoom(room) {
        this.room = this.server + this.channel
    }

    setCurrentChannel(channel) {
        this.channel = channel
    }

    setCurrentServer(server) {
        this.server = server
    }
}

class Server {
    constructor(name, channels) {
        this.name = name
        this.channels = new Array();
        for (let i = 0; i < channels.length; i++) {
            this.channels.push(channels[i])
        }

        this.users = new Set()

        this.createServerButton()
    }

    createServerButton() { //creates the sidebar of server buttons 
        let button = document.createElement("button");
        let temp = document.createTextNode(this.name);
        button.appendChild(temp);
        button.addEventListener("click", () => {
            this.loadRooms()
            leaveHome();
            let messages = document.getElementById('chatborder');
            if (currentUser.room != "") {
                console.log(currentUser.room)
                socket.emit('leaveRoom', {})
            }

            while (chatborder.childNodes.length > 2) {
                chatborder.removeChild(chatborder.lastChild)
            }

            document.getElementById('chatroomHeader').innerHTML = this.name;


            currentUser.setCurrentServer(this.name)


        });
        button.className = "serverButton";
        button.id = this.name + "server";
        document.getElementById("classes").insertBefore(button, document.getElementById("editServerBtn"));
    }

    loadRooms() { //creates the chatrooms based on the channels stored on the server
        let childChecker = document.getElementById("rooms");

        while (childChecker.hasChildNodes()) //removes the chatrooms previously listed
        {
            childChecker.removeChild(childChecker.children[0]);
        }

        // Edit Channels button:
        let button = document.createElement("button");
        let temp = document.createTextNode("Edit Channels");
        button.appendChild(temp);
        button.addEventListener("click", () => editChannels());
        button.className = "roomButton";
        button.id = "editChannelBtn";
        document.getElementById("rooms").appendChild(button);

        // The rest of the channels:
        for (let channel of this.channels) {
            let button = document.createElement("button");
            let temp = document.createTextNode(channel.name);
            button.appendChild(temp);
            button.addEventListener("click", () => {
                this.colorChange(channel)
                if (currentUser.room != "") {
                    socket.emit('leaveRoom', {})
                }
                while (chatborder.childNodes.length > 2) {
                    chatborder.removeChild(chatborder.lastChild)
                }
                currentUser.setCurrentChannel(channel.name)
                currentUser.setCurrentRoom(channel.name)

                console.log()
                socket.emit('joinRoom', currentUser)
                // add userlist functionality?
                socket.on('roomUsers', (currentUser) => {
                    // outputRoomName(currentUser.room)
                    // outputUsers(currentUser.users)
                })
            });
            button.setAttribute("Id", channel.name)
            button.className = "roomButton";
            button.id = channel.name + "channel";
            document.getElementById("rooms").appendChild(button);
        }
    }

    colorChange(channel) { //resets the color to light grey
        for (let temp of this.channels) {
            document.getElementById(temp.name + "channel").style.color = "LightSlateGrey";
        }

        channel.loadChatroom()
    }

    addChannel(channel) { // adds a channel/chatrom to the server
        for (let iterator of this.channels)
            if (iterator.name == channel.name) {
                alert("Channel already exists!")
                return;
            }

        this.channels.push(channel);
        let button = document.createElement("button");
        let temp = document.createTextNode(channel.name);
        button.appendChild(temp);
        button.addEventListener("click", () => this.colorChange(channel));
        button.setAttribute("Id", channel.name)
        button.className = "roomButton";
        button.id = channel.name + "channel";
        document.getElementById("rooms").appendChild(button);

        this.loadRooms();
    }
    removeChannel(channelName) { // removes a channel/chatroom from the server
        for (let i = 0; i < this.channels.length; i++)
            if (this.channels[i].name == channelName) {
                this.channels.splice(i, 1);
                break;
            }

        this.loadRooms();
    }
}

class Channel {
    constructor(name, server) {
        this.chatLogs = [] // maybe make this into set?
        this.server = server
        this.name = name
    }

    loadChatroom() { //changes the selected chatroom to blue
        document.getElementById("chatroomHeader").innerHTML = this.server + "'s " + this.name + " Chatroom";
        document.getElementById(this.name + "channel").style.color = "rgb(6, 87, 238)";
    }
    // double check on how to link message with actual message in chatroom, right now its by text but could be by time/id
    message(message) {
        for (let i = 0; i < this.chatLogs.length; i++) {
            if (message == this.chatLogs[i].text) return this.chatLogs[i]
        }
    }
    addChat(message) {
        this.chatLogs.append(message)
    }

    removeChat(message) {
        let found = false;
        for (let i = 0; i < this.chatLogs.length; i++) {
            if (message == this.chatLogs[i].text) {
                this.chatLogs.splice(i, 1)
                found = true;
            }
        }
        return found;
    }
}

class ChatMessage {
    constructor(user, time, text) {
        this.user = user
        this.time = time
        this.text = text
    }

    user() {
        return this.user
    }
    time() {
        return this.time
    }
    text() {
        return this.text
    }

    setText(text) {
        this.text = text
    }

}
let id = Math.floor(Math.random() * 10000000)

let currentUser = new User("Guest" + id, "example@gmail.com", "", "");

function setUser() {

}

function onSignIn(googleUser) { // uses the Google API sign in
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    document.getElementById("myModal").style.display = "none";
    currentUser = new User(profile.getName(), profile.getEmail(), "", profile.getImageUrl())

}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'theme': 'dark'
    });
}


var span = document.getElementsByClassName("close")[0];
var spanCreate = document.getElementsByClassName("close")[1];
var spanClose = document.getElementsByClassName("close")[2];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    document.getElementById("myModal").style.display = "none";
}

// When the user clicks on <span> (x), close the modal
spanCreate.onclick = function () {
    document.getElementById("createEvent").style.display = "none";
}

//When user clicks on <span> (x), closes the modal for deleting an event
spanClose.onclick = function () {
    document.getElementById("deleteEvent").style.display = "none";
}

//Goes to the homepage
function goHome() {

    //Hide the rooms bar, chatroom header, and chatroom from the display
    window.document.querySelector("#rooms").style.display = "none";
    window.document.querySelector("#chatroomHeader").style.display = "none";
    window.document.querySelector(".chatroom").style.display = "none";

    //Shows the home page
    home.showHomePage();
}

//Leaves the home page
function leaveHome() {
    //Hides the home page
    home.hideHomePage();

    //Display the room bar, chatroon, and chatroom header
    window.document.querySelector("#rooms").style.display = "";
    window.document.querySelector("#chatroomHeader").style.display = "";
    window.document.querySelector(".chatroom").style.display = "";

}

let spanChannel = [
    new Channel("Homework Help", "Spanish"),
    new Channel("Group Chat", "Spanish"),
    new Channel("Exam Prep", "Spanish")
]

let chemChannel = [
    new Channel("Homework Help", "Chemistry"),
    new Channel("Group Chat", "Chemistry"),
    new Channel("Exam Prep", "Chemistry")
]
let englChannel = [
    new Channel("Homework Help", "Writing"),
    new Channel("Group Chat", "Writing"),
    new Channel("Exam Prep", "Writing")
]
let mathChannel = [
    new Channel("Homework Help", "Calculus"),
    new Channel("Group Chat", "Calculus"),
    new Channel("Exam Prep", "Calculus")
]

let servers = [
    new Server("Calculus", mathChannel),
    new Server("Writing", englChannel),
    new Server("Chemistry", chemChannel),
    new Server("Spanish", spanChannel)
]

let sendButton = document.getElementById('send')
let chatBorder = document.getElementById('chatborder')
let sendBox = document.getElementById('chatbox')

sendBox.addEventListener("keypress", function (event) { //calls send message when user presses the enter button
    if (event.key === 'Enter') {
        if (currentUser.channel != "") {
            const msg = sendBox.value;
            socket.emit('chatMessage', msg)
            chatbox.value = "";
        } else {
            alert("Error: please join a room")
        }
    };
})

sendButton.addEventListener('click', (e) => {
    let chatbox = document.getElementById("chatbox")
    if (currentUser.channel != "") {
        const msg = chatbox.value


        socket.emit('chatMessage', msg)
        chatbox.focus()
        chatbox.value = "";
    } else {
        alert("Error: please join a room")
    }

})

socket.on('message', message => {
    console.log(message)
    sendMessage(message)
    chatBorder.scrollTop = chatBorder.scrollHeight;
})

function sendMessage(message) {

    let chatborder = document.getElementById("chatborder"); // parent, containing all the messages
    let chatbox = document.getElementById("chatbox"); // input box
    let textLine = document.getElementById("textLine"); // child of chatborder, parent to chatbox

    var currentdate = new Date(); // obtains the current time
    var datetime = currentdate.getDate() + "/" // contains the date and time information
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + ", "
        + currentdate.getHours() + ":";
    if (currentdate.getMinutes() < 10)
        datetime += "0";
    datetime += currentdate.getMinutes();

    let newMessage = document.createElement("div"); // the message to add to chatborder
    let userInfo = document.createElement("div"); // the time and user information of the message
    let messageText = document.createElement("div"); // the actual text of the message
    userInfo.id = "userinfo"
    messageText.id = "message-text"


    let name = document.createElement("p")
    let date = document.createElement("p")
    name.id = "username"
    newMessage.setAttribute('class', 'chat-message')
    name.textContent = `   ${message.username}`;
    date.textContent = `${message.time}`
    userInfo.appendChild(name)
    userInfo.appendChild(date)


    messageText.textContent = message.text;

    newMessage.appendChild(userInfo); // first append the new message with the information
    newMessage.appendChild(messageText); // and then the text itself

    console.log(message.time, message.username, message.text)

    // Appropriately inserts the new message to chatborder
    if (chatborder.childElementCount == 1) {
        chatborder.appendChild(newMessage)
    }
    else { chatborder.insertChildAtIndex(newMessage, 1) }

    //console.log(chatborder.childElementCount)
}

Element.prototype.insertChildAtIndex = function (child, index) {
    if (!index) index = 0
    if (index >= this.children.length) {
        this.appendChild(child)
    } else {
        this.insertBefore(child, this.children[index])
    }
}

function editServerBtn() {
    let button = document.createElement("button");
    let temp = document.createTextNode("Edit Server");
    button.appendChild(temp);
    button.addEventListener("click", () => editServers());
    button.className = "serverButton";
    button.id = "editServerBtn";
    document.getElementById("classes").appendChild(button);
}

editServerBtn();

function editServers() {
    let action = prompt("Enter add or delete: ");

    if (action == "add") {
        let serverName = prompt("Enter server name to add: ");

        let tempChannel = [
            new Channel("Homework Help", serverName),
            new Channel("Group Chat", serverName),
            new Channel("Exam Prep", serverName)
        ]
        let newServer = new Server(serverName, tempChannel);
    }

    else if (action == "delete") {
        serverName = prompt("Enter server name to delete: ");
        document.getElementById("classes").removeChild(document.getElementById(serverName + "server"));
    }
}

function editChannels() {
    let action = prompt("Enter add or delete: ");

    let index = 0;
    for (let i = 0; i < servers.length; i++) {
        if (servers[i].name == currentUser.currentRoom())
            index = i;
    }

    if (action == "add") {
        let channelName = prompt("Enter channel name to add: ");

        let newChannel = new Channel(channelName, "", currentUser.currentRoom());
        servers[index].addChannel(newChannel);
    }

    else if (action == "delete") {
        channelName = prompt("Enter channel name to delete: ");

        servers[index].removeChannel(channelName);
    }
}

function testSuite() {

    function addServer() {
        let originalNumber = document.querySelectorAll(".serverButton").length;
        let newServer = new Server("TestServer99", "");

        if (originalNumber = document.querySelectorAll(".serverButton").length == originalNumber + 1)
            return "PASSED";

        else return "FAILED";
    }

    function deleteServer() {
        let originalNumber = document.querySelectorAll(".serverButton").length;
        document.getElementById("classes").removeChild(document.getElementById("TestServer99server")); // same functionality as in the editServers case of delete

        if (originalNumber = document.querySelectorAll(".serverButton").length == originalNumber - 1)
            return "PASSED";

        else return "FAILED";
    }

    console.log("Test #1: adding a server " + addServer());
    console.log("Test #2: deleting a server " + deleteServer());
    calendarTests();
}

//An object that get the events of a calendar
class calendar {
    //Constructs constructor
    constructor() {
        //A list of all events of a calendar
        this.events = [];
    }

    //Adds a new event to events
    addNewEvent(newEvent) {
        //Add newEvent to events
        this.events.push(newEvent);

        //Add the current events to localstorage
        this.storeEvents();
    }

    //Store events
    storeEvents() {
        //Store the events in local storage
        window.localStorage.setItem("calendarEvents", JSON.stringify(this.events));
    }

    //Load events
    loadEvents() {
        //Load the events from local storage
        this.events = JSON.parse(window.localStorage.getItem("calendarEvents"));

        //If the event is null, set it to be []
        if (this.events == null) {
            this.events = [];
        }
    }

    //Search for all events in event
    searchEvent(title, start, end, color) {
        //Firstly, create a new list that will store the all filter items from events
        let filteredEvents = this.events;

        //Next, check if title is not empty
        //If title is not empty
        if (title.length != 0) {
            //Filter the events for any event with titile
            filteredEvents = filteredEvents.filter(event => event.title == title);
        }

        //Next check if start date is not empty
        //If start date is not empty
        if (start.length != 0) {
            //Filter the events for any event with start
            filteredEvents = filteredEvents.filter(event => event.start == start);
        }

        //Next, check if end date is not empty
        //If end date is not empty
        if (end.length != 0) {
            //Modify end
            end = new Date(end)
            end.setDate(end.getDate() + 1);
            end = end.toISOString().slice(0, 10);

            //Filter the events for any event with end
            filteredEvents = filteredEvents.filter(event => event.end == end);
        }

        //Finally, check if color is not empty
        //If color is not empty
        if (color.length != 0) {
            //Filter the events for any event with color
            filteredEvents = filteredEvents.filter(event => event.color == color);
        }

        //Return filteredEvents
        return filteredEvents;
    }

    //Removes an event from the list
    removeEvent(event) {
        let count = 0;
        let isEvent = false;
        //Goes through each events from event and filter
        this.events = this.events.filter(x => {
            isEvent = false;
            let sameTitle = x.title == event.title;
            let sameStart = x.start == event.start;
            let sameEnd = x.end == event.end;
            let sameColor = x.color == event.color;
            if (sameTitle && sameStart && sameEnd && sameColor && (count == 0)) {
                isEvent = true;
                count++;
            }

            return !(sameTitle && sameStart && sameEnd && sameColor && isEvent);
        });

        //Load the events to local storage
        this.storeEvents();
    }
}

let cal = new calendar();
cal.loadEvents();
home.cal.loadCalendar(cal.events);

//A function that creates the prompt for creating a new event
function createEventPrompt() {
    //Firstly, get the createEvent modal
    let createEvent = window.document.querySelector("#createEvent");

    //Turn off the display of the button
    createEvent.style.display = "";
}

//A function tath creates the prompt for deleting a new event
function deleteEventPrompt() {
    //Firstly, get the deleteEvent modal
    //Then, set its display to be nonthing to show the modal
    //As a result, the user will set the prompt for deleting an event
    window.document.querySelector("#deleteEvent").style.display = "";
}

//A function that creates a new event for calendar
function addEvent() {
    //Next, get all the inputs for title, startDate, endDate, and color
    let title = window.document.getElementById("createTitle").value
    let startDate = window.document.getElementById("createStartDate").value
    let endDate = window.document.getElementById("createEndDate").value
    let color = window.document.getElementById("createColor").value

    //Next, check all the inputs
    //If all the inputs are valid
    if (checkAllEventInput(title, startDate, endDate, color)) {

        //Modify endDate so that endDate will be displayed correctly if end exists
        if (endDate.length != 0) {
            let end = new Date(endDate)
            end.setDate(end.getDate() + 1);
            endDate = end.toISOString().slice(0, 10);
        }
        //If endate length is 0, set it to null
        else {
            endDate = null;
        }

        //Next, create a new event
        let newEvent = {
            title: title,
            start: startDate,
            end: endDate,
            color: color
        }

        //Add the event to the calendarInterface
        home.cal.fullCalendar.addEvent(newEvent);

        //Also add the event to the calenda object
        cal.addNewEvent(newEvent);
    }

}

//Check all values from the input
function checkAllEventInput(title, startDate, endDate, color) {
    //Firstly, check title
    //If title is not valid
    if (checkTitle(title) == false) {
        //Return false
        return false;
    }
    //Otherwise, if startDate is not valid
    else if (checkStartDate(startDate) == false) {
        //Return false
        return false;
    }
    //Otherwise, if endDate is not valid
    else if (checkEndDate(startDate, endDate) == false) {
        //Return false
        return false;
    }
    //Otherwise, if color is not valid
    else if (checkColor(color) == false) {
        //Return false
        return false;
    }
    //Otherwise, all the inputs are valid
    else {
        //Return true
        return true;
    }
}

//Checks if title is valid
function checkTitle(title) {
    //Firstly, check if title is not empty
    //If title is empty
    if (title.length == 0) {
        //Alert the user that the input is empty
        alert("Title is empty");

        //Return false
        return false;
    }

    //Otherwise, return true
    return true;
}

//Checks if startDate is valid
function checkStartDate(startDate) {
    //Firstly, check if startDate is not empty
    //If startDate is empty
    if (startDate.length == 0) {
        //Alert the user that the input is empty
        alert("Start Date is Empty");

        //Return false
        return false;
    }
    //Otherwise, if start date is not a valid
    else if (checkDate(startDate) == false) {
        //Alert the user that the input is invalid
        alert("Start Date is invalid");

        //Return false
        return false;
    }

    //Otherwise, start date is valid, return true
    return true;
}


//Checks the endDate
function checkEndDate(startDate, endDate) {
    //If the length of endDate is 0, return true
    if (endDate.length == 0) {
        //Return true
        return true;
    }
    //Otherwise, if not
    else {
        if (checkDate(endDate) == false) {
            //Alert the user that endDate is not valid
            alert("End Date is not valid");

            //Return false
            return false;
        }
        //Otherwise, if there is a startDate
        else if (startDate.length != 0) {
            //Check if the startDate come before endDate
            //If endDate does come before startDate, then end date is not valid
            if (consecutiveDates(startDate, endDate) == false) {
                //Return false
                return false;
            }
            //Otherwise, return true
            else {
                //Return true
                return true;
            }
        }
        //Otherwise, endDate is valid
        else {
            //Return true
            return true;
        }
    }
}

//Checks if a date is valid
function checkDate(date) {
    //Firstly, check if the date is the correct length
    //If the date is not the correct length
    if (date.length != 10) {
        //Return false
        return false;
    }

    //Next, check if - exists in date
    let firstDash = date.charAt(4);
    let secondDash = date.charAt(7);

    //If the firstDash and secondDash are not equal to -
    if (firstDash != '-' || secondDash != '-') {
        //Return false
        return false;
    }

    //Next, checks if there exists any dots at index 3, 6, and 9
    let firstDot = date.charAt(6);
    let secondDot = date.charAt(9);
    let thirdDot = date.charAt(3);

    //If the firstDot, secondDot, or thridDot are .
    if (firstDot == '.' || secondDot == '.' || thirdDot == '.') {
        //Return false
        return false;
    }

    //Next, get the year, month, and day from date
    let year = Number(date.substring(0, 4));
    let month = Number(date.substring(5, 7));
    let day = Number(date.substring(8, 10));

    //Next, check if year, month and day are valids integers
    //If year, month, and day are not integers
    if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
        //Return false
        return false;
    }

    ///Finallyy, create a new date
    let newDate = new Date(date.toString());

    //Check if the newDate is valid
    //If the date is not the correct value
    if (isNaN(newDate.valueOf())) {
        //Return false
        return false
    }

    //Otherwise, date is valid, 
    //Return true
    return true;
}

function consecutiveDates(startDate, endDate) {
    //Convert both startDate and endDate
    let start = new Date(startDate.toString());
    let end = new Date(endDate.toString());

    //Then check if the endDate comes after the startDate
    //To do so, subtract start from end
    //If end - start is greater than 0, then endDate comes after startDate
    if (end - start >= 0) {
        //Return true
        return true;
    }
    //Otherwise, if end- start is less than 0, then start came before end
    else {
        //Tell the user that end Date is coming before start date
        alert("End Date comes before Start Date");

        //Return false
        return false;
    }
}

//Checks if a color is valid
function checkColor(color) {
    //Firstly, create a new element that will not be used
    let element = document.createElement("p");

    //Secondly, set the color of the element to be color
    element.style.color = color;

    //Next, check the element's color
    //If the element's does not exist, then color is not valie
    if (element.style.color == '') {
        //Tell the user that color is not valid
        alert("The color does not exist");

        //Return false
        return false;
    }
    //Otherwise if the color is not in lowercase
    else if (checkColorFormat(color) == false) {
        //Return false
        return false;
    }
    //Otherwise, the color does exist
    else {
        //Return true
        return true;
    }
}

//Searches an event for the user
//The user should be allowed to search for any event
//depending on the event's title, start date, end date, and color
//The user can use multiple queries in their search
function searchEvent() {
    //Firstly, get the values for each input in the delete event modal
    //This include titile, start date, end date, and color
    let title = window.document.querySelector("#deleteTitle").value;
    let startDate = window.document.querySelector("#deleteStartDate").value;
    let endDate = window.document.querySelector("#deleteEndDate").value;
    let color = window.document.querySelector("#deleteColor").value;

    //Next, get checks if startDate, endDate, and color
    //If startDate is not empty
    if (startDate.length != 0) {
        //Use check start date
        //If the startDate is not valid, then return
        //to end the function
        if (!checkStartDate(startDate)) {
            //Return 
            return;
        }
    }

    //Next, check if endDate is valid
    //If endDate is not empty
    if (endDate.length != 0) {
        //Check if end date is valid
        //If end date is not valid, then return to end the function
        if (!checkEndDate(startDate, endDate)) {
            //Return 
            return;
        }
    }

    //Next, check if color is valid
    //If color is not empty
    if (color.length != 0) {
        //Check if color is valid
        //If color is valid, then end the function
        if (!checkColor(color)) {
            //Return
            return;
        }
    }

    //Next, filter through all events form the calendar
    let filteredEvents = cal.searchEvent(title, startDate, endDate, color);

    //Next, check if filteredEvents is not empty
    //If filteredEvents is empty
    if (filteredEvents.length == 0) {
        //Tell the user that no event is found
        alert("No event found");
    }
    //Otherwise, if filteredEvents has elements
    else {
        //Create the option list
        addOptions(filteredEvents);

        //Shows the options
        window.document.querySelector("#delete").style = "";
    }
}

//Delete all options from the delete options
function removeOptions() {
    //Firstly, use the document query selector to get deleteSelect
    let select = window.document.querySelector("#deleteSelect");

    //Next, go through each option of select
    while (select.hasChildNodes()) {
        //Remove the first option of select
        select.removeChild(select.firstChild);
    }
}

//Add new options to delete event select
function addOptions(events) {
    //Firstly, get the select for deleting events
    let select = window.document.querySelector("#deleteSelect");

    //Next, check if select still have children
    if (select.hasChildNodes()) {
        //Remove all options from the list
        removeOptions();
    }

    //Next, loop through each event in events
    for (let event of events) {
        //Created a new option
        let option = document.createElement("option");

        //Set the value of option to be event
        option.value = JSON.stringify(event);

        //Next, set the innerhtml to each property of event
        //Starting title and start date
        option.innerHTML = "Title: " + event.title + " | Start: " + event.start;

        //If the end date exists
        if (event.end != null) {
            //Modified end date
            let end = new Date(event.end);
            end.setDate(end.getDate() - 1);
            end = end.toISOString().slice(0, 10);

            //Add the end date to the option innerHTML
            option.innerHTML = option.innerHTML + " | End: " + end;
        }

        //Finally, add the color to the innerhtml
        option.innerHTML = option.innerHTML + " | Color: " + event.color;

        //Add option to select
        select.appendChild(option);
    }
}

//Deletes the event 
function deleteEvent() {
    //Firstly, get the select option
    let select = window.document.querySelector('#deleteSelect');

    //Next, get the value of the option that was selected
    let value = JSON.parse(select.options[select.selectedIndex].value);

    //Next, delete value from full calendar
    home.cal.deleteEvent(value);

    //Finally, delete the event from the calendar object
    cal.removeEvent(value);

    //Finally, hide the options
    window.document.querySelector('#delete').style.display = "none";
}

//Checks if color is in the right format
function checkColorFormat(color) {

    //Go through each character in color
    for (let i = 0; i < color.length; i++) {
        //Next, get the char at the color and get its ascii value
        let code = color.charCodeAt(i);

        //Next, use code to check if char is loweracse
        //If the character is not lowercase, then color is not lowercase
        if (code >= 65 && code <= 90) {
            //Alert the user that the color is not in lowercased
            alert("Color not in lowercase");

            //Return false
            return false;
        }
    }

    //If color is in the correct format, return true
    return true;
}

//Tests all functionallity within the calendar
function calendarTests() {
    //Turn off alerts
    let alert = window.alert;
    window.alert = function () { };

    //Test if the calendar does add a event with no end date
    function calTest17() {
        //Get the lengths of bot fullCalendar and calendar's events
        let fullLength = home.cal.fullCalendar.getEvents().length;
        let calLength = cal.events.length;

        //Set the values of all inputs for create event 
        window.document.querySelector("#createTitle").value = "Hello";
        window.document.querySelector("#createStartDate").value = "2022-04-25";
        window.document.querySelector("#createEndDate").value = "";
        window.document.querySelector("#createColor").value = "green";

        //Call addEvent
        addEvent();

        //Next, check the the length of full calendar and calender
        fullLength = home.cal.fullCalendar.getEvents().length - fullLength;
        calLength = cal.events.length - calLength;

        //If both fullLength and calLength are 1, return PASSED
        //Otherwise, return FAILED
        if (fullLength == 1 && calLength == 1) return "PASSED";
        else return "FAILED";
    }

    //Test if the calendar does add a event with an end date
    function calTest18() {
        //Get the lengths of bot fullCalendar and calendar's events
        let fullLength = home.cal.fullCalendar.getEvents().length;
        let calLength = cal.events.length;

        //Set the values of all inputs for create event 
        window.document.querySelector("#createTitle").value = "Hello";
        window.document.querySelector("#createStartDate").value = "2022-04-25";
        window.document.querySelector("#createEndDate").value = "2022-04-26";
        window.document.querySelector("#createColor").value = "green";

        //Call addEvent
        addEvent();

        //Next, check the the length of full calendar and calender
        fullLength = home.cal.fullCalendar.getEvents().length - fullLength;
        calLength = cal.events.length - calLength;

        //If both fullLength and calLength are 1, return PASSED
        //Otherwise, return FAILED
        if (fullLength == 1 && calLength == 1) return "PASSED";
        else return "FAILED";
    }

    //Test if serach the calendar with no inputs gives us a non filtered list of events
    function calTest19() {
        //Get the length of calendar's events
        let calLength = cal.events.length;

        //Next, set all the values of delete event to be empty
        window.document.querySelector("#deleteTitle").value = "";
        window.document.querySelector("#deleteStartDate").value = "";
        window.document.querySelector("#deleteEndDate").value = "";
        window.document.querySelector("#deleteColor").value = "";

        //Next, search all events
        searchEvent();

        //Next, get the number of options from delete
        let numOptions = window.document.querySelector("#deleteSelect").children.length;

        //If numOptions is the same as calLength, then return true
        //Otherwiese, return false
        if (calLength == numOptions) return "PASSED";
        else return "FAILED";
    }

    //Test if search looks for a specifc event 
    function calTest20() {
        //Next, set all the values of delete event to be empty
        window.document.querySelector("#deleteTitle").value = "Hello";
        window.document.querySelector("#deleteStartDate").value = "2022-04-25";
        window.document.querySelector("#deleteEndDate").value = "2022-04-26";
        window.document.querySelector("#deleteColor").value = "green";

        //Next, search all events
        searchEvent();

        //Next, get the number of options from delete
        let numOptions = window.document.querySelector("#deleteSelect").children.length;

        //If numOptions is the same as calLength, then return true
        //Otherwiese, return false
        if (numOptions == 1) return "PASSED";
        else return "FAILED";
    }

    //Test deleting an event from a calendar with an end date
    function calTest21() {
        //Get the lengths of bot fullCalendar and calendar's events
        let fullLength = home.cal.fullCalendar.getEvents().length;
        let calLength = cal.events.length;

        //Next, set all the values of delete event to be empty
        window.document.querySelector("#deleteTitle").value = "Hello";
        window.document.querySelector("#deleteStartDate").value = "2022-04-25";
        window.document.querySelector("#deleteEndDate").value = "2022-04-26";
        window.document.querySelector("#deleteColor").value = "green";

        //Next, search all events
        searchEvent();

        //Next, delete the event
        deleteEvent();

        //Next, get the length of fullClaendar and calendar's events
        //Next, check the the length of full calendar and calender
        fullLength = home.cal.fullCalendar.getEvents().length - fullLength;
        calLength = cal.events.length - calLength;

        //If fullLength and calLength are -1 then return passed, otherwise return failed
        if (fullLength == -1 && calLength == -1) return "PASSED";
        else return "FAILED";
    }

    //Test deleting an event with no end date
    //Test deleting an event from a calendar with an end date
    function calTest22() {
        //Get the lengths of bot fullCalendar and calendar's events
        let fullLength = home.cal.fullCalendar.getEvents().length;
        let calLength = cal.events.length;

        //Next, set all the values of delete event to be empty
        window.document.querySelector("#deleteTitle").value = "Hello";
        window.document.querySelector("#deleteStartDate").value = "2022-04-25";
        window.document.querySelector("#deleteEndDate").value = "";
        window.document.querySelector("#deleteColor").value = "green";

        //Next, search all events
        searchEvent();

        //Next, delete the event
        deleteEvent();

        //Next, get the length of fullClaendar and calendar's events
        //Next, check the the length of full calendar and calender
        fullLength = home.cal.fullCalendar.getEvents().length - fullLength;
        calLength = cal.events.length - calLength;

        //If fullLength and calLength are -1 then return passed, otherwise return failed
        if (fullLength == -1 && calLength == -1) return "PASSED";
        else return "FAILED";
    }

    //Test getting a list from local storage. It also checks storing a list
    function calTest23() {
        //Get the current calendar's events
        let current = cal.events;

        //Next, load the events from local storage
        cal.loadEvents();

        //If current and cal.events are the same, return PASSED
        //Otherwise, return FAILED
        if (current.length == cal.events.length) return "PASSED";
        else return "FAILED";
    }

    //Console log all tests with calendar
    console.log("Test #3: Test adding an event with no end date to the calendar " + calTest17());
    console.log("Test #4: Test adding an event with an end date to the calendar " + calTest18());
    console.log("Test #5: Search for all events from calendar " + calTest19());
    console.log("Test #6: Search for a specific event from calendar " + calTest20());
    console.log("Test #7: Delete an event from the calendar with an end date " + calTest21());
    console.log("Test #8: Delete an event from the calendar with no end date " + calTest22());
    console.log("Test #9: Store and Load a list of calendar events " + calTest23());

    //Turn on alerts 
    window.alert = alert;

}
