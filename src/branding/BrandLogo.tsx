import { motion } from "framer-motion";

type BrandLogoProps = {
    size?: number;
}

export function BrandLogo( {
    size = 115,
}: BrandLogoProps){
    return (
        
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            initial={{
                opacity: 0,
                rotate: -20,
                scale: .7,
            }}
            animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
            }}
            transition={{
                duration: 1.2,
                ease: "easeOut",
            }}
        >
            <defs>

                <linearGradient
                    id="gold"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#FFF8D6" />
                    <stop offset="35%" stopColor="#FFD86A" />
                    <stop offset="70%" stopColor="#F3B63A" />
                    <stop offset="100%" stopColor="#C98212" />
                </linearGradient>

                <linearGradient
                    id="blue"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>

                <filter id="glow">

                    <feGaussianBlur stdDeviation="4"/>

                </filter>

            </defs>

            {/* Hexágono */}

            <polygon
                points="100,20 165,55 165,145 100,180 35,145 35,55"
                stroke="url(#blue)"
                strokeWidth="4"
                fill="none"
            />

            {/* Prisma */}

            <polygon
                points="100,35 155,60 155,140 100,165 45,140 45,60"
                fill="url(#gold)"
                opacity=".15"
            />

            {/* Pi */}

            <path
                d="
                    M68 76
                    H132
                    M86 76
                    V126
                    M114 76
                    V112
                    C114 123
                    120 128
                    131 124
                "
                stroke="url(#gold)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* Glow */}

            <polygon
                points="100,20 165,55 165,145 100,180 35,145 35,55"
                stroke="#60A5FA"
                strokeWidth="15"
                filter="url(#glow)"
                opacity=".4"
            />

        </motion.svg>
    );
}