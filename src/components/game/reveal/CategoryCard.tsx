import { motion, AnimatePresence } from "framer-motion";

import { useCompetitionStore } from "../../../stores";

export function CategoryCard() {

    const category = useCompetitionStore(
        state => state.revealingCategory,
    );

    return (
        <AnimatePresence>
            {category && (
                <motion.div
                    key="category-reveal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/70
                        backdrop-blur-sm
                    "
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 200,
                        }}
                        className="
                            flex
                            flex-col
                            items-center
                            gap-6
                            rounded-3xl
                            border
                            px-20
                            py-14
                        "
                        style={{
                            borderColor: `${category.color}40`,
                            backgroundColor: `${category.color}15`,
                        }}
                    >
                        <motion.span
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                damping: 10,
                                stiffness: 150,
                                delay: 0.15,
                            }}
                            className="text-8xl"
                            style={{
                                color: category.color,
                            }}
                        >
                            {category.icon}
                        </motion.span>

                        <motion.h2
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                delay: 0.25,
                                duration: 0.4,
                            }}
                            className="
                                text-center
                                text-7xl
                                font-black
                                tracking-wide
                            "
                            style={{
                                color: category.color,
                            }}
                        >
                            {category.name}
                        </motion.h2>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                                delay: 0.4,
                                duration: 0.5,
                            }}
                            className="
                                h-1
                                w-40
                                rounded-full
                            "
                            style={{
                                backgroundColor: category.color,
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

}
