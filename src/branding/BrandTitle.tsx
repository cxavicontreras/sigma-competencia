import { motion } from "framer-motion";
import { BrandLogo } from "./BrandLogo";
import { BRANDING } from "../config/branding";

export function BrandTitle() {
    return (
        <div className="flex flex-col items-center">

            <BrandLogo />

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
                    max-w-[min(90vw,42rem)]
                    text-center
                    text-4xl
                    font-black
                    tracking-[0.1em]
                    text-transparent
                    bg-linear-to-r
                    from-yellow-100
                    via-amber-300
                    to-yellow-500
                    bg-clip-text
                    sm:text-6xl
                "
            >
                {BRANDING.competitionName}
            </motion.h1>

        </div>
    );
}
