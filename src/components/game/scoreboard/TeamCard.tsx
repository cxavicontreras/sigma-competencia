import { motion } from "framer-motion";

import type { Team } from "../../../types";

type Props = {

    team: Team;

    active: boolean;

};

export function TeamCard({

    team,

    active,

}: Props) {

    return (

        <motion.div
        className="rounded-3xl"
    animate={
        active
            ? {
                  boxShadow: [
                      "0 0 10px rgba(251,191,36,.3)",
                      "0 0 30px rgba(251,191,36,.8)",
                      "0 0 10px rgba(251,191,36,.3)",
                  ],
              }
            : {
                  boxShadow: "0 0 0px rgba(251,191,36,0)",
              }
    }
    transition={{
        duration: 1.5,
        repeat: active ? Infinity : 0,
    }}
>


            <h2
                className="
                    text-xl
                    font-bold
                    text-amber-400
                "
            >

                {team.name}

            </h2>

            <p
                className="
                    mt-3
                    text-5xl
                    font-black
                    text-white
                "
            >

                {team.score}

            </p>

            <p
                className="
                    text-slate-400
                "
            >

                puntos

            </p>

            <p
                className="
                    mt-2
                    text-sm
                    text-cyan-300
                "
            >

                x{team.multiplier}

            </p>

        </motion.div>

    );

}