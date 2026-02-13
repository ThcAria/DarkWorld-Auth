// Typing Effect
const text = "Hi, Hello World";
const typingElement = document.getElementById("typingTitle");
const subtitle = document.getElementById("subtitleText");
let index = 0;

function typeLetter(){
    if(index < text.length){
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeLetter, 50);
    }
}
setTimeout(typeLetter, 500);

// Neon glow movement
const leftSection = document.querySelector(".left");
const glow = document.getElementById("cursorGlow");

leftSection.addEventListener("mouseenter", () => {
    glow.style.opacity = 1;
});

leftSection.addEventListener("mouseleave", () => {
    glow.style.opacity = 0;
});

leftSection.addEventListener("mousemove", (e) => {
    const rect = leftSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    glow.style.left = x + "px";
    glow.style.top = y + "px";

    const distX = Math.abs(x - centerX) / centerX;
    const distY = Math.abs(y - centerY) / centerY;
    const scale = 1 + (distX + distY) / 6;
    glow.style.transform = `translate(-50%, -50%) scale(${scale})`;
});

// Form Toggle Logic - Professional Version
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const footerText = document.getElementById('footerText');
const switchToRegister = document.getElementById('switchToRegister');
const toggleSlider = document.getElementById('toggleSlider');

// Function to show login form with animations
function showLoginForm(e) {
    if (e) e.preventDefault();
    
    // Update forms with animation
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    
    // Update toggle buttons
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
    
    // Move slider
    toggleSlider.classList.remove('register-active');
    
    // Update footer
    footerText.innerHTML = `Don't have an account? <a href="#" id="switchToRegister">Sign up</a>`;
    document.getElementById('switchToRegister').addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterForm(e);
    });
}

// Function to show register form with animations
function showRegisterForm(e) {
    if (e) e.preventDefault();
    
    // Update forms with animation
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    
    // Update toggle buttons
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
    
    // Move slider
    toggleSlider.classList.add('register-active');
    
    // Update footer
    footerText.innerHTML = `Already have an account? <a href="#" id="switchToLogin">Sign in</a>`;
    document.getElementById('switchToLogin').addEventListener('click', function(e) {
        e.preventDefault();
        showLoginForm(e);
    });
}

// Event listeners for toggle buttons
loginToggle.addEventListener('click', showLoginForm);
registerToggle.addEventListener('click', showRegisterForm);

// Initial footer link
switchToRegister.addEventListener('click', function(e) {
    e.preventDefault();
    showRegisterForm(e);
});

// Register Validation
function handleRegister() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('registerError');

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        errorElement.textContent = 'All fields are required';
        return;
    }

    if (password.length < 8) {
        errorElement.textContent = 'Password must be at least 8 characters';
        return;
    }

    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = 'Please enter a valid email';
        return;
    }

    errorElement.textContent = '';
    alert('Registration successful!\n\nFirst Name: ' + firstName + '\nLast Name: ' + lastName + '\nEmail: ' + email);
}

// Login Handler
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    alert('Login attempt with:\nEmail: ' + email);
}

// Add ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;
        
        let ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transition = 'width 0.6s, height 0.6s, opacity 0.6s';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.width = '200px';
            ripple.style.height = '200px';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});