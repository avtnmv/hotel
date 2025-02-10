export function initModalWindow() {
    const dialog = document.getElementById("fade-dialog");
    const modalContainer = document.getElementById("modal-container");
    const openButtons = document.querySelectorAll(".open-dialog");
    const closeButton = document.getElementById("close-dialog");

    openButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
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
        }, 500);
    }
}
