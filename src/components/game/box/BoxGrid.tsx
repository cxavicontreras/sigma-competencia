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

    const columns = Math.max(
        1,
        Math.ceil(
            Math.sqrt(COMPETITION.totalBoxes),
        ),
    );

    return (
        <section
            className="
                grid
                h-full
                auto-rows-fr
                gap-3
                p-2
                items-stretch
            "
            style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
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