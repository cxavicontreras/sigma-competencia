import { motion } from "framer-motion";

type WheelDisplayProps = {

    number: number | null;

    spinning: boolean;

};

export function WheelDisplay({
    number,
    spinning,
}: WheelDisplayProps) {

    return (

        <div className="flex flex-col items-center">

            <p className="text-sm uppercase tracking-widest text-slate-400">

                Caja seleccionada

            </p>

            <motion.h1

                key={number}

                initial={{
                    scale: .6,
                    opacity: 0,
                }}

                animate={{
                    scale: 1,
                    opacity: 1,
                }}

                transition={{
                    duration: .25,
                }}

                className={`
                    text-7xl
                    font-black
                    transition-colors
                    duration-300
                    ${
                        spinning
                            ? "text-white"
                            : "text-amber-400"
                    }
                `}

            >

                {number?.toString().padStart(2, "0") ?? "--"}

            </motion.h1>

        </div>

    );

}