export function initBurgerMenu() {
    const burgerMenu = document.getElementById("burger-menu");
    const burgerIcon = document.getElementById("burger-icon");
    const burgerLinks = document.querySelectorAll('.burger-menu a');

    if (!burgerMenu || !burgerIcon || burgerLinks.length === 0) {
        console.warn("Burger menu elements not found!");
        return;
    }
    

    const toggleMenu = () => {
        const show = !burgerMenu.classList.contains('show');
        burgerMenu.classList.toggle('show', show);
        burgerIcon.classList.toggle('active', show);
        document.body.classList.toggle('no-scroll', show);

        const logoColor = document.querySelector('.logo-color');
        if (logoColor) {
            logoColor.classList.toggle('active', show);
        }
    };

    burgerIcon.addEventListener('click', toggleMenu);
    burgerLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));
}