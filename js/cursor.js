// ==========================================
// MAGNETIC CUSTOM CURSOR SYSTEM
// ==========================================

class MagneticCursor {
    constructor() {
        this.cursorDot = document.querySelector('.cursor-dot');
        this.cursorCircle = document.querySelector('.cursor-circle');
        this.cursorTrail = document.querySelector('.cursor-trail');
        this.cursorGlow = document.querySelector('.cursor-glow');
        this.cursorText = document.querySelector('.cursor-text');
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.circleX = 0;
        this.circleY = 0;
        this.trailX = 0;
        this.trailY = 0;
        this.glowX = 0;
        this.glowY = 0;
        
        this.isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        
        this.init();
    }
    
    init() {
        if (this.isTouchDevice) {
            document.body.style.cursor = 'auto';
            return;
        }
        
        this.addEventListeners();
        this.animate();
    }
    
    addEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Instant dot movement
            this.cursorDot.style.left = `${this.mouseX}px`;
            this.cursorDot.style.top = `${this.mouseY}px`;
        });
        
        // Magnetic effect for interactive elements
        document.querySelectorAll('.magnetic').forEach(elem => {
            elem.addEventListener('mouseenter', () => this.onMouseEnter(elem));
            elem.addEventListener('mouseleave', () => this.onMouseLeave(elem));
            elem.addEventListener('mousemove', (e) => this.onMouseMove(e, elem));
        });
        
        // Hover states for all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.setHoverState(true, el));
            el.addEventListener('mouseleave', () => this.setHoverState(false, el));
        });
    }
    
    onMouseEnter(element) {
        document.body.classList.add('cursor-hover');
        
        // Set cursor text based on element type
        let text = 'View';
        if (element.tagName === 'A') {
            text = element.getAttribute('href')?.startsWith('#') ? 'Navigate' : 'Visit';
        } else if (element.tagName === 'BUTTON') {
            text = 'Click';
        } else if (element.classList.contains('project-card')) {
            text = 'Explore';
        }
        this.cursorText.textContent = text;
    }
    
    onMouseLeave(element) {
        document.body.classList.remove('cursor-hover');
        element.style.transform = 'translate(0, 0)';
    }
    
    onMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Magnetic pull effect
        const magnetStrength = 0.3;
        element.style.transform = `translate(${x * magnetStrength}px, ${y * magnetStrength}px)`;
    }
    
    setHoverState(isHovering, element) {
        if (isHovering) {
            document.body.classList.add('cursor-hover');
        } else {
            document.body.classList.remove('cursor-hover');
        }
    }
    
    animate() {
        // Smooth follow with different delays for each layer
        
        // Circle follows with slight delay
        this.circleX += (this.mouseX - this.circleX) * 0.15;
        this.circleY += (this.mouseY - this.circleY) * 0.15;
        this.cursorCircle.style.left = `${this.circleX}px`;
        this.cursorCircle.style.top = `${this.circleY}px`;
        
        // Trail follows with more delay
        this.trailX += (this.mouseX - this.trailX) * 0.08;
        this.trailY += (this.mouseY - this.trailY) * 0.08;
        this.cursorTrail.style.left = `${this.trailX}px`;
        this.cursorTrail.style.top = `${this.trailY}px`;
        
        // Glow follows with most delay
        this.glowX += (this.mouseX - this.glowX) * 0.05;
        this.glowY += (this.mouseY - this.glowY) * 0.05;
        this.cursorGlow.style.left = `${this.glowX}px`;
        this.cursorGlow.style.top = `${this.glowY}px`;
        
        // Text follows cursor
        this.cursorText.style.left = `${this.mouseX}px`;
        this.cursorText.style.top = `${this.mouseY - 40}px`;
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.magneticCursor = new MagneticCursor();
});