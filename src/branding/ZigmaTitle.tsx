import { motion } from "framer-motion";
import { ZigmaLogo } from "./ZigmaLogo";

export function ZigmaTitle() {
    return (
        <div className="flex flex-col items-center">

            <ZigmaLogo />

            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: .8,
                    duration: .8,
                }}
                className="
                    mt-8
                    text-7xl
                    font-black
                    tracking-[0.18em]
                    text-transparent
                    bg-linear-to-r
                    from-yellow-100
                    via-amber-300
                    to-yellow-500
                    bg-clip-text
                "
            >
                SIGMA
            </motion.h1>

            <motion.h2
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 1.2,
                }}
                className="
                    mt-2
                    text-2xl
                    tracking-[0.6em]
                    text-blue-400
                "
            >
                2026
            </motion.h2>

        </div>
    );
}