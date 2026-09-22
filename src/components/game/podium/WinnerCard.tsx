import { motion } from "framer-motion";
import type { Team } from "../../../types";

type Props = {
    team: Team;
    position: number;
};

const PODIUM_STYLES = [
    {
        text: "text-amber-300",
        card: "border-amber-400/50 bg-amber-400/10",
        column: "from-[#A66B0A] to-[#FFD76A]",
        height: "h-[clamp(5rem,18dvh,12rem)]",
        order: "order-2",
    },
    {
        text: "text-slate-200",
        card: "border-slate-300/50 bg-slate-300/10",
        column: "from-[#717D8C] to-[#E2E8F0]",
        height: "h-[clamp(4rem,14dvh,9rem)]",
        order: "order-1",
    },
    {
        text: "text-orange-300",
        card: "border-orange-400/50 bg-orange-400/10",
        column: "from-[#80451F] to-[#CD8A50]",
        height: "h-[clamp(3rem,10dvh,7rem)]",
        order: "order-3",
    },
    {
        text: "text-sky-300",
        card: "border-sky-400/50 bg-sky-400/10",
        column: "from-[#264761] to-[#6CA6CD]",
        height: "h-[clamp(2rem,7dvh,5rem)]",
        order: "order-4",
    },
];

export function WinnerCard({ team, position }: Props) {
    const style = PODIUM_STYLES[position] ?? PODIUM_STYLES[3];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: position * 0.2 + 0.3, duration: 0.5 }}
            className={`flex min-w-0 flex-1 flex-col items-center gap-3 ${style.order}`}
        >
            <div className={`flex w-full min-w-0 flex-col items-center gap-1 rounded-2xl border px-3 py-3 ${style.card}`}>
                <span className={`text-3xl font-black sm:text-4xl ${style.text}`}>
                    {position + 1}.º
                </span>
                <h3 className={`w-full break-words text-center text-xl font-bold sm:text-2xl ${style.text}`}>
                    {team.name}
                </h3>
                <p className={`text-3xl font-black sm:text-4xl ${style.text}`}>
                    {team.score}
                </p>
                <p className="text-sm text-slate-300">puntos</p>
            </div>
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: position * 0.2 + 0.3, duration: 0.5 }}
                className={`w-4/5 origin-bottom rounded-t-lg bg-gradient-to-t ${style.height} ${style.column}`}
            />
        </motion.div>
    );
}