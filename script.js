document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const form = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default browser form submission

        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (result.success) {
                statusMessage.textContent = 'Message sent successfully!';
                statusMessage.className = 'message-status message-success';
                statusMessage.style.display = 'block';
                form.reset(); // Clear the form fields
            } else {
                statusMessage.textContent = 'Error: Something went wrong.';
                statusMessage.className = 'message-status message-error';
                statusMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Submission error:', error);
            statusMessage.textContent = 'An unexpected error occurred. Please try again.';
            statusMessage.className = 'message-status message-error';
            statusMessage.style.display = 'block';
        } finally {
            // Optionally hide the message after a delay
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 5000);
        }
    });

});