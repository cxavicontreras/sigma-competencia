type Props = {

    question: string;

};

export function QuestionCard({

    question,

}: Props) {

    return (

        <p
            className="
                mt-8
                text-2xl
                text-slate-100
            "
        >
            {question}
        </p>

    );

}