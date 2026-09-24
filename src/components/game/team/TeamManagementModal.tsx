import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../../ui";
import { useTeamStore, useCompetitionStore } from "../../../stores";
import { useClickCooldown } from "../../../hooks/useClickCooldown";

const MAX_TEAMS = 4;

type Props = {
    open: boolean;
    onClose: () => void;
};

export function TeamManagementModal({ open, onClose }: Props) {
    const teams = useTeamStore((state) => state.teams);
    const createTeam = useTeamStore((state) => state.createTeam);
    const deleteTeam = useTeamStore((state) => state.deleteTeam);
    const adjustScore = useTeamStore((state) => state.adjustScore);
    const busy = useCompetitionStore((state) =>
        state.spinning || state.revealingCategory !== null ||
        state.currentQuestion !== null || state.scoringActive || state.finished,
    );
    const cooldown = useClickCooldown();

    function handleAdd() {
        if (teams.length >= MAX_TEAMS) return;
        createTeam(`Equipo ${teams.length + 1}`);
    }

    function handleAdjust(id: number, amount: number) {
        if (busy) return;
        adjustScore(id, amount);
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="team-management"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="team-management-title"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                >
                    <GlassCard className="flex w-full max-w-xl max-h-[90dvh] flex-col rounded-3xl p-6 sm:p-8 gap-4">
                        <h2 id="team-management-title" className="text-2xl font-bold text-amber-400">
                            Gestionar Equipos
                        </h2>
                        <div className="flex min-h-0 flex-col gap-3 overflow-y-auto">
                            {teams.map((team) => (
                                <div key={team.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-slate-800/60 p-3">
                                    <div className="min-w-0 flex-1">
                                        <span className="block break-words text-lg font-semibold text-slate-200">{team.name}</span>
                                        <span className="text-xl font-bold text-amber-400">{team.score} pts</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleAdjust(team.id, 20)}
                                            disabled={busy}
                                            aria-label={`Sumar 20 puntos a ${team.name}`}
                                            className="rounded-lg bg-emerald-600 px-3 py-2 text-lg font-bold hover:bg-emerald-500 disabled:opacity-30"
                                        >+20</button>
                                        <button
                                            type="button"
                                            onClick={() => handleAdjust(team.id, -20)}
                                            disabled={busy}
                                            aria-label={`Restar 20 puntos a ${team.name}`}
                                            className="rounded-lg bg-red-600 px-3 py-2 text-lg font-bold hover:bg-red-500 disabled:opacity-30"
                                        >−20</button>
                                        <button
                                            type="button"
                                            onClick={() => cooldown(() => deleteTeam(team.id))}
                                            className="rounded-lg bg-slate-700 px-3 py-1 text-sm font-bold hover:bg-red-500"
                                        >Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => cooldown(handleAdd)}
                            disabled={teams.length >= MAX_TEAMS}
                            className="shrink-0 rounded-xl border border-dashed border-amber-400/50 bg-amber-400/5 px-4 py-2 text-lg font-bold text-amber-400 hover:bg-amber-400/10 disabled:opacity-30"
                        >Agregar Equipo</button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="shrink-0 rounded-xl bg-slate-700 px-4 py-2 text-lg font-bold hover:bg-slate-600"
                        >Cerrar</button>
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
