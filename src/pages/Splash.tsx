import { motion } from "framer-motion";

import { AnimatedBackground } from "../components/common/AnimatedBackground";
import { ZigmaTitle } from "../branding";
import { LoadingDots } from "../components/common/LoadingDots";
import { MathBackground } from "../components/common/MathBackground";
import { ParticleField } from "../components/common/ParticleField";


export function Splash() {
    return (
        <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#020617]">

            <AnimatedBackground />

            <MathBackground />

            <ParticleField />

            <motion.div
                initial={{
                    opacity: 0,
                    scale: .9,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 1,
                }}
                className="z-20 flex flex-col items-center text-center"
            >

                <ZigmaTitle />

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 260 }}
                    transition={{
                        delay: .9,
                        duration: .7,
                    }}
                    className="
                        mt-8
                        h-0.5
                        rounded-full
                        bg-linear-to-r
                        from-transparent
                        via-amber-400
                        to-transparent
                    "
                />

                <motion.p
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
                        mt-8
                        text-lg
                        tracking-wide
                        text-slate-300
                    "
                >
                    Competencia Matemática
                </motion.p>

                <LoadingDots />

            </motion.div>

        </main>
    );
}