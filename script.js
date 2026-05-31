// DOM Elements
const passwordLengthSlider = document.getElementById('passwordLength');
const passwordLengthNumber = document.getElementById('passwordLengthNumber');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const specialCheckbox = document.getElementById('special');
const generateBtn = document.getElementById('generateBtn');
const passwordDisplay = document.getElementById('passwordDisplay');
const copyBtn = document.getElementById('copyBtn');
const passwordSection = document.getElementById('passwordSection');
const strengthSection = document.getElementById('strengthSection');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL = '!@#$%&*()-_=+';

// Sync slider and number input
passwordLengthSlider.addEventListener('input', (e) => {
    passwordLengthNumber.value = e.target.value;
    validatePasswordLength();
});

passwordLengthNumber.addEventListener('input', (e) => {
    let value = parseInt(e.target.value);
    
    if (isNaN(value)) {
        e.target.value = '';
        return;
    }
    
    if (value < 8) {
        value = 8;
    } else if (value > 32) {
        value = 32;
    }
    
    e.target.value = value;
    passwordLengthSlider.value = value;
    validatePasswordLength();
});

// Validate password length
function validatePasswordLength() {
    const length = parseInt(passwordLengthNumber.value);
    
    if (length < 8) {
        errorMessage.textContent = 'O tamanho mínimo é 8 caracteres';
        generateBtn.disabled = true;
    } else {
        errorMessage.textContent = '';
        generateBtn.disabled = false;
    }
}

// Ensure at least one checkbox is checked
[uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, specialCheckbox].forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const anyChecked = [uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, specialCheckbox].some(cb => cb.checked);
        if (!anyChecked) {
            checkbox.checked = true;
        }
    });
});

// Generate password
generateBtn.addEventListener('click', generatePassword);

function generatePassword() {
    const length = parseInt(passwordLengthNumber.value);
    
    // Validate minimum length
    if (length < 8) {
        errorMessage.textContent = 'O tamanho mínimo é 8 caracteres';
        return;
    }
    
    // Build character pool
    let characterPool = '';
    const mustInclude = [];
    
    if (uppercaseCheckbox.checked) {
        characterPool += UPPERCASE;
        mustInclude.push(UPPERCASE);
    }
    if (lowercaseCheckbox.checked) {
        characterPool += LOWERCASE;
        mustInclude.push(LOWERCASE);
    }
    if (numbersCheckbox.checked) {
        characterPool += NUMBERS;
        mustInclude.push(NUMBERS);
    }
    if (specialCheckbox.checked) {
        characterPool += SPECIAL;
        mustInclude.push(SPECIAL);
    }
    
    // Ensure at least one character from each selected type
    let password = '';
    
    for (let charSet of mustInclude) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    
    // Fill the rest with random characters
    for (let i = password.length; i < length; i++) {
        password += characterPool.charAt(Math.floor(Math.random() * characterPool.length));
    }
    
    // Shuffle the password
    password = shuffleString(password);
    
    // Display password
    displayPassword(password);
}

// Shuffle string using Fisher-Yates algorithm
function shuffleString(str) {
    const arr = str.split('');
    
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    
    return arr.join('');
}

// Display password and show sections
function displayPassword(password) {
    passwordDisplay.textContent = password;
    passwordSection.style.display = 'block';
    strengthSection.style.display = 'block';
    
    // Update strength indicator
    updatePasswordStrength(password);
    
    // Hide success message
    successMessage.style.display = 'none';
    
    // Focus on password display for accessibility
    passwordDisplay.focus();
}

// Calculate password strength
function updatePasswordStrength(password) {
    let strength = 0;
    const length = password.length;
    
    // Length score
    if (length >= 8) strength += 20;
    if (length >= 12) strength += 15;
    if (length >= 16) strength += 15;
    
    // Character variety score
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[!@#$%&*()_\-=+]/.test(password)) strength += 10;
    
    // Cap at 100
    strength = Math.min(strength, 100);
    
    // Update strength bar
    strengthFill.style.width = strength + '%';
    
    // Update strength text and color
    let strengthLabel = '';
    if (strength < 30) {
        strengthLabel = 'Fraca';
        strengthFill.style.background = 'linear-gradient(90deg, #e74c3c, #e74c3c)';
    } else if (strength < 60) {
        strengthLabel = 'Média';
        strengthFill.style.background = 'linear-gradient(90deg, #f39c12, #f39c12)';
    } else if (strength < 85) {
        strengthLabel = 'Forte';
        strengthFill.style.background = 'linear-gradient(90deg, #f39c12, #27ae60)';
    } else {
        strengthLabel = 'Muito Forte';
        strengthFill.style.background = 'linear-gradient(90deg, #27ae60, #27ae60)';
    }
    
    strengthText.textContent = `Força da senha: ${strengthLabel}`;
}

// Copy to clipboard
copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.textContent;
    
    navigator.clipboard.writeText(password).then(() => {
        successMessage.style.display = 'block';
        
        // Hide message after 2 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 2000);
    });
});

// Initial validation
validatePasswordLength();
