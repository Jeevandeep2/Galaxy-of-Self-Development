// ==========================================
// EMAILJS CONFIGURATION
// ==========================================

// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("N8RL96ZUV-qsAqKt2"); // ← REPLACE THIS with your actual Public Key
})();

// ==========================================
// FORM HANDLING - SEND DIRECTLY TO GMAIL
// ==========================================

function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const btn = e.target.querySelector('.submit-btn');
    
    // Validate
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Loading state
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    // EmailJS parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'jeevandeepk260@gmail.com'
    };
    
    // Send email using EmailJS
    // ← REPLACE 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
    emailjs.send('Galaxy_Jeevandeep', 'template_bg2x7fb', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Success state
            btn.textContent = 'Transmission Sent! ✓';
            btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
            
            showNotification('Message sent successfully!', 'success');
            
            // Reset after delay
            setTimeout(() => {
                btn.textContent = 'Send Transmission →';
                btn.style.background = '';
                btn.disabled = false;
                e.target.reset();
            }, 3000);
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Error state
            btn.textContent = 'Failed - Try Again';
            btn.style.background = 'linear-gradient(135deg, #ff006e, #ff4444)';
            
            showNotification('Failed to send. Please try again.', 'error');
            
            setTimeout(() => {
                btn.textContent = 'Send Transmission →';
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : '✗'}</span>
        <span class="notification-text">${message}</span>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'rgba(0, 255, 136, 0.9)' : 'rgba(255, 0, 110, 0.9)'};
        color: #fff;
        border-radius: 10px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 14px;
        z-index: 100000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: target, offsetY: 0 },
                ease: 'power3.inOut'
            });
        }
    });
});

// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log('%c🌌 Welcome to Galaxy Portfolio 🌌', 
    'color: #00f5ff; font-size: 24px; font-weight: bold;');
console.log('%cDeveloped by Jeevandeep K | 30 Project Challenge', 
    'color: #ff006e; font-size: 14px;');