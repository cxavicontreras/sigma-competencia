// Única fuente de verdad para el branding visible de la aplicación.
// Cambia aquí el nombre de la competencia y el de la aplicación:
// se propaga a encabezados, pantallas, mensajes y títulos de pestaña.
export const BRANDING = {
    appName: "Sistema de Competencia Matemática",
    competitionName: "Competencia Matemática",
} as const;

// Título de pestaña a partir de la sección actual (fase o menú).
export function brandingTitle(section?: string): string {
    return section
        ? `${BRANDING.competitionName} · ${section}`
        : BRANDING.competitionName;
}
