document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-link-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log('Form submitted with data:', Object.fromEntries(formData));
        alert('Link added successfully!');
        form.reset();
    });
});
