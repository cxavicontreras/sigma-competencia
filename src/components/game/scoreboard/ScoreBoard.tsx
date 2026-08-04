import { TeamCard } from ".";

import { useTeamStore } from "../../../stores";

export function ScoreBoard() {

    const teams = useTeamStore(
        (state) => state.teams,
    );

    const currentTeam = useTeamStore(
        (state) => state.currentTeam,
    );

    const teamCount = teams.length;

    const gap = Math.max(
        2,
        Math.round(16 * Math.min(1, 3 / teamCount)),
    );

    return (

        <div
            className="
                flex
                flex-1
                min-h-0
                flex-col
                w-full
                pl-2
            "
            style={{ gap: `${gap}px` }}
        >

            {teams.map((team, index) => (

                <TeamCard

                    key={team.id}

                    team={team}

                    teamCount={teamCount}

                    active={
                        index === currentTeam
                    }

                />

            ))}

        </div>

    );

}