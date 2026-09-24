import { TeamCard } from ".";

import { useTeamStore } from "../../../stores";

export function ScoreBoard() {

    const teams = useTeamStore(
        (state) => state.teams,
    );

    const rankedTeams = [...teams].sort(
        (a, b) => b.score - a.score,
    );

    const teamCount = teams.length;

    return (

        <div
            className="
                grid
                flex-1
                min-h-0
                gap-3
                overflow-y-auto
                w-full
            "
            style={{
                gridTemplateRows: `repeat(${Math.max(teamCount, 1)}, minmax(4rem, 1fr))`,
            }}
        >

            {rankedTeams.map((team) => (

                <TeamCard

                    key={team.id}

                    team={team}

                    teamCount={teamCount}

                />

            ))}

        </div>

    );

}
