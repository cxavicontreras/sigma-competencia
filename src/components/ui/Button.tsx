import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "danger";

type ButtonProps =
    ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: ButtonVariant;
    };

const variants: Record<ButtonVariant, string> = {
    primary:
        "bg-amber-400 text-slate-950 hover:bg-amber-300",

    secondary:
        "bg-slate-700 hover:bg-slate-600 text-white",

    danger:
        "bg-red-600 hover:bg-red-500 text-white",
};

export function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={`
                cursor-pointer
                rounded-xl
                px-5
                py-3
                font-semibold
                transition-all
                duration-300
                active:scale-95
                hover:scale-105
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
}