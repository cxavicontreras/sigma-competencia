import { motion } from "framer-motion";

export function AnimatedBackground() {
    return (
        <>
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.45, 0.65, 0.45],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_top,#2563EB30,transparent_60%)]
                "
            />

            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_bottom,#F59E0B25,transparent_70%)]
                "
            />
        </>
    );
}