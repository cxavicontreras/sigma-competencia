type WheelControlsProps = {

    spinning: boolean;

    noBoxes?: boolean;

    onSpin: () => void;

};

export function WheelControls({
    spinning,
    noBoxes = false,
    onSpin,
}: WheelControlsProps) {

    const disabled = spinning || noBoxes;

    const label = spinning
        ? "GIRANDO..."
        : noBoxes
            ? "SIN CAJAS"
            : "GIRAR";

    return (

        <button

            onClick={onSpin}

            disabled={disabled}

            className="
                rounded-xl
                bg-amber-400
                px-8
                py-3
                font-bold
                text-slate-950
                transition-all
                hover:scale-105
                disabled:opacity-50
                disabled:cursor-not-allowed
            "

        >

            {label}

        </button>

    );

}