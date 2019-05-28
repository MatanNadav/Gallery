'use strict';

function onAdminInit() {
    onInit()
    console.log(gUsers);
    renderTable(gUsers, '.user-list');
    var user = loadFromStorage('logInUser');
    if (!user || !user.isAdmin) window.location = 'index.html';
}


function renderTable(users, selector) {
    var strHtmls = '';
    users.forEach(function (user) {
        strHtmls += `<tr>
        <td>${user.username}</td>
        <td>${user.password}</td>
    <td>${getTime(user.lastLoginTime)}</td></tr>`
    })
    document.querySelector(selector).innerHTML = strHtmls;

    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHtmls;
}


function onSetSort(txt) {
    setSorter(txt);
    renderTable(gUsers, '.user-list');
}


