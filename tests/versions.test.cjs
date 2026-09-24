const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const ts = require('typescript');

// Ejecuta los servicios y stores reales, sin añadir un segundo compilador.
require.extensions['.ts'] = (module, filename) => {
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2023, jsx: ts.JsxEmit.ReactJSX },
        fileName: filename,
    });
    module._compile(outputText, filename);
};
require.extensions['.tsx'] = require.extensions['.ts'];

const root = path.resolve(__dirname, '..');
function loadVersion(id, fileProtocol = false) {
    for (const key of Object.keys(require.cache)) {
        if (key.startsWith(path.join(root, 'src') + path.sep)) delete require.cache[key];
    }
    global.window = {
        location: { pathname: `${fileProtocol ? '/opt/sigma/dist' : ''}/versiones/${id}/index.html` },
    };
    return {
        ...require('../src/config/versions.ts'),
        ...require('../src/config/competition.ts'),
        ...require('../src/services/question.service.ts'),
        ...require('../src/services/wheel.service.ts'),
        ...require('../src/stores/competition.store.ts'),
        ...require('../src/stores/team.store.ts'),
    };
}

const phases = [['eliminatoria', 20, 6, 'Equipo'], ['final', 16, 4, 'Finalista'], ['desempate', 4, 2, 'Equipo']];

test('40 preguntas únicas entre fases, con imágenes, respuestas y categorías válidas', () => {
    const ids = new Set();
    const images = new Set();
    const hashes = new Set();
    const categories = require('../src/data/categories.json');
    const crypto = require('node:crypto');
    for (const [id, count] of phases) {
        const bank = require(`../versiones/${id}/questions.json`);
        assert.equal(bank.length, count);
        for (const q of bank) {
            assert(!ids.has(q.id), `ID repetido: ${q.id}`);
            assert(!images.has(q.questionImage), `Imagen repetida: ${q.questionImage}`);
            ids.add(q.id);
            images.add(q.questionImage);
            assert(categories.some(c => c.id === q.categoryId));
            assert.equal(q.questionImage, `pregunta${String(q.id).padStart(2, '0')}.png`);
            assert.equal(q.answerImage, `respuesta${String(q.id).padStart(2, '0')}.png`);
            for (const image of [q.questionImage, q.answerImage]) {
                assert(fs.existsSync(path.join(root, 'src/assets/images', image)), image);
            }
            const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'src/assets/images', q.questionImage))).digest('hex');
            assert(!hashes.has(hash), `Contenido de imagen repetido: ${q.questionImage}`);
            hashes.add(hash);
        }
    }
    assert.deepEqual([...ids].sort((a, b) => a - b), Array.from({ length: 40 }, (_, i) => i + 1));
});

