import { VERSIONS } from "../config/versions";

// El reset global sin capa anula el espaciado normal de Tailwind.
// Priorizamos solo el espaciado del menú para no alterar las pantallas de juego.
export function VersionSelector() {
    return (
        <main className="h-dvh overflow-y-auto bg-slate-950 p-6! text-slate-100">
            <section className="mx-auto! flex min-h-full w-full max-w-6xl flex-col justify-center py-10!">
                <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-amber-400">Competencia matemática</p>
                <h1 className="mt-4! text-center text-5xl font-black sm:text-7xl">SIGMA <span className="text-amber-400">2026</span></h1>
                <h2 className="mt-6! text-center text-2xl font-semibold">Elige la fase que quieres jugar</h2>
                <p className="mt-3! text-center text-slate-400">Tres fases, 40 preguntas diferentes.</p>
                <nav aria-label="Fases de la competencia" className="mt-10! grid gap-6 lg:grid-cols-3">
                    {VERSIONS.map((version, index) => (
                        <a
                            key={version.id}
                            href={`./versiones/${version.id}/index.html`}
                            className="group flex min-w-0 flex-col break-words rounded-3xl border border-slate-700 bg-slate-900 px-8! py-9! sm:px-10! transition hover:-translate-y-1 hover:border-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
                        >
                            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Fase {index + 1}</p>
                            <h3 className="mt-4! text-2xl leading-snug font-bold text-amber-400 xl:text-3xl">{version.name}</h3>
                            <p className="mt-4! text-4xl font-black">{version.questions.length} <span className="text-lg font-normal text-slate-300">preguntas</span></p>
                            <p className="mt-2! text-slate-300">{version.teamCount} equipos</p>
                            <p className="mt-4! flex-1 leading-relaxed text-slate-400">{version.description}</p>
                            <p className="mt-8! leading-relaxed font-bold text-amber-400">Jugar {version.name.toLowerCase()} →</p>
                        </a>
                    ))}
                </nav>
                <p className="mt-8! text-center text-sm text-slate-400">Cada fase comienza una partida independiente con los puntajes en cero.</p>
            </section>
        </main>
    );
}
