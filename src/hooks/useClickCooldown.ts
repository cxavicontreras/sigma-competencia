import { useCallback, useRef } from "react";

export function useClickCooldown(ms = 350) {
    const lastRef = useRef(0);

    return useCallback(
        (action: () => void) => {
            const now = Date.now();
            if (now - lastRef.current < ms) return;
            lastRef.current = now;
            action();
        },
        [ms],
    );
}