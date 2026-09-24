# SIGMA 2026

Competencia matemática con menú inicial para elegir Eliminatoria, Final o Desempate.

## Ejecutar

```sh
npm install
npm run dev
```

Abre la dirección que muestra Vite. El menú permite iniciar cualquiera de las tres fases:

| Fase | Casillas | Equipos iniciales | Imágenes de preguntas | Acceso directo |
| --- | ---: | --- | --- | --- |
| Eliminatoria | 20 | Equipo 1–6 | 01–10 y 16–25 | `/versiones/eliminatoria/index.html` |
| Final | 16 | Finalista 1–4 | 11–15 y 26–36 | `/versiones/final/index.html` |
| Desempate | 4 | Equipo 1–2 | 37–40 | `/versiones/desempate/index.html` |

Los 40 IDs coinciden con los números de las imágenes y no se repiten entre fases. Cada pregunta tiene su respuesta correspondiente. Los equipos iniciales se configuran por fase en `src/config/versions.ts`; la gestión de equipos y los ajustes de puntaje siguen disponibles.

Cada fase inicia una partida independiente. «Cambiar fase» vuelve al menú y abandona la partida actual; los puntajes y los cambios de equipos de esa sesión no se conservan al navegar. En el podio puedes volver a jugar la misma fase (con puntajes en cero y un nuevo sorteo) o elegir otra.

## Organización

Cada carpeta de `versiones/` contiene su `index.html` y su banco `questions.json`. Los componentes, stores y servicios se comparten en `src/`; las imágenes permanecen en `src/assets/images/`.

`src/config/versions.ts` registra las fases. El tablero, la ruleta y los multiplicadores toman la cantidad de casillas del banco activo. Las preguntas se distribuyen al azar, una por casilla, sin reemplazo. La ruleta deja de estar disponible cuando se agotan las casillas; «Finalizar competencia» muestra el podio.

## Validación y compilación

```sh
npm run lint
npm run test:versions
npm run build:electron
```

`test:versions` compila el programa y verifica los bancos disjuntos, las imágenes y respuestas, 100 sorteos completos por fase, el fin de las casillas, los reinicios, los ajustes de puntaje y los recursos de las páginas compiladas.

```sh
npm run preview
npm run electron:dev
npm run dist
```

La compilación produce el menú en `dist/index.html`, las páginas de las tres fases en `dist/versiones/` y recursos compartidos en `dist/assets/`. Publica o distribuye la carpeta `dist` completa. Las rutas relativas también permiten navegar en Electron.
