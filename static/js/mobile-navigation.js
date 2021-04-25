let mobileNavIcon = document.querySelector('.mobile-nav-icon');
let navList = document.querySelector('.nav-list');
let navLinks = document.querySelectorAll('.nav-list__item:not(.drop-down)');
mobileNavIcon.addEventListener('click', openMobileMenu);
//navList.addEventListener('click', openMobileMenu);

for (const navLink of navLinks) {
    navLink.addEventListener('click', openMobileMenu);
}

function openMobileMenu() {
    mobileNavIcon.classList.toggle('mobile-nav-icon--open');
    navList.classList.toggle('nav-list--open');
    document.body.classList.toggle('mobile-menu-no-scroll');
}

let dropDownMenus = document.querySelectorAll('.drop-down');
for (const dropDownMenu of dropDownMenus) {
    dropDownMenu.addEventListener('click', openDropDown);
}

function openDropDown(event) {
    let carret = this.querySelector('.fa-caret-down');
    carret.classList.toggle('fa-rotate-180');
    let dropDownMenu = this.querySelector('.drop-down__menu');
    dropDownMenu.classList.toggle('drop-down__menu--closed');
    dropDownMenu.classList.toggle('drop-down__menu--open');
}