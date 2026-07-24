type WheelControlsProps = {

    spinning: boolean;

    onSpin: () => void;

};

export function WheelControls({
    spinning,
    onSpin,
}: WheelControlsProps) {

    return (

        <button

            onClick={onSpin}

            disabled={spinning}

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

            {spinning
                ? "GIRANDO..."
                : "GIRAR"}

        </button>

    );

}