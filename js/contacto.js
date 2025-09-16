document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const successMessage = document.getElementById('success-message');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Always prevent default submission for custom handling
        let isValid = true;

        // Reset previous errors
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.style.display = 'none';
            msg.textContent = '';
        });
        const errorFields = contactForm.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));

        // Check name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            isValid = false;
            showError(name, 'Este campo es obligatorio');
        }

        // Check email
        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            isValid = false;
            showError(email, 'Este campo es obligatorio');
        }

        // Check message
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            isValid = false;
            showError(message, 'Este campo es obligatorio');
        }

        if (isValid) {
            // Show success message
            successMessage.classList.add('show');
            
            // Reset form
            contactForm.reset();

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
        }
    });

    function showError(inputElement, message) {
        inputElement.classList.add('error');
        const errorMessage = inputElement.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
    }
});