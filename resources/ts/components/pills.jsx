import { NavLink } from "react-router-dom";
import clsx from "clsx";

export const Pills = ({ pills }) => (
    <div>
        <nav className="flex space-x-4" aria-label="Tabs">
            {pills.map((pill) => (
                <Pill pill={pill} key={pill.name} />
            ))}
        </nav>
    </div>
);

export const Pill = ({ pill }) => (
    <NavLink
        key={pill.name}
        to={pill.uri}
        className={({ isActive }) =>
            clsx(
                isActive
                    ? "bg-cyan-600 text-white"
                    : "text-gray-500 hover:text-gray-700",
                "px-3 py-2 font-medium text-sm rounded-md"
            )
        }
        aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        end
    >
        {pill.name}
    </NavLink>
);
