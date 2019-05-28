'user strict';

var gUsers;

function createUsers() {
    gUsers = [
        createUser('Simon'),
        createUser('Marion'),
        createUser('Raphael'),
        createUser('Louise'),
        createUser('Julien'),
        createUser('Hugo'),
        createUser('Enzo'),
        user = {
            username: 'Admin',
            password: 'easy',
            isAdmin: true,
            lastLoginTime: + new Date()
        }
    ]
}

function createUser(txt) {
    var user = {
        username: txt,
        password: 'pass',
        id: makeId(),
        isAdmin: false,
        lastLoginTime: + new Date()
    }
    return user;
}


function doLogin(username, password) {
    
    var rightUser = gUsers.find(function (user) {
        return (
            (user.username === username) &&
            (user.password === password)
            )
    })

    if (!rightUser) return null;
    else {
        rightUser.lastLoginTime = + new Date();
        return rightUser;
    }
}


function doLogout() {
    localStorage.clear();
}



function saveUsers() {
    saveToStorage();
}

function getUsers() {
    loadFromStorage();
}

