'use client';

import { useEffect, useRef, useState } from 'react';
import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    Clock,
} from 'three';
import Particles from './Particles';
import InteractiveControls from './InteractiveControls';

interface InteractiveParticlesProps {
    imageSrc: string;
    className?: string;
}

export default function InteractiveParticles({ imageSrc, className = '' }: InteractiveParticlesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<WebGLRenderer | null>(null);
    const sceneRef = useRef<Scene | null>(null);
    const cameraRef = useRef<PerspectiveCamera | null>(null);
    const clockRef = useRef<Clock | null>(null);
    const particlesRef = useRef<Particles | null>(null);
    const interactiveRef = useRef<InteractiveControls | null>(null);
    const rafRef = useRef<number | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        try {
            // Scene
            const scene = new Scene();
            sceneRef.current = scene;

            // Camera
            const camera = new PerspectiveCamera(50, width / height, 1, 10000);
            camera.position.z = 300;
            cameraRef.current = camera;

            // Renderer
            const renderer = new WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            // Clock
            const clock = new Clock(true);
            clockRef.current = clock;

            // Interactive Controls
            const interactive = new InteractiveControls(camera, renderer.domElement);
            interactive.resize();
            interactiveRef.current = interactive;

            // Calculate fovHeight
            const fovHeight = 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z;

            // Particles
            const particles = new Particles(interactive, fovHeight);
            scene.add(particles.container);
            particlesRef.current = particles;

            // Initialize with image
            particles.init(imageSrc);

            // Animation loop
            const animate = () => {
                if (!clockRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

                const delta = clockRef.current.getDelta();

                if (particlesRef.current) {
                    particlesRef.current.update(delta);
                }

                rendererRef.current.render(sceneRef.current, cameraRef.current);
                rafRef.current = requestAnimationFrame(animate);
            };

            animate();
        } catch (error) {
            console.error('Failed to initialize InteractiveParticles:', error);
            setHasError(true);
            return;
        }

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;

            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;

            cameraRef.current.aspect = w / h;
            cameraRef.current.updateProjectionMatrix();

            const newFovHeight = 2 * Math.tan((cameraRef.current.fov * Math.PI) / 180 / 2) * cameraRef.current.position.z;

            rendererRef.current.setSize(w, h);

            if (interactiveRef.current) interactiveRef.current.resize();
            if (particlesRef.current) particlesRef.current.setFovHeight(newFovHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            if (particlesRef.current) {
                particlesRef.current.destroy();
            }

            if (interactiveRef.current) {
                interactiveRef.current.destroy();
            }

            if (rendererRef.current) {
                rendererRef.current.dispose();
                container.removeChild(rendererRef.current.domElement);
            }
        };
    }, [imageSrc]);

    if (hasError) {
        return (
            <div
                className={`w-full h-full ${className} flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent rounded-2xl`}
                style={{ minHeight: '400px' }}
            >
                <div className="text-center text-gray-500">
                    <p className="text-sm">3D effect unavailable</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`w-full h-full ${className}`}
            style={{ minHeight: '400px' }}
        />
    );
}