for (const [id, count, teamCount, teamPrefix] of phases) {
    test(`${id}: selección, 100 sorteos completos, puntajes y reinicio`, () => {
        const { activeVersion, COMPETITION, QuestionService, WheelService, useCompetitionStore, useTeamStore } = loadVersion(id);
        assert.equal(activeVersion.id, id);
        assert.equal(COMPETITION.totalBoxes, count);
        const initialTeams = useTeamStore.getState().teams;
        assert.equal(initialTeams.length, teamCount);
        assert.deepEqual(initialTeams.map(t => t.name), Array.from({ length: teamCount }, (_, i) => `${teamPrefix} ${i + 1}`));
        assert(initialTeams.every(t => t.score === 0 && t.multiplier === 1));
        useTeamStore.getState().resetScores();
        assert.deepEqual(useTeamStore.getState().teams, initialTeams);
        for (let round = 0; round < 100; round++) {
            useCompetitionStore.getState().resetCompetition();
            const assigned = new Set();
            assert.equal(Object.keys(useCompetitionStore.getState().boxMultipliers).length, count);
            for (let i = 0; i < count; i++) {
                const state = useCompetitionStore.getState();
                const box = WheelService.spin(undefined, state.usedBoxes);
                assert(box >= 1 && box <= count && !state.usedBoxes.includes(box));
                const question = QuestionService.getQuestionForBox(box);
                assert(activeVersion.questions.some(q => q.id === question.id));
                assert(!assigned.has(question.id));
                assigned.add(question.id);
                state.addUsedBox(box);
                state.addUsedBox(box); // Un doble clic no duplica el turno.
                assert.equal(useCompetitionStore.getState().usedBoxes.length, i + 1);
            }
            assert.equal(assigned.size, count);
            assert.throws(() => WheelService.spin(undefined, useCompetitionStore.getState().usedBoxes));
            assert.equal(QuestionService.getQuestionForBox(count + 1), undefined);
        }
        assert.throws(() => QuestionService.initialize(count + 1));
        const state = useCompetitionStore.getState();
        state.setFinished(true);
        state.setSelectedBox(1);
        state.setPendingPoints(60);
        state.setScoringActive(true);
        state.lockInteractions(1000);
        state.resetCompetition();
        const reset = useCompetitionStore.getState();
        assert.equal(reset.finished, false);
        assert.equal(reset.scoringActive, false);
        assert.equal(reset.selectedBox, null);
        assert.equal(reset.pendingPoints, 0);
        assert.equal(reset.interactionLockUntil, 0);
        assert.deepEqual(reset.usedBoxes, []);
        assert(QuestionService.getQuestionForBox(count));
        useTeamStore.getState().createTeam('Prueba de fase');
        const teamIndex = useTeamStore.getState().teams.length - 1;
        const team = useTeamStore.getState().teams[teamIndex];
        useTeamStore.getState().addPointsToTeam(teamIndex, 60);
        assert.equal(useTeamStore.getState().teams[teamIndex].score, 60);
        assert(useTeamStore.getState().adjustScore(team.id, -10));
        assert.equal(useTeamStore.getState().teams[teamIndex].score, 50);
        assert(useTeamStore.getState().undoAdjustScore());
        assert.equal(useTeamStore.getState().teams[teamIndex].score, 60);
        useTeamStore.getState().resetScores();
        assert(useTeamStore.getState().teams.every(t => t.score === 0));
        assert.deepEqual(useTeamStore.getState().scoreHistory, []);
        assert.equal(loadVersion(id, true).activeVersion.id, id);
    });
}

test('el menú no inicia una fase y navegar a otra no arrastra puntajes ni casillas', () => {
    const previous = loadVersion('eliminatoria');
    previous.useCompetitionStore.getState().addUsedBox(1);
    previous.useTeamStore.getState().createTeam('Temporal');
    previous.useTeamStore.getState().addPointsToTeam(0, 100);
    const next = loadVersion('final');
    assert.deepEqual(next.useCompetitionStore.getState().usedBoxes, []);
    assert(next.useTeamStore.getState().teams.every(t => t.score === 0));
    assert(!next.useTeamStore.getState().teams.some(t => t.name === 'Temporal'));
    assert.equal(loadVersion('no-existe').activeVersion, undefined);
});

test('compilación: las cuatro entradas y sus recursos relativos existen', () => {
    for (const file of ['index.html', ...phases.map(([id]) => `versiones/${id}/index.html`)]) {
        const fullPath = path.join(root, 'dist', file);
        const html = fs.readFileSync(fullPath, 'utf8');
        for (const [, resource] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
            assert(!resource.startsWith('/'), `Ruta incompatible con Electron: ${resource}`);
            assert(fs.existsSync(path.resolve(path.dirname(fullPath), resource)), resource);
        }
    }
});

test('menú con tres accesos y tableros con 20, 16 y 4 botones', () => {
    // Framer Motion debe inicializarse en modo servidor para esta prueba de markup.
    delete global.window;
    require('framer-motion');
    const React = require('react');
    const { renderToStaticMarkup } = require('react-dom/server');
    loadVersion('no-existe');
    const { VersionSelector } = require('../src/pages/VersionSelector.tsx');
    const menu = renderToStaticMarkup(React.createElement(VersionSelector));
    for (const [id] of phases) {
        assert(menu.includes(`href="./versiones/${id}/index.html"`));
    }
    for (const [id, count] of phases) {
        const { useCompetitionStore } = loadVersion(id);
        useCompetitionStore.getState().resetCompetition();
        const { BoxGrid } = require('../src/components/game/box/BoxGrid.tsx');
        delete global.window;
        const grid = renderToStaticMarkup(React.createElement(BoxGrid));
        assert.equal([...grid.matchAll(/<button\b/g)].length, count);
    }
});
