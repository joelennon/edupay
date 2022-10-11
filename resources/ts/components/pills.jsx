import { NavLink } from "react-router-dom";
import clsx from "clsx";

export const Pills = ({ pills, appendQuery }) => (
    <div>
        <nav className="flex space-x-4" aria-label="Tabs">
            {pills.map((pill) => (
                <Pill pill={pill} key={pill.name} appendQuery={appendQuery} />
            ))}
        </nav>
    </div>
);

export const Pill = ({ pill, appendQuery = null }) => (
    <NavLink
        key={pill.name}
        to={`${pill.url}${appendQuery ?? ""}`}
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
