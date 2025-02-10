export function initModalWindow() {
    const dialog = document.getElementById("fade-dialog");
    const modalContainer = document.getElementById("modal-container");
    const openButtons = document.querySelectorAll(".open-dialog");
    const closeButton = document.getElementById("close-dialog");

    let scrollY = 0; 
    let previousScrollBehavior = ""; 

    openButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            scrollY = window.scrollY; 

            previousScrollBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = "auto";

            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";

            modalContainer.style.display = "flex";
            dialog.showModal();

            setTimeout(() => {
                dialog.style.opacity = "1";
                dialog.style.transform = "scale(1)";
            }, 10);
        });
    });

    closeButton.addEventListener("click", closeDialog);

    modalContainer.addEventListener("click", (event) => {
        const rect = dialog.getBoundingClientRect();
        const isOutside = (
            event.clientY < rect.top || 
            event.clientY > rect.bottom || 
            event.clientX < rect.left || 
            event.clientX > rect.right
        );

        if (isOutside) {
            closeDialog();
        }
    });

    function closeDialog() {
        dialog.style.opacity = "0";
        dialog.style.transform = "scale(0.9)";
        setTimeout(() => {
            dialog.close();
            modalContainer.style.display = "none";

            document.body.style.removeProperty("position");
            document.body.style.removeProperty("top");
            document.body.style.removeProperty("width");

            window.scrollTo(0, scrollY);

            document.documentElement.style.scrollBehavior = previousScrollBehavior;
        }, 500);
    }
}