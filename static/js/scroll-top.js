scrollTopButton = document.getElementById('scroll-top');
if (window.scrollY !== 0) {
    scrollTopButton.style.display = 'block';
}

window.addEventListener('scroll', setButtonVisibility);
scrollTopButton.addEventListener('click', scrollToTop);

function setButtonVisibility() {
    if (window.scrollY === 0) {
        scrollTopButton.style.display = 'none';
    } else {
        scrollTopButton.style.display = 'block';
    }
}

function scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}