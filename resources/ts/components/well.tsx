import clsx from "clsx";
import { ReactNode } from "react";

type WellColor = "light" | "dark";

export type WellProps = {
    children: ReactNode;
    color?: WellColor;
    fullWidthOnMobile?: boolean;
};

export default ({
    children,
    color = "light",
    fullWidthOnMobile = false,
}: WellProps): JSX.Element => {
    const className = clsx(
        "overflow-hidden",
        color === "light" && "bg-gray-50",
        color === "dark" && "bg-gray-200",
        fullWidthOnMobile && "sm:rounded-lg",
        !fullWidthOnMobile && "rounded-lg"
    );

    return (
        <div className={className}>
            <div className="px-4 py-5 sm:p-6">{children}</div>
        </div>
    );
};
