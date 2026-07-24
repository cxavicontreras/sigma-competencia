import { motion } from "framer-motion";

import type { BoxState } from "../../../types";

type BoxProps = {
    number: number;
    state?: BoxState;
    delay?: number;
    active?: boolean;
    used?: boolean;
    multiplier?: number;
};

const MULTIPLIER_COLORS: Record<number, string> = {
    1: "text-slate-400",
    2: "text-cyan-400",
    3: "text-amber-400",
};

export function Box({
    number,
    active,
    delay = 0,
    used,
    multiplier = 1,
}: BoxProps) {
    return (
        <motion.button
            initial={{
                opacity: 0,
                scale: 0.7,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            whileHover={{
                scale: 1.05,
                y: -4,
                rotateX: 8,
            }}
            whileTap={{
                scale: .95,
            }}
            transition={{
                duration: .35,
                delay,
            }}
            style={{
                transformStyle: "preserve-3d",
            }}
            className={`
                aspect-square
                w-full
                max-w-15
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-br
                from-slate-800
                via-slate-900
                to-slate-950
                shadow-xl
                transition-all
                duration-300
                hover:border-amber-400
                hover:shadow-[0_0_40px_rgba(245,158,11,.45)]

                ${
    used
        ? `
            bg-slate-950
            border-slate-700
            opacity-40
            grayscale
          `
        : active
            ? `
                border-amber-400
                ring-4
                ring-amber-400
                scale-105
              `
            : `
                border-white/10
              `
}
            `}
        >
            <span
                className="
                    text-4xl
                    font-extrabold
                    text-slate-100
                    tracking-wider
                "
            >
                {number.toString().padStart(2, "0")}
            </span>
            <span
                className={`
                    text-xs
                    font-bold
                    ${MULTIPLIER_COLORS[multiplier] ?? "text-slate-400"}
                `}
            >
                x{multiplier}
            </span>
        </motion.button>
    );
}