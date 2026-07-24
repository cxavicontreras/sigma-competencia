const DISTRIBUTION: [number, number][] = [
    [1, 20],
    [2, 8],
    [3, 2],
];

export function generateBoxMultipliers(
    totalBoxes: number,
): Record<number, number> {

    const pool: number[] = [];

    for (const [multiplier, count] of DISTRIBUTION) {
        for (let i = 0; i < count; i++) {
            pool.push(multiplier);
        }
    }

    while (pool.length < totalBoxes) {
        pool.push(1);
    }

    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(
            Math.random() * (i + 1),
        );
        [pool[i], pool[j]] =
            [pool[j], pool[i]];
    }

    const result: Record<number, number> = {};

    for (let i = 0; i < totalBoxes; i++) {
        result[i + 1] = pool[i];
    }

    return result;

}
