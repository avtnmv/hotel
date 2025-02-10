export function initSpeakers() {
    const openButtons = document.querySelectorAll(".open-speaker-info");
    const dialogs = document.querySelectorAll(".fade-dialog");

    let scrollY = 0;

    function openDialog(dialog) {
        if (!dialog.open) {
            scrollY = window.scrollY;

            // Фиксируем скролл
            document.documentElement.style.scrollBehavior = "auto"; 
            document.body.style.overflow = "hidden";
            document.body.style.position = "relative";
            document.body.style.top = `-${scrollY}px`;

            // Открываем модалку
            dialog.style.opacity = "0"; // Сначала делаем прозрачной
            dialog.style.transform = "scale(0.9)"; // Начальное состояние для анимации
            dialog.showModal();

            // Запускаем анимацию после рендера
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

            // Восстанавливаем скролл
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("position");
            document.body.style.removeProperty("top");

            requestAnimationFrame(() => {
                window.scrollTo(0, scrollY);
                document.documentElement.style.scrollBehavior = "";
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

        // Закрытие по клику вне области модального окна
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                closeDialog(dialog);
            }
        });
    });
}