// ==========================================
// GSAP ANIMATIONS & SCROLL EFFECTS
// ==========================================

class AnimationsController {
    constructor() {
        this.init();
    }
    
    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        
        // Initialize all animations
        this.initLoader();
        this.initProgressBar();
        this.initHeroAnimations();
        this.initScrollAnimations();
        this.initParallaxEffects();
    }
    
    initLoader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.classList.add('hidden');
                this.playEntranceAnimations();
            }, 2000);
        });
    }
    
    playEntranceAnimations() {
        const tl = gsap.timeline();
        
        tl.from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.9')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.hero-cta', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.scroll-indicator', {
            opacity: 0,
            duration: 1
        }, '-=0.5');
    }
    
    initProgressBar() {
        gsap.to('.nav-progress', {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
        });
    }
    
    initHeroAnimations() {
        // Floating planets parallax
        gsap.to('.planet-1', {
            y: -100,
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
        
        gsap.to('.planet-2', {
            y: -50,
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
        
        gsap.to('.planet-3', {
            y: -150,
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
    
    initScrollAnimations() {
        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
        
        // About section
        gsap.from('.profile-container', {
            scale: 0,
            rotation: -180,
            duration: 1.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        gsap.from('.about-content > *', {
            opacity: 0,
            x: 30,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Contact section
        gsap.from('.contact-link', {
            opacity: 0,
            x: -30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-links',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
        
        gsap.from('.form-group', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }
    
    initParallaxEffects() {
        // Add parallax to various elements
        gsap.utils.toArray('.floating-object').forEach((obj, i) => {
            gsap.to(obj, {
                y: -50 * (i + 1),
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }
    
    // Build projects grid with animations
    buildProjectsGrid() {
        const grid = document.getElementById('galaxyGrid');
        
        projectsData.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-number">${project.num}</div>
                <div class="project-icon">${project.icon}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.desc}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            `;
            
            grid.appendChild(card);
            
            // Animate on scroll
            gsap.from(card, {
                opacity: 0,
                y: 50,
                scale: 0.9,
                duration: 0.8,
                delay: index * 0.05,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
    
    // Build skills constellation
    buildSkillsConstellation() {
        const svg = document.getElementById('constellationSvg');
        let svgContent = '';
        
        // Draw connections
        skillsData.forEach((skill, i) => {
            skillsData.forEach((other, j) => {
                if (i < j) {
                    const dist = Math.sqrt(
                        Math.pow(skill.x - other.x, 2) + 
                        Math.pow(skill.y - other.y, 2)
                    );
                    if (dist < 400) {
                        const opacity = 0.1 + (1 - dist / 400) * 0.3;
                        svgContent += `
                            <line class="constellation-line" 
                                  x1="${skill.x}" y1="${skill.y}" 
                                  x2="${other.x}" y2="${other.y}" 
                                  opacity="${opacity}"/>
                        `;
                    }
                }
            });
        });
        
        // Draw nodes
        skillsData.forEach((skill, i) => {
            svgContent += `
                <g class="skill-node" transform="translate(${skill.x}, ${skill.y})" data-skill="${skill.name}">
                    <circle class="skill-circle" r="45"/>
                    <text class="skill-text" dy="-2">${skill.icon}</text>
                    <text class="skill-label" dy="30">${skill.name}</text>
                </g>
            `;
        });
        
        svg.innerHTML = svgContent;
        
        // Animate skills
        gsap.utils.toArray('.skill-node').forEach((node, i) => {
            gsap.from(node, {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.skills-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animations = new AnimationsController();
    window.animations.buildProjectsGrid();
    window.animations.buildSkillsConstellation();
});