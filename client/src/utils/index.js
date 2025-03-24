export function getInitials(fullName) {
    const names = fullName?.split(" ");
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
    const initialStr = initials.join("");

    return initialStr;
}
export const PRIORITYSTYLES = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-blue-600",
};

export const TASK_TYPE = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-600",
    completed: "bg-green-600",
};

export const BGS = ["bg-blue-600", "bg-yellow-600", "bg-red-600", "bg-green-600"];
