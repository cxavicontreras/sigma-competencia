import { TeamCard } from ".";

import { useTeamStore } from "../../../stores";

export function ScoreBoard() {

    const teams = useTeamStore(
        state => state.teams
    );

    const currentTeam = useTeamStore(
        state => state.currentTeam
    );

    return (

        <div
            className="
                flex
                flex-col
                gap-4
                w-full
            "
        >

            {

                teams.map((team, index) => (

                    <TeamCard

                        key={team.id}

                        team={team}

                        active={
                            index === currentTeam
                        }

                    />

                ))

            }

        </div>

    );

}