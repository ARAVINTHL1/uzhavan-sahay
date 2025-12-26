import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // Subtle configuration
        const particleCount = 40; // Much fewer particles for subtlety

        // Soft agricultural colors
        const colors = ['#10b981', '#34d399', '#6ee7b7', '#d1fae5'];

        class Seed {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            color: string;
            opacity: number;
            rotation: number;
            rotationSpeed: number;

            constructor() {
                this.reset();
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            reset() {
                this.x = Math.random() * width;
                this.y = -20;
                this.size = Math.random() * 3 + 2;
                this.speedY = Math.random() * 0.3 + 0.2; // Very slow fall
                this.speedX = (Math.random() - 0.5) * 0.3; // Gentle drift
                this.opacity = Math.random() * 0.4 + 0.3; // Subtle opacity
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;

                // Gentle sway
                this.x += Math.sin(this.y * 0.01) * 0.2;

                // Reset when off screen
                if (this.y > height + 20) {
                    this.reset();
                }
                if (this.x < -20 || this.x > width + 20) {
                    this.x = Math.random() * width;
                }
            }

            draw() {
                if (!ctx) return;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = this.opacity;

                // Draw simple seed shape
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        }

        const seeds: Seed[] = [];
        for (let i = 0; i < particleCount; i++) {
            const seed = new Seed();
            seed.y = Math.random() * height; // Spread initially
            seeds.push(seed);
        }

        const animate = () => {
            if (!ctx) return;

            // Calm gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#064e3b'); // Deep emerald
            gradient.addColorStop(0.5, '#065f46'); // Mid emerald
            gradient.addColorStop(1, '#047857'); // Lighter emerald

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Draw subtle overlay pattern (optional)
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);

            seeds.forEach(seed => {
                seed.update();
                seed.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default AnimatedBackground;
