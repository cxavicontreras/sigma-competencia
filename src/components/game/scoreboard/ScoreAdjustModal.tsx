import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GlassCard } from "../../ui";
import {
    useTeamStore,
    MAX_SCORE_ADJUSTMENT,
} from "../../../stores";
import { useClickCooldown } from "../../../hooks/useClickCooldown";

const AMOUNT_RE = /^[+-]?\d+(?:\.\d+)?$/;

type Props = {
    open: boolean;
    onClose: () => void;
};

function formatAmount(value: number): string {
    if (!Number.isFinite(value)) {
        return String(value);
    }
    return value.toLocaleString("es-ES", {
        maximumFractionDigits: 3,
    });
}

function formatSigned(amount: number): string {
    return amount > 0
        ? `+${formatAmount(amount)}`
        : formatAmount(amount);
}

export function ScoreAdjustModal({
    open,
    onClose,
}: Props) {
    const teams = useTeamStore((state) => state.teams);
    const currentTeamIndex = useTeamStore(
        (state) => state.currentTeam,
    );
    const scoreHistory = useTeamStore(
        (state) => state.scoreHistory,
    );
    const adjustScore = useTeamStore(
        (state) => state.adjustScore,
    );
    const undoAdjustScore = useTeamStore(
        (state) => state.undoAdjustScore,
    );

    const [selectedTeamId, setSelectedTeamId] = useState<
        number | null
    >(null);
    const [sign, setSign] = useState<"+" | "-">("+");
    const [input, setInput] = useState(""); //<- Income
    const [feedback, setFeedback] = useState("");

    const cooldown = useClickCooldown();
    const undoCooldown = useClickCooldown();

    const resolvedTeamId =
        selectedTeamId !== null
            ? selectedTeamId
            : teams[currentTeamIndex]?.id ??
              teams[0]?.id ??
              null;

    const selectedTeam =
        teams.find((t) => t.id === resolvedTeamId) ?? null;

    const trimmed = input.trim();

    const raw =
        trimmed === ""
            ? null
            : AMOUNT_RE.test(trimmed)
              ? Number(trimmed)
              : NaN;

    const invalid =
        raw !== null && Number.isNaN(raw);

    const tooLarge =
        raw !== null &&
        !Number.isNaN(raw) &&
        Math.abs(raw) > MAX_SCORE_ADJUSTMENT;

    const zeroAdjust = raw === 0;

    const error = invalid
        ? "Valor no válido."
        : tooLarge
          ? `Límite: ±${formatAmount(
                MAX_SCORE_ADJUSTMENT,
            )} pts.`
          : zeroAdjust
            ? "El ajuste debe ser distinto de cero."
            : "";

    const hasError = invalid || tooLarge || zeroAdjust;

    const effective =
        raw !== null &&
        !Number.isNaN(raw) &&
        !hasError
            ? sign === "-"
                ? -raw
                : raw
            : null;

    const canApply =
        effective !== null && selectedTeam !== null;

    const previewScore =
        selectedTeam !== null && effective !== null
            ? selectedTeam.score + effective
            : null;

    const lastAdjustment =
        scoreHistory.length > 0
            ? scoreHistory[scoreHistory.length - 1]
            : null;

    const lastTeam = lastAdjustment
        ? teams.find((t) => t.id === lastAdjustment.teamId) ??
          null
        : null;

    function handleApply() {
        cooldown(() => {
            if (
                effective === null ||
                selectedTeam === null
            ) {
                return;
            }

            const ok = adjustScore(
                selectedTeam.id,
                effective,
            );

            if (ok) {
                setFeedback(
                    `Ajuste aplicado (${formatSigned(
                        effective,
                    )} pts).`,
                );
                setInput("");
                return;
            }

            setFeedback(
                "No se pudo aplicar el ajuste.",
            );
        });
    }

    function handleUndo() {
        undoCooldown(() => {
            const ok = undoAdjustScore();

            setFeedback(
                ok
                    ? "Último ajuste deshecho."
                    : "No hay ajustes por deshacer.",
            );
        });
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="score-adjust"
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
                        bg-black/60
                        backdrop-blur-sm
                        p-4
                    "
                >
                    <GlassCard
                        className="
                            flex
                            w-full
                            max-w-md
                            flex-col
                            rounded-3xl
                            p-6
                            sm:p-8
                            gap-4
                        "
                    >
                        <h2
                            className="
                                text-2xl
                                font-bold
                                text-amber-400
                            "
                        >
                            Ajustar Puntaje
                        </h2>

                        {selectedTeam === null ? (
                            <p
                                className="
                                    text-lg
                                    text-slate-400
                                "
                            >
                                No hay equipos disponibles.
                            </p>
                        ) : (
                            <>
                                <label
                                    className="
                                        text-sm
                                        font-semibold
                                        text-slate-400
                                    "
                                >
                                    Equipo
                                </label>
                                <select
                                    value={String(
                                        selectedTeam.id,
                                    )}
                                    onChange={(e) =>
                                        setSelectedTeamId(
                                            Number(
                                                e.target
                                                    .value,
                                            ),
                                        )
                                    }
                                    className="
                                        rounded-xl
                                        border
                                        border-slate-600
                                        bg-slate-800
                                        px-3
                                        py-2
                                        text-lg
                                        text-slate-100
                                        outline-none
                                        focus:border-amber-400
                                    "
                                >
                                    {teams.map((team) => (
                                        <option
                                            key={team.id}
                                            value={team.id}
                                        >
                                            {team.name}
                                        </option>
                                    ))}
                                </select>

                                <div
                                    className="
                                        flex
                                        gap-2
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            rounded-xl
                                            border
                                            border-slate-600
                                            bg-slate-700
                                            overflow-hidden
                                        "
                                    >
                                        {(
                                            ["+", "-"] as const
                                        ).map((s) => (
                                            <button
                                                key={s}
                                                onClick={() =>
                                                    setSign(s)
                                                }
                                                disabled={
                                                    sign === s
                                                }
                                                className={`
                                                    px-3
                                                    py-2
                                                    text-lg
                                                    font-black
                                                    transition-all
                                                    disabled:cursor-default
                                                    ${
                                                        sign === s
                                                            ? "bg-amber-400 text-slate-900"
                                                            : "bg-transparent text-slate-300 hover:bg-slate-600"
                                                    }
                                                `}
                                            >
                                                {s === "-"
                                                    ? "\u2212"
                                                    : "+"}
                                                {" "}
                                            </button>
                                        ))}
                                    </div>

                                    <input
                                        value={input}
                                        onChange={(e) =>
                                            setInput(
                                                e.target.value.replace(
                                                    /^[+-]/,
                                                    "",
                                                ),
                                            )
                                        }
                                        onKeyDown={(e) => {
                                            if (
                                                e.key ===
                                                "Enter"
                                            ) {
                                                handleApply();
                                            }
                                        }}
                                        placeholder="Puntos"
                                        inputMode="decimal"
                                        maxLength={12}
                                        autoFocus
                                        className="
                                            flex-1
                                            rounded-xl
                                            border
                                            border-slate-600
                                            bg-slate-800
                                            px-3
                                            py-2
                                            text-lg
                                            text-slate-100
                                            outline-none
                                            focus:border-amber-400
                                        "
                                    />
                                </div>

                                {(error || feedback) && (
                                    <p
                                        className={
                                            error
                                                ? "text-sm text-red-400"
                                                : "text-sm text-emerald-400"
                                        }
                                    >
                                        {error || feedback}
                                    </p>
                                )}

                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-slate-800/70
                                        p-3
                                        flex
                                        flex-col
                                        gap-1
                                        text-sm
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            justify-between
                                        "
                                    >
                                        <span className="text-slate-400">
                                            Equipo
                                        </span>
                                        <span className="font-semibold text-slate-200">
                                            {
                                                selectedTeam.name
                                            }
                                        </span>
                                    </div>
                                    <div
                                        className="
                                            flex
                                            justify-between
                                        "
                                    >
                                        <span className="text-slate-400">
                                            Puntaje actual
                                        </span>
                                        <span className="font-semibold text-slate-200">
                                            {formatAmount(
                                                selectedTeam.score,
                                            )}{" "}
                                            pts
                                        </span>
                                    </div>
                                    <div
                                        className="
                                            flex
                                            justify-between
                                        "
                                    >
                                        <span className="text-slate-400">
                                            Ajuste
                                        </span>
                                        <span className="font-semibold text-amber-400">
                                            {effective !== null
                                                ? `${formatSigned(
                                                      effective,
                                                  )} pts`
                                                : "\u2014"}
                                        </span>
                                    </div>
                                    <div
                                        className="
                                            flex
                                            justify-between
                                        "
                                    >
                                        <span className="text-slate-400">
                                            Nuevo puntaje
                                        </span>
                                        <span className="font-black text-white">
                                            {previewScore !== null
                                                ? `${formatAmount(
                                                      previewScore,
                                                  )} pts`
                                                : "\u2014"}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleApply}
                                    disabled={!canApply}
                                    className="
                                        rounded-xl
                                        bg-emerald-500
                                        px-4
                                        py-2
                                        text-lg
                                        font-bold
                                        transition-all
                                        hover:scale-105
                                        hover:bg-emerald-400
                                        disabled:opacity-30
                                        disabled:hover:scale-100
                                    "
                                >
                                    Aplicar ajuste
                                </button>

                                {lastAdjustment !== null ? (
                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-2
                                            rounded-xl
                                            bg-slate-800/70
                                            p-3
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                flex-col
                                                min-w-0
                                            "
                                        >
                                            <span className="text-xs text-slate-400">
                                                Último ajuste
                                            </span>
                                            <span className="truncate text-sm font-semibold text-slate-200">
                                                {lastTeam
                                                    ? lastTeam.name
                                                    : "Equipo"}
                                                {" "}
                                                {formatSigned(
                                                    lastAdjustment.amount,
                                                )}{" "}
                                                pts
                                            </span>
                                        </div>
                                        <button
                                            onClick={
                                                handleUndo
                                            }
                                            className="
                                                rounded-lg
                                                bg-slate-600
                                                px-3
                                                py-1
                                                text-sm
                                                font-bold
                                                transition-all
                                                hover:scale-105
                                                hover:bg-amber-500
                                                hover:text-slate-900
                                            "
                                        >
                                            Deshacer
                                        </button>
                                    </div>
                                ) : null}
                            </>
                        )}

                        <button
                            onClick={onClose}
                            className="
                                rounded-xl
                                bg-slate-700
                                px-4
                                py-2
                                text-lg
                                font-bold
                                transition-all
                                hover:scale-105
                            "
                        >
                            Cerrar
                        </button>
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
