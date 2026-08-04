import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GlassCard } from "../../ui";
import { useTeamStore } from "../../../stores";

const MAX_TEAMS = 12;

type Props = {
    open: boolean;
    onClose: () => void;
};

export function TeamManagementModal({
    open,
    onClose,
}: Props) {
    const teams = useTeamStore(
        (state) => state.teams,
    );
    const createTeam = useTeamStore(
        (state) => state.createTeam,
    );
    const updateTeam = useTeamStore(
        (state) => state.updateTeam,
    );
    const deleteTeam = useTeamStore(
        (state) => state.deleteTeam,
    );

    const [editingId, setEditingId] = useState<
        number | null
    >(null);

    const [editName, setEditName] =
        useState("");

    function handleAdd() {
        if (teams.length >= MAX_TEAMS) return;
        createTeam(
            `Equipo ${teams.length + 1}`,
        );
    }

    function handleDelete(id: number) {
        deleteTeam(id);
        if (editingId === id) {
            setEditingId(null);
        }
    }

    function startEdit(team: {
        id: number;
        name: string;
    }) {
        setEditingId(team.id);
        setEditName(team.name);
    }

    function saveEdit() {
        if (
            editingId !== null &&
            editName.trim()
        ) {
            updateTeam(editingId, {
                name: editName.trim(),
            });
        }
        setEditingId(null);
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
                            Gestionar Equipos
                        </h2>

                        <div
                            className="
                                flex
                                flex-col
                                gap-3
                                max-h-80
                                overflow-y-auto
                            "
                        >
                            {teams.map((team) => (
                                <div
                                    key={team.id}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    {editingId ===
                                    team.id ? (
                                        <input
                                            value={
                                                editName
                                            }
                                            onChange={(
                                                e,
                                            ) =>
                                                setEditName(
                                                    e.target
                                                        .value,
                                                )
                                            }
                                            onKeyDown={(
                                                e,
                                            ) => {
                                                if (
                                                    e.key ===
                                                    "Enter"
                                                ) {
                                                    saveEdit();
                                                }
                                                if (
                                                    e.key ===
                                                    "Escape"
                                                ) {
                                                    setEditingId(
                                                        null,
                                                    );
                                                }
                                            }}
                                            autoFocus
                                            className="
                                                flex-1
                                                rounded-xl
                                                border
                                                border-amber-400/30
                                                bg-slate-800
                                                px-3
                                                py-2
                                                text-lg
                                                text-slate-100
                                                outline-none
                                                focus:border-amber-400
                                            "
                                        />
                                    ) : (
                                        <span
                                            className="
                                                flex-1
                                                text-lg
                                                font-semibold
                                                text-slate-200
                                            "
                                        >
                                            {team.name}
                                        </span>
                                    )}

                                    <div
                                        className="
                                            flex
                                            gap-1
                                        "
                                    >
                                        {editingId ===
                                        team.id ? (
                                            <button
                                                onClick={
                                                    saveEdit
                                                }
                                                className="
                                                    rounded-lg
                                                    bg-emerald-500
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    font-bold
                                                    transition-all
                                                    hover:scale-105
                                                "
                                            >
                                                Ok
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    startEdit(
                                                        team,
                                                    )
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
                                                "
                                            >
                                                Editar
                                            </button>
                                        )}

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    team.id,
                                                )
                                            }
                                            className="
                                                rounded-lg
                                                bg-red-500/80
                                                px-3
                                                py-1
                                                text-sm
                                                font-bold
                                                transition-all
                                                hover:scale-105
                                                hover:bg-red-500
                                            "
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleAdd}
                            disabled={
                                teams.length >=
                                MAX_TEAMS
                            }
                            className="
                                rounded-xl
                                border
                                border-dashed
                                border-amber-400/50
                                bg-amber-400/5
                                px-4
                                py-2
                                text-lg
                                font-bold
                                text-amber-400
                                transition-all
                                hover:scale-105
                                hover:bg-amber-400/10
                                disabled:opacity-30
                                disabled:hover:scale-100
                            "
                        >
                            Agregar Equipo
                        </button>

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
