import React from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { MdDelete, MdOutlineRestore } from "react-icons/md";
import { PRIORITYSTYLES, TASK_TYPE } from "../utils";
import { tasks } from "../assets/data";
import clsx from "clsx";
import { ICONS } from "../constants/icons";

const Trash = () => {
    const TableHeader = ({ item }) => (
        <thead className="border-b border-gray-300">
            <tr className="text-black text-left">
                <th className="py-2">Task Title</th>
                <th className="py-2">Priority</th>
                <th className="py-2">Stage</th>
                <th className="py-2 line-clamp-1">Modified On</th>
            </tr>
        </thead>
    );

    const TableRow = ({ item }) => (
        <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
            <td className="py-2">
                <div className="flex items-center gap-2">
                    <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])} />
                    <p className="w-full line-clamp-2 text-base text-black">{item.title}</p>
                </div>
            </td>

            <td className="py-2 capitalize">
                <div className="flex gap-1 items-center">
                    <span className={clsx("text-lg ", PRIORITYSTYLES[item.priority])}>
                        {ICONS[item.priority]}
                    </span>
                    <span>{item.priority}</span>
                </div>
            </td>
            <td className="py-2 capitalize text-center md:text-start">{item.stage}</td>
            <td className="py-2 text-sm">{new Date(item.date).toDateString()}</td>

            <td className="py-2 flex gap-1 justify-end">
                <Button icon={<MdOutlineRestore className="text-xl text-gray-500" />} />
                <Button icon={<MdDelete className="text-xl text-red-600" />} />
            </td>
        </tr>
    );
    return (
        <>
            <div className="w-full md:px-1 px-0 mb-6">
                <div className="flex items-center justify-between mb-8">
                    <Title title="Trashed Tasks" />

                    <div className="flex gap-2 md:gap-4 items-center">
                        <Button
                            label="Restore All"
                            icon={<MdOutlineRestore className="  text-lg hidden" />}
                            className={
                                "flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5"
                            }
                        />

                        <Button
                            label="Delete All"
                            icon={<MdDelete className="  text-lg hidden" />}
                            className={
                                "flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5"
                            }
                        />
                    </div>
                </div>

                <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
                    <div className="overflow-x-auto">
                        <table className="w-full mb-5">
                            <TableHeader />
                            <tbody>
                                {tasks.map((task, index) => (
                                    <TableRow item={task} key={index} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trash;
