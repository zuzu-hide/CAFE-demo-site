const hbgMenu = document.getElementById(`hbgMenu`);
const hbgContents = document.getElementById(`hbgContents`);
hbgMenu.addEventListener(`click`, function() {
    hbgMenu.classList.toggle(`active`);
    hbgContents.classList.toggle(`open`);
})
const hgmenuBackground = document