export class WheelService {

    public static spin(
    max = 20,
    usedBoxes: number[] = [],
): number {

    const available = [];

    for (let i = 1; i <= max; i++) {

        if (!usedBoxes.includes(i)) {
            available.push(i);
        }

    }

    if (available.length === 0) {
        throw new Error("Ya no quedan cajas disponibles.");
    }

    const randomIndex = Math.floor(
        Math.random() * available.length
    );

    return available[randomIndex];

}

    public static next(current: number, max = 20): number {

        return current >= max
            ? 1
            : current + 1;

    }

}