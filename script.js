const hbgMenu = document.getElementById(`hbgMenu`);
const hbgContents = document.getElementById(`hbgContents`);
hbgMenu.addEventListener(`click`, function() {
    hbgMenu.classList.toggle(`active`);
    hbgContents.classList.toggle(`open`);
})
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function changeSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(changeSlide, 4000)