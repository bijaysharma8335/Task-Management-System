import React from "react";
import { summary } from "../assets/data";
import { FaNewspaper } from "react-icons/fa";
import { MdAdminPanelSettings, MdEdit } from "react-icons/md";

import { FaArrowsToDot } from "react-icons/fa6";

import clsx from "clsx";
import Chart from "../components/Chart";
import { BGS, getInitials, PRIORITYSTYLES, TASK_TYPE } from "../utils";
import UserInfo from "../components/UserInfo";
import moment from "moment";
import { ICONS } from "../constants/icons";
import { useGetDashboardStatisticsQuery } from "../redux/slices/api/taskApiSlice";
import Loading from "../components/Loader";
const TaskTable = ({ tasks }) => {
    const TableHeader = () => (
        <thead className="border-b border-gray-300">
            <tr className="text-black text-left ">
                <th className="py-2">Task Title</th>
                <th className="py-2">Priority</th>
                <th className="py-2">Team</th>
                <th className="py-2 hidden md:block">Created At</th>
            </tr>
        </thead>
    );
    const TableRow = ({ task }) => (
        <tr className="border-b border-gray-300  text-gray-600 hover:bg-gray-300/10">
            <td className="py-2">
                <div className="flex items-center gap-2">
                    <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task?.stage])} />
                    <p className="text-base text-black">{task?.title}</p>
                </div>
            </td>

            <td className="py-2">
                <div className="flex gap-1 items-center ">
                    <span className={clsx("text-lg", PRIORITYSTYLES[task?.priority])}>
                        {ICONS[task.priority]}
                    </span>
                    <span className="capitalize">{task?.priority}</span>
                </div>
            </td>
            <td className="py-2">
                <div className="flex">
                    {task.team.map((member, index) => (
                        <div
                            key={index}
                            className={clsx(
                                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                                BGS[index % BGS.length]
                            )}
                        >
                            <UserInfo user={member} />
                        </div>
                    ))}
                </div>
            </td>

            <td className="py-2 hidden md:block">
                <span className="text-base text-gray-600">{moment(task?.date).fromNow()}</span>
            </td>
        </tr>
    );
    return (
        <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 shadow-md rounded">
            <table className="w-full">
                <TableHeader />
                <tbody>
                    {tasks?.map((task, index) => (
                        <TableRow key={index} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
const UserTable = ({ users }) => {
    const TableHeader = () => (
        <thead className="border-b border-gray-300">
            <tr className="text-black text-left ">
                <th className="py-2">Full Name</th>
                <th className="py-2">Status</th>
                <th className="py-2">Created At</th>
            </tr>
        </thead>
    );
    const TableRow = ({ user }) => (
        <tr className="border-b border-gray-200  text-gray-600 hover:bg-gray-400/10 ">
            <td className="py-2">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
                        <span>{getInitials(user?.name)}</span>
                    </div>
                    <div>
                        <p>{user.name}</p>
                        <span className="text-xs text-black">{user?.role}</span>
                    </div>
                </div>
            </td>
            <td>
                <p
                    className={clsx(
                        "w-fit rounded-full text-sm ",
                        user?.isActive ? "bg-blue-200" : "bg-yellow-100"
                    )}
                >
                    {user?.isActive ? "Active" : "Disabled"}
                </p>
            </td>
            <td className="py-2 text-sm">{moment(user?.createdAt).fromNow()}</td>
        </tr>
    );
    return (
        <div className="w-full md:w-1/3 bg-white px-2 md:px-4 pt-4 shadow-md rounded">
            <table className="w-full ">
                <TableHeader />
                <tbody>
                    {users?.map((user, index) => (
                        <TableRow key={index + user?._id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
const Dashboard = () => {
    const { data, isLoading } = useGetDashboardStatisticsQuery();
    // console.log("data", data);

    if (isLoading)
        return (
            <div className="py-10">
                <Loading />
            </div>
        );

    // const totals = summary.totalTasks;
    const totals = data?.tasks;
    const stats = [
        {
            _id: "1",
            label: "TOTAL TASK",
            total: summary?.totalTasks || 0,
            icon: <FaNewspaper />,
            bg: "bg-[#1d4ed8]",
        },
        {
            _id: "2",
            label: "COMPLTED TASK",
            total: totals["completed"] || 0,
            icon: <MdAdminPanelSettings />,
            bg: "bg-[#0f766e]",
        },
        {
            _id: "3",
            label: "TASK IN PROGRESS ",
            total: totals["in progress"] || 0,
            icon: <MdEdit />,
            bg: "bg-[#f59e0b]",
        },
        {
            _id: "4",
            label: "TODOS",
            total: totals["todo"],
            icon: <FaArrowsToDot />,
            bg: "bg-[#be185d]" || 0,
        },
    ];
    const Card = ({ label, bg, count, total, icon }) => {
        return (
            <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
                <div className="h-full flex flex-1 flex-col justify-between">
                    <p className="text-base text-gray-600">{label}</p>

                    <span className="text-2xl font-semibold">{count}</span>
                    <span className="text-sm text-gray-400 ">{"110 last month"}</span>
                </div>
                <div
                    className={clsx(
                        "w-10 h-10 rounded-full flex  justify-center  items-center text-white",
                        bg
                    )}
                >
                    {icon}
                </div>
            </div>
        );
    };

    return (
        <div className="h-full py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {stats.map(({ icon, bg, label, total }, index) => (
                    <Card key={index} icon={icon} bg={bg} label={label} count={total} />
                ))}
            </div>
            <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
                <h4 className="text-xl text-gray-600 font-semibold"> Chart by priority</h4>
                <Chart data={data?.graphData} />
            </div>

            <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
                {/* /left  */}

                <TaskTable tasks={data?.last10Task} />

                {/* /right */}
                <UserTable users={data?.users} />
            </div>
        </div>
    );
};

export default Dashboard;
