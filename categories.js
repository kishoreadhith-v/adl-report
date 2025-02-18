document.addEventListener('DOMContentLoaded', () => {
    const bentoItems = document.querySelectorAll('.bento-item');

    bentoItems.forEach(item => {
        item.addEventListener('click', () => {
            const groupId = item.dataset.group;
            window.location.href = `group-links.html?group=${groupId}`;
        });
    });
});
