#Introduction

This is a simple project that returns Nigerian states, local government areas and a few other pieces of information about the states.  
The project is live at:
* [https://naijagraphy.herokuapp.com/](https://naijagraphy.herokuapp.com/)

Source code can be found at:
* [https://github.com/Chieze-Franklin/naijagraphy](https://github.com/Chieze-Franklin/naijagraphy)

###This project demonstrates:

* The creation of a Node.js server
* Hosting a Node server on heroku
* Reading contents from a Github repo

###Endpoints:

####https://naijagraphy.herokuapp.com/states

Returns an array of all the states in Nigeria, including the Federal Capital Territory.

####https://naijagraphy.herokuapp.com/states/{state}

Returns an object containing info about a state.  
E.g. https://naijagraphy.herokuapp.com/states/Lagos

####https://naijagraphy.herokuapp.com/states/{state}/{info}

Returns the requested info about the specified state.  
E.g. https://naijagraphy.herokuapp.com/states/Lagos/lgas  
The above will return an array containing all the local government areas in Lagos state.

#naijagraphy-contents

Pieces of information about states (like their LGAs) are not hard-coded into the service, rather they are gotten from the Github repository [naijagraphy-contents](https://github.com/Chieze-Franklin/naijagraphy-contents).  
If there is any piece of information you want to add/change about a state, send a pull request to the naijagraphy-contents repo.