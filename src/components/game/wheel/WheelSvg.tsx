import { motion } from "framer-motion";

export function WheelSvg() {

    return (

        <motion.svg
            viewBox="0 0 240 240"
            className="h-60 w-60 drop-shadow-2xl"
        >

            <defs>

                <radialGradient
                    id="wheelGradient"
                    cx="50%"
                    cy="40%"
                >

                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="55%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />

                </radialGradient>

            </defs>

            <circle
                cx="120"
                cy="120"
                r="108"
                fill="url(#wheelGradient)"
                stroke="#fde68a"
                strokeWidth="5"
            />

            <circle
                cx="120"
                cy="120"
                r="92"
                fill="none"
                stroke="rgba(255,255,255,.15)"
                strokeWidth="2"
            />

            {Array.from({ length: 12 }).map((_, index) => {

                const angle = index * 30;

                return (
                    <line
                        key={index}
                        x1="120"
                        y1="34"
                        x2="120"
                        y2="50"
                        stroke="rgba(255,255,255,.20)"
                        strokeWidth="2"
                        transform={`rotate(${angle} 120 120)`}
                    />
                );

            })}

            <circle
                cx="120"
                cy="120"
                r="24"
                fill="#0f172a"
                stroke="#fbbf24"
                strokeWidth="5"
            />

            <circle
                cx="120"
                cy="120"
                r="8"
                fill="#fde68a"
            />

        </motion.svg>

    );

}