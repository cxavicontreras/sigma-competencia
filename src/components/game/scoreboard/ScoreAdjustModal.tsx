import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GlassCard } from "../../ui";
import { useTeamStore, MAX_SCORE_ADJUSTMENT } from "../../../stores";
import { useClickCooldown } from "../../../hooks/useClickCooldown";

const AMOUNT_RE = /^\d+(?:[.,]\d+)?$/;

type Props = {
    open: boolean;
    onClose: () => void;
};

function formatAmount(value: number): string {
    return value.toLocaleString("es-ES", { maximumFractionDigits: 3 });
}

function formatSigned(amount: number): string {
    return amount > 0 ? `+${formatAmount(amount)}` : formatAmount(amount);
}

export function ScoreAdjustModal({ open, onClose }: Props) {
    const teams = useTeamStore(state => state.teams);
    const currentTeamIndex = useTeamStore(state => state.currentTeam);
    const scoreHistory = useTeamStore(state => state.scoreHistory);
    const adjustScore = useTeamStore(state => state.adjustScore);
    const undoAdjustScore = useTeamStore(state => state.undoAdjustScore);

    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [input, setInput] = useState("");
    const [feedback, setFeedback] = useState("");
    const cooldown = useClickCooldown();
    const undoCooldown = useClickCooldown();

    const selectedTeam = teams.find(team => team.id === selectedTeamId)
        ?? teams[currentTeamIndex] ?? teams[0] ?? null;
    const trimmed = input.trim();
    const amount = AMOUNT_RE.test(trimmed) ? Number(trimmed.replace(",", ".")) : NaN;
    const error = trimmed === "" ? ""
        : !Number.isFinite(amount) || amount <= 0 ? "Ingresa una cantidad mayor que cero, sin signo."
        : amount > MAX_SCORE_ADJUSTMENT ? `Límite: ${formatAmount(MAX_SCORE_ADJUSTMENT)} pts.`
        : "";
    const canApply = trimmed !== "" && error === "" && selectedTeam !== null;
    const lastAdjustment = scoreHistory.at(-1);
    const lastTeam = teams.find(team => team.id === lastAdjustment?.teamId);

    function handleApply(direction: 1 | -1) {
        if (!canApply || selectedTeam === null) return;
        cooldown(() => {
            const adjustment = direction * amount;
            if (adjustScore(selectedTeam.id, adjustment)) {
                setFeedback(`${selectedTeam.name}: ${formatSigned(adjustment)} pts aplicados.`);
                setInput("");
            } else {
                setFeedback("No se pudo aplicar el ajuste.");
            }
        });
    }

    function handleUndo() {
        undoCooldown(() => {
            setFeedback(undoAdjustScore()
                ? "Último ajuste deshecho."
                : "No hay ajustes por deshacer.");
        });
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="score-adjust"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="score-adjust-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4!"
                >
                    <GlassCard className="flex w-full max-w-md max-h-[90dvh] overflow-y-auto flex-col rounded-3xl p-6! sm:p-8! gap-4">
                        <h2 id="score-adjust-title" className="text-2xl font-bold text-amber-400">Ajustar puntaje</h2>
                        {selectedTeam === null ? (
                            <p className="text-lg text-slate-400">No hay equipos disponibles.</p>
                        ) : (
                            <>
                                <label htmlFor="score-adjust-team" className="text-sm font-semibold text-slate-400">Equipo</label>
                                <select
                                    id="score-adjust-team"
                                    value={selectedTeam.id}
                                    onChange={event => {
                                        setSelectedTeamId(Number(event.target.value));
                                        setFeedback("");
                                    }}
                                    className="min-w-0 rounded-xl border border-slate-600 bg-slate-800 px-3! py-2! text-lg text-slate-100 outline-none focus:border-amber-400"
                                >
                                    {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
                                </select>
                                <p className="text-slate-300">Puntaje actual: <strong>{formatAmount(selectedTeam.score)} pts</strong></p>
                                <label htmlFor="score-adjust-amount" className="text-sm font-semibold text-slate-400">Cantidad de puntos</label>
                                <input
                                    id="score-adjust-amount"
                                    value={input}
                                    onChange={event => {
                                        setInput(event.target.value);
                                        setFeedback("");
                                    }}
                                    placeholder="Ej. 20"
                                    inputMode="decimal"
                                    maxLength={12}
                                    autoFocus
                                    aria-invalid={Boolean(error)}
                                    aria-describedby="score-adjust-help score-adjust-feedback"
                                    className="min-w-0 rounded-xl border border-slate-600 bg-slate-800 px-3! py-2! text-lg text-slate-100 outline-none focus:border-amber-400"
                                />
                                <p id="score-adjust-help" className="text-sm text-slate-400">Ingresa la cantidad y pulsa + para sumar o − para restar.</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleApply(1)}
                                        disabled={!canApply}
                                        className="rounded-xl bg-emerald-600 px-4! py-3! text-lg font-bold hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        + Sumar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleApply(-1)}
                                        disabled={!canApply}
                                        className="rounded-xl bg-red-600 px-4! py-3! text-lg font-bold hover:bg-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        − Restar
                                    </button>
                                </div>
                                <p id="score-adjust-feedback" role="status" className={error ? "text-sm text-red-400" : "text-sm text-emerald-400"}>
                                    {error || feedback}
                                </p>
                                {lastAdjustment && (
                                    <div className="flex items-center justify-between gap-2 rounded-xl bg-slate-800/70 p-3!">
                                        <div className="flex min-w-0 flex-col">
                                            <span className="text-xs text-slate-400">Último ajuste</span>
                                            <span className="truncate text-sm font-semibold text-slate-200">
                                                {lastTeam?.name ?? "Equipo"} {formatSigned(lastAdjustment.amount)} pts
                                            </span>
                                        </div>
                                        <button onClick={handleUndo} className="rounded-lg bg-slate-600 px-3! py-1! text-sm font-bold hover:bg-amber-500 hover:text-slate-900">Deshacer</button>
                                    </div>
                                )}
                            </>
                        )}
                        <button onClick={onClose} className="rounded-xl bg-slate-700 px-4! py-2! text-lg font-bold hover:bg-slate-600">Cerrar</button>
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
