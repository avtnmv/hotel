export function initSpeakers() {
    const openButtons = document.querySelectorAll(".open-speaker-info");
    const dialogs = document.querySelectorAll(".fade-dialog");

    let scrollY = 0; 

    function openDialog(dialog) {
        if (!dialog.open) {
            scrollY = window.scrollY; 

            document.body.style.position = "fixed";
            document.body.style.width = "100%";
            document.body.style.top = `-${scrollY}px`;

            dialog.style.opacity = "0";
            dialog.style.transform = "scale(0.9)";
            dialog.showModal();

            setTimeout(() => {
                dialog.style.opacity = "1";
                dialog.style.transform = "scale(1)";
            }, 10);
        }
    }

    function closeDialog(dialog) {
        dialog.style.opacity = "0";
        dialog.style.transform = "scale(0.9)";
    
        setTimeout(() => {
            dialog.close();
    
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("position");
            document.body.style.removeProperty("top");
            document.body.style.overflow = "auto"; 
    
            document.documentElement.style.scrollBehavior = "auto";
    
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollY); 
                requestAnimationFrame(() => {
                    document.documentElement.style.scrollBehavior = "smooth";
                });
            });
        }, 500);
    }

    openButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const dialogId = button.getAttribute("data-dialog");
            const dialog = document.getElementById(dialogId);
            openDialog(dialog);
        });
    });

    dialogs.forEach((dialog) => {
        const closeButton = dialog.querySelector(".close-dialog");
        closeButton.addEventListener("click", () => {
            closeDialog(dialog);
        });

        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                closeDialog(dialog);
            }
        });
    });
}