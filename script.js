//slideshows
const slides = document.querySelectorAll('.slide');
if (slides.length > 0) {
    let currentSlide = 0;
    
    function changeSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    setInterval(changeSlide, 4000);
}


//loading-screen
window.addEventListener("load", function() {
    const loadingScreen = document.getElementById("loadingScreen");
    const hiddenContent = document.getElementById("hiddenContent");

    if (!hiddenContent || !loadingScreen) return; 
        hiddenContent.classList.remove("hidden");

    this.setTimeout(function() {
        loadingScreen.classList.add("loaded");

        setTimeout(function() {
            loadingScreen.style.display = "none"
        },2500);
    },1500);
});


const hbgMenu = document.getElementById(`hbgMenu`);
const hbgContents = document.getElementById(`hbgContents`);
const display = document.getElementById('hbgDisplay');
const submenuModal = document.getElementById("submenuModal");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const closeBtn = document.getElementById("closeBtn");
const addToCartBtn = document.getElementById('addToCartBtn');

//hbgMenu
function openMenu() {
    hbgMenu.classList.add('active');
    hbgContents.classList.add('open');
    hbgDisplay.classList.add(`open`);
}
function closeMenu() {
    hbgMenu.classList.remove('active');
    hbgContents.classList.remove('open');
    hbgDisplay.classList.remove(`open`);
    checkModal.classList.remove("open");
}
if (hbgMenu) {
    hbgMenu.addEventListener('click', () => {
        hbgContents.classList.contains('open') ? closeMenu() : openMenu();
    });
};
if  (display) {
    display.addEventListener('click', () => {
        closeMenu();
        closeModal();
    });
}

//modal開閉
let currentProduct = null;
function openModal(name, nameEn, price) {
    if (!submenuModal) return;

    currentProduct = { name: name, nameEn: nameEn || name, price: Number(price) };
    modalName.textContent = `「${name}」をカートに入れますか？`
    modalPrice.textContent = `₱${price}`;

    submenuModal.classList.add('open');
    display.classList.add('open');
}
function closeModal() {
    if (!submenuModal) return;

    submenuModal.classList.remove('open');
    if (!hbgContents.classList.contains('open')) {
        display.classList.remove('open');
    }
}

//submenu-main-modal
const cartAdd = document.querySelectorAll(".cart-add-button");
cartAdd.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const item = e.currentTarget;
        const name = item.dataset.name;
        const nameEn = item.dataset.nameEn || name;
        const price = item.dataset.price;

        if (name && price) {
            openModal(name, nameEn, price);
        }
    });
});
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}



if (addToCartBtn && window.cart) {
    addToCartBtn.addEventListener('click', () => {
        if (!currentProduct) return;

        window.cart.addItem({
            name: currentProduct.name,
            nameEn: currentProduct.nameEn,
            price: Number(currentProduct.price),
        });

        closeModal();
        currentProduct = null;
    });
    

}