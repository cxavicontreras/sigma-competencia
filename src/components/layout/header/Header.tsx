import { motion } from "framer-motion";

import { ZigmaLogo } from "../../../branding";
import { GlassCard } from "../../ui";


export function Header() {
    return (
        <motion.header
            initial={{
                opacity: 0,
                y: -40,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: .6,
            }}
        >
            <GlassCard
                className="
                    flex
                    h-24
                    items-center
                    justify-between
                    px-8
                "
            >
                <div className="flex items-center gap-5">

                    <ZigmaLogo />

                    <div>

                        <h1 className="text-3xl font-bold tracking-wider">
                            SIGMA 2026
                        </h1>


                        <p className="text-sm text-slate-400">
                            Competencia Matemática
                        </p>

                    </div>



                </div>

            </GlassCard>
        </motion.header>
    );
}