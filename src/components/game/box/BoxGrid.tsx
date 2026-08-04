import { Box } from "./Box";
import { COMPETITION } from "../../../config/competition";
import { useCompetitionStore } from "../../../stores";

type BoxGridProps = {
    onBoxSelect?: (box: number) => void;
};

export function BoxGrid({ onBoxSelect }: BoxGridProps) {

    const boxes = Array.from(
        { length: COMPETITION.totalBoxes },
        (_, index) => index + 1,
    );

    const boxMultipliers = useCompetitionStore(
        state => state.boxMultipliers
    );

    const selectedBox = useCompetitionStore(
        state => state.selectedBox
    );

    const usedBoxes = useCompetitionStore(
    state => state.usedBoxes
);

    return (
        <section
            className="
                grid
                h-full
                grid-cols-5
                gap-3
                p-4
                place-items-center
            "
        >
            {boxes.map((number, index) => (
                <Box
                    key={number}
                    number={number}
                    delay={index * 0.04}
                    active={selectedBox === number}
                    used={usedBoxes.includes(number)}
                    multiplier={
                        boxMultipliers[number] ?? 1
                    }
                    onSelect={onBoxSelect}
                />
            ))}
        </section>
    );
}