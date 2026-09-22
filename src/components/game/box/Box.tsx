import { motion } from "framer-motion";

import type { BoxState } from "../../../types";

type BoxProps = {
    number: number;
    state?: BoxState;
    delay?: number;
    active?: boolean;
    used?: boolean;
    multiplier?: number;
    onSelect?: (box: number) => void;
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
    onSelect,
}: BoxProps) {
    function handleClick() {
        if (used) return;
        onSelect?.(number);
    }

    return (
        <motion.button
            onClick={handleClick}
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
                flex
                h-full
                min-h-0
                items-center
                justify-center
                gap-2
                w-full
                min-w-0
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
                    text-4xl xl:text-5xl 2xl:text-6xl
                    font-extrabold
                    text-slate-100
                    tracking-wider
                "
            >
                {number.toString().padStart(2, "0")}
            </span>
            <span
                className={`
                    text-xl xl:text-2xl 2xl:text-3xl
                    font-bold
                    ${MULTIPLIER_COLORS[multiplier] ?? "text-slate-400"}
                `}
            >
                x{multiplier}
            </span>
        </motion.button>
    );
}