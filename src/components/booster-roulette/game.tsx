/* eslint-disable @next/next/no-img-element */
"use client";

import "@/app/styles/booster-roulette.css";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Game() {
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentRotation, setCurrentRotation] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const lastMouseX = useRef(0);
    const animationFrame = useRef<number>(0);

    useEffect(() => {
        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, []);

    const updateRotation = useCallback(() => {
        if (!isDragging && Math.abs(velocity) > 0.1) {
            setRotation(prev => prev + velocity);
            setVelocity(prev => prev * 0.5); // Facteur de ralentissement
            animationFrame.current = requestAnimationFrame(updateRotation);
        }
    }, [isDragging, velocity]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setCurrentRotation(rotation);
        lastMouseX.current = e.clientX;
        setVelocity(0);
        if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const sensitivity = 0.5;
        const newRotation = currentRotation + (deltaX * sensitivity);
        setRotation(newRotation);

        // Calcul de la vélocité
        const instantVelocity = (e.clientX - lastMouseX.current) * sensitivity;
        setVelocity(instantVelocity);
        lastMouseX.current = e.clientX;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        updateRotation();
    };

    return (
        <>
            <div className="text-center mx-auto max-w-7xl p-8">
                <div className="absolute top-0 left-0 w-full h-[25vh] bg-[#e0eaf5] [clip-path:polygon(0_0,100%_0,100%_80%,0%_100%)]" />
                <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-[#dde7f3] [clip-path:polygon(0_20%,100%_0,100%_100%,0%_100%)]" />

                <div className='content-cards'>
                    <div className='relative top-0 left-0 z-[1]'>
                        <img
                            src="/game-mask.webp"
                            alt=""
                            className="relative block w-full m-0"
                        />
                    </div>
                    <div className="content-roulette">
                        <div className="inner">
                            <div
                                className="banner"
                                style={{ transform: `rotateY(${rotation}deg)` }}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                            >
                                {[...Array(15)].map((e, i) => (
                                    <div className="panel" key={i}>
                                        <div className="booster-container">
                                            <img
                                                src="/booster-mask.webp"
                                                alt=""
                                                className="invisible relative block w-full m-0"
                                            />
                                            <div className="booster">
                                                <div className="booster-face front"></div>
                                                <div className="booster-face back"></div>
                                                <div className="booster-face right"></div>
                                                <div className="booster-face left"></div>
                                                <div className="booster-face top"></div>
                                                <div className="booster-face bottom"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
