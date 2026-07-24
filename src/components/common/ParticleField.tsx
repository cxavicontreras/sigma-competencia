import { motion } from "framer-motion";

const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 5 + 4,
}));

export function ParticleField() {
    return (
        <>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    animate={{
                        y: [-10, 10, -10],
                        opacity: [0.15, 0.5, 0.15],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute rounded-full bg-gradient-to-r from-blue-400 to-amber-300"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                />
            ))}
        </>
    );
}