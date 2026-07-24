import { motion } from "framer-motion";

const symbols = [
    "π",
    "Σ",
    "√",
    "∞",
    "Δ",
    "∫",
    "lim",
    "x²",
    "y²",
    "f(x)",
    "θ",
    "α",
];

export function MathBackground() {
    return (
        <>
            {symbols.map((symbol, index) => (
                <motion.span
                    key={index}
                    animate={{
                        y: [-15, 15, -15],
                        opacity: [0.02, 0.06, 0.02],
                    }}
                    transition={{
                        duration: 8 + index,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute text-4xl font-bold text-white"
                    style={{
                        left: `${Math.random() * 90}%`,
                        top: `${Math.random() * 90}%`,
                    }}
                >
                    {symbol}
                </motion.span>
            ))}
        </>
    );
}