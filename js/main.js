'use strict';

function init() {
    console.log('Starting up');
    var projects = createProjs();
    renderProj(projects)
    console.log(projects);

}



function renderProj(projects) {
    var strHtmls = '';
    projects.forEach(function (proj) {
        strHtmls += `
        <div class="col-md-4 col-sm-6 portfolio-item" data-proj="${proj.id}" onclick="onOpenModal(this)">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal2">
            <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                    <i class="fa fa-plus fa-3x"></i>
                </div>
            </div>
            <img class="img-fluid" src="${proj.imgThumb}" alt="">
         </a>
            <div class="portfolio-caption">
                <h4>${proj.name}</h4>
                <p class="text-muted">${proj.title}</p>
            </div>
    </div> 
    `

    })
    $('.bg-light .proj-container').html(strHtmls);
}



function onOpenModal(elDiv) {

    var proj = getProjById(elDiv.dataset.proj);
    var modal = document.querySelector('.modal-body');
    debugger
    modal.querySelector('h2').innerText = proj.name;
    modal.querySelector('.item-intro').innerText = proj.title;
    modal.querySelector('img').src = proj.img;
    modal.querySelector('.proj-desc').innerText = proj.desc;
    modal.querySelector('.play-game').href = proj.gameUrl;
}



function onEmailSubmit() {
    var emails = [];
    var userEmail = document.querySelector('.email-input').value;
    emails.push(userEmail);
    document.querySelector('.email-input').value = '';
    var greet = document.querySelector('.greet');
    greet.style.display = 'block';

}