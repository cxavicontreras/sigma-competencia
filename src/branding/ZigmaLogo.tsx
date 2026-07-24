import { motion } from "framer-motion";

type ZigmaLogoProps = {
    size?: number;
}

export function ZigmaLogo( {
    size = 115,
}: ZigmaLogoProps){
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

            {/* Z */}

            <path
                d="
                    M135 80
                    L135 70
                    M135 70
                    H70
                    L110 100
                    L70 130
                    H135
                    L135 120
                "
                stroke="url(#gold)"
                strokeWidth="10"
                strokeLinecap="square"
                strokeLinejoin="miter"
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