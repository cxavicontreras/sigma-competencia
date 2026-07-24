import type { PropsWithChildren } from "react";

type GlassCardProps = PropsWithChildren<{
    className?: string;
}>;

export function GlassCard({
    children,
    className = "",
}: GlassCardProps) {
    return (
        <div
            className={`
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(0,0,0,.35)]
                ${className}
            `}
        >
            {children}
        </div>
    );
}