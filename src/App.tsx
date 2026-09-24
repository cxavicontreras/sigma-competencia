import { useEffect, useState } from "react";
import { Dashboard, Splash } from "./pages";
import { QuestionService } from "./services";
import { useCompetitionStore } from "./stores";
import { COMPETITION } from "./config/competition";

import type { Scene } from "./types";

export default function App() {
    const [scene, setScene] = useState<Scene>("splash");

    const initBoxMultipliers = useCompetitionStore(
        state => state.initBoxMultipliers
    );

    useEffect(() => {
        QuestionService.initialize(
            COMPETITION.totalBoxes
        );
        initBoxMultipliers();
        const timer = setTimeout(() => {
            setScene("dashboard");
        }, COMPETITION.splashDuration);

        return () => clearTimeout(timer);
    }, [initBoxMultipliers]);

    switch (scene) {
        case "dashboard":
            return <Dashboard />;

        default:
            return <Splash />;
    }

}
