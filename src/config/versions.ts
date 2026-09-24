import eliminatoria from "../../versiones/eliminatoria/questions.json";
import final from "../../versiones/final/questions.json";
import desempate from "../../versiones/desempate/questions.json";
import type { Question } from "../types";

export const VERSIONS = [
    { id: "eliminatoria", name: "Eliminatoria", description: "La primera ronda de la competencia", questions: eliminatoria as Question[], teamCount: 6, teamPrefix: "Equipo" },
    { id: "final", name: "Final", description: "Cuatro finalistas compiten por el podio", questions: final as Question[], teamCount: 4, teamPrefix: "Finalista" },
    { id: "desempate", name: "Desempate", description: "Una ronda adicional para resolver un empate", questions: desempate as Question[], teamCount: 2, teamPrefix: "Equipo" },
];

// Las páginas independientes también funcionan bajo file:// en Electron.
export const activeVersion = VERSIONS.find(version =>
    window.location.pathname.endsWith(`/versiones/${version.id}/index.html`) ||
    window.location.pathname.endsWith(`/versiones/${version.id}/`),
);
