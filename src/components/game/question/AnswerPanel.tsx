type Props = {

    answer: string;

};

export function AnswerPanel({

    answer,

}: Props) {

    return (

        <div
            className="
                mt-8
                rounded-xl
                bg-slate-900
                p-6
            "
        >

            <h3 className="font-bold text-amber-400">

                Respuesta

            </h3>

            <p className="mt-4">

                {answer}

            </p>

        </div>

    );

}