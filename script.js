//hamburgerMenu
/*
const hbgMenu = document.getElementById(`hbgMenu`);
const hbgContents = document.getElementById(`hbgContents`);
hbgMenu.addEventListener(`click`, function() {
    hbgMenu.classList.toggle(`active`);
    hbgContents.classList.toggle(`open`);
    document.body.style.overflow = `hidden`
})
const hbgDisplay = document.getElementById('hbgDisplay');
hbgDisplay.addEventListener('click', function() {
    hbgMenu.classList.remove(`active`);
    hbgContents.classList.remove(`open`);
    document.body.style.overflow = ``
});
*/

function openMenu() {
    hbgMenu.classList.add('active');
    hbgContents.classList.add('open');
    hbgDisplay.classList.add(`open`);
}
function closeMenu() {
    hbgMenu.classList.remove('active');
    hbgContents.classList.remove('open');
    hbgDisplay.classList.remove(`open`);
}
hbgMenu.addEventListener('click', () => {
    hbgContents.classList.contains('open') ? closeMenu() : openMenu();
});
hbgDisplay.addEventListener('click', closeMenu);


const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function changeSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(changeSlide, 4000)

//loading-screen
window.addEventListener("load", function() {
    const loadingScreen = document.getElementById("loadingScreen");
    const hiddenContent = document.getElementById("hiddenContent");

    hiddenContent.classList.remove("hidden");

    this.setTimeout(function() {
        loadingScreen.classList.add("loaded");

        setTimeout(function() {
            loadingScreen.style.display = "none"
        },2500);
    },1500);
});