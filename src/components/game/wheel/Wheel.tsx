import { motion } from "framer-motion";

import { GlassCard } from "../../ui";

import {
    WheelSvg,
    WheelPointer,
    WheelDisplay,
    WheelControls,
} from ".";

import { useWheel } from "../../../hooks/useWheel";

export function Wheel() {

    const {

        rotation,

        displayNumber,

        isSpinning,

        canSpin,

        spinWheel,

        handleAnimationComplete,

    } = useWheel();

    return (

        <GlassCard
            className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                gap-8
                p-6
            "
        >

            <div
                className="
                    text-xl
                    font-bold
                    text-amber-400
                "
            >

                Ruleta

            </div>

            <div className="relative">

                <WheelPointer />

                <motion.div

                    animate={{
                        rotate: rotation,
                    }}

                    transition={{
                        duration: 1,
                        ease: [0.17, 0.67, 0.23, 1],
                    }}

                    onAnimationComplete={
                        handleAnimationComplete
                    }

                    className="
                        flex
                        h-56
                        w-56
                        items-center
                        justify-center
                        rounded-full
                        border-4
                        border-amber-400
                        bg-slate-900
                    "

                >

                    <WheelSvg />

                </motion.div>

            </div>

            <WheelDisplay
                number={displayNumber}
                spinning={isSpinning}
            />

            <WheelControls
                spinning={isSpinning}
                noBoxes={!canSpin}
                onSpin={spinWheel}
            />

        </GlassCard>

    );

}