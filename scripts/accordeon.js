export function initAccordeon() {
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
        const content = this.nextElementSibling;
        const isActive = this.classList.contains('active');

        document.querySelectorAll('.accordion-header').forEach(headerElement => headerElement.classList.remove('active'));
        document.querySelectorAll('.accordion-content').forEach(contentElement => contentElement.style.maxHeight = null);

        if (!isActive) {
            this.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
})};