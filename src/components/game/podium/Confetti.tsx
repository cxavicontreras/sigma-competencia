import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = [
    "#FFD700",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#F7DC6F",
    "#BB8FCE",
    "#F1948A",
    "#85C1E9",
];

type Particle = {
    id: number;
    x: number;
    y: number;
    color: string;
    rotation: number;
    scale: number;
};

export function Confetti() {
    const [particles, setParticles] =
        useState<Particle[]>([]);

    useEffect(() => {
        const items: Particle[] = [];
        for (let i = 0; i < 80; i++) {
            items.push({
                id: i,
                x: Math.random() * 100,
                y: -10 - Math.random() * 20,
                color:
                    COLORS[
                        Math.floor(
                            Math.random() *
                                COLORS.length,
                        )
                    ],
                rotation: Math.random() * 720,
                scale:
                    0.5 + Math.random() * 0.8,
            });
        }
        setParticles(items);

        const interval = setInterval(() => {
            setParticles((prev) =>
                prev.map((p) => ({
                    ...p,
                    y: p.y + 1.5,
                    rotation:
                        p.rotation + 3,
                    x:
                        p.x +
                        (Math.random() - 0.5) *
                            0.5,
                })),
            );
        }, 50);

        return () =>
            clearInterval(interval);
    }, []);

    return (
        <div
            className="
                pointer-events-none
                fixed
                inset-0
                z-50
                overflow-hidden
            "
        >
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute h-3 w-3 rounded-sm"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        backgroundColor: p.color,
                        rotate: `${p.rotation}deg`,
                        scale: p.scale,
                    }}
                />
            ))}
        </div>
    );
}
