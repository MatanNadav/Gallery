'use strict';
var gSortBy = 'Sorting by...'



function getUsersSorted() {
    if (gSortBy === 'Sorting by...') return gTodos;
    else if (gSortBy === 'Name') {
        return (
            gUsers.sort(function (txtA, txtB) {
                return txtA.username.localeCompare(txtB.username);
            })
        )
    } else if (gSortBy === 'Last login') {
        return (gUsers.sort(function (timeA, timeB) {
            return timeB.lastLoginTime - timeA.lastLoginTime;
        })
        )
    } 
}



function setSorter(txt) {
    gSortBy = txt;
    getUsersSorted();
}