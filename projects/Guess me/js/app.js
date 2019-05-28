'use strict';

var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide();
    renderQuest();
    $('.quest').show();
}

function renderQuest() {
    $('.quest h2').text(gCurrQuest.txt);
}

function onUserResponse(res) {

    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            $('.alert-success').show();
            onRestartGame();
            setTimeout(alertRender, 5000)
        } else {
            alert('I dont know...teach me!')
            $('.quest').hide();
            $('.new-quest').show();
        }
    } else {
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var newGuess = $('#newGuess').val();
    var newQuest = $('#newQuest').val();
    addGuess(newQuest, newGuess, gLastRes);
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    $('.quest').hide();
    createQuestsTree();
    gLastRes = null;

}

function alertRender() {
    $('.alert-success').hide();
}

