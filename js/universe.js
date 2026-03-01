// ==========================================
// THREE.JS REALISTIC UNIVERSE BACKGROUND
// ==========================================

class UniverseBackground {
    constructor() {
        this.canvas = document.getElementById('universe-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            alpha: true, 
            antialias: true 
        });
        
        this.clock = new THREE.Clock();
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        this.init();
    }
    
    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x050508, 1);
        
        // Add fog for depth
        this.scene.fog = new THREE.FogExp2(0x050508, 0.02);
        
        // Create galaxy
        this.createGalaxy();
        
        // Create nebula
        this.createNebula();
        
        // Create floating shapes
        this.createFloatingShapes();
        
        // Setup camera
        this.camera.position.z = 30;
        this.camera.position.y = 5;
        
        // Add event listeners
        this.addEventListeners();
        
        // Start animation
        this.animate();
    }
    
    createGalaxy() {
        const parameters = {
            count: 8000,
            size: 0.05,
            radius: 80,
            branches: 5,
            spin: 1,
            randomness: 0.2,
            randomnessPower: 3,
            insideColor: '#ff006e',
            outsideColor: '#00f5ff'
        };
        
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);
        const scales = new Float32Array(parameters.count);
        
        const insideColor = new THREE.Color(parameters.insideColor);
        const outsideColor = new THREE.Color(parameters.outsideColor);
        
        for(let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;
            
            const radius = Math.random() * parameters.radius;
            const spinAngle = radius * parameters.spin;
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;
            
            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * 
                           (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * 
                           (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * 
                           (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            
            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
            
            const mixedColor = insideColor.clone();
            mixedColor.lerp(outsideColor, radius / parameters.radius);
            
            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
            
            scales[i] = Math.random();
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        
        const material = new THREE.PointsMaterial({
            size: parameters.size,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        this.galaxy = new THREE.Points(geometry, material);
        this.scene.add(this.galaxy);
    }
    
    createNebula() {
        const geometry = new THREE.BufferGeometry();
        const count = 200;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        
        for(let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 50;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;
            
            const color = new THREE.Color();
            color.setHSL(Math.random(), 0.8, 0.5);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        this.nebula = new THREE.Points(geometry, material);
        this.scene.add(this.nebula);
    }
    
    createFloatingShapes() {
        this.shapesGroup = new THREE.Group();
        
        const geometries = [
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(1, 0),
            new THREE.TetrahedronGeometry(1, 0),
            new THREE.DodecahedronGeometry(1, 0)
        ];
        
        const colors = [0x00f5ff, 0xff006e, 0x8338ec, 0xfb5607, 0xffbe0b];
        
        for(let i = 0; i < 20; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                wireframe: true,
                transparent: true,
                opacity: 0.2
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 80
            );
            mesh.scale.setScalar(Math.random() * 2 + 0.5);
            
            mesh.userData = {
                rotSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: 0.5 + Math.random() * 0.5,
                floatOffset: Math.random() * Math.PI * 2
            };
            
            this.shapesGroup.add(mesh);
        }
        
        this.scene.add(this.shapesGroup);
    }
    
    addEventListeners() {
        // Mouse movement for camera
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Resize handler
        window.addEventListener('resize', () => this.onResize());
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const elapsedTime = this.clock.getElapsedTime();
        
        // Rotate galaxy
        if (this.galaxy) {
            this.galaxy.rotation.y = elapsedTime * 0.05;
        }
        
        // Rotate nebula
        if (this.nebula) {
            this.nebula.rotation.y = elapsedTime * 0.02;
            this.nebula.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;
        }
        
        // Animate floating shapes
        if (this.shapesGroup) {
            this.shapesGroup.children.forEach((shape) => {
                shape.rotation.x += shape.userData.rotSpeed.x;
                shape.rotation.y += shape.userData.rotSpeed.y;
                shape.rotation.z += shape.userData.rotSpeed.z;
                
                shape.position.y += Math.sin(
                    elapsedTime * shape.userData.floatSpeed + 
                    shape.userData.floatOffset
                ) * 0.02;
            });
        }
        
        // Smooth camera movement
        this.targetX += (this.mouseX / window.innerWidth - 0.5) * 2 - this.targetX * 0.05;
        this.targetY += (this.mouseY / window.innerHeight - 0.5) * 2 - this.targetY * 0.05;
        
        this.camera.position.x += (this.targetX * 5 - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.targetY * 5 + 5 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);
        
        // Render
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize universe when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.universe = new UniverseBackground();
});