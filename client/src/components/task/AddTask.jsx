import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../Textbox";
import ModalWrapper from "../ModalWrapper";

const AddTask = ({ open, setOpen }) => {
    const task = "";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [team, setTeam] = useState(task.team || []);
    const submitHandler = () => {};
    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <DialogTitle
                        as="h2"
                        className="text-base font-bold leading-6 text-gray-900 mb-4"
                    >
                        {task ? "UPDATE TASK" : "ADD TASK"}
                    </DialogTitle>
                    <div className="mt-2 flex flex-col gap-6">
                        <Textbox
                            placeholder="Task Title"
                            name="title"
                            type="text"
                            label="Task Title"
                            className="w-full rounded"
                            register={register(
                                register("title", { required: "Title is required" })
                            )}
                            error={errors.title ? errors.title.message : ""}
                        />
                        {/* <UserList setTeam={setTeam} team={team} /> */}

                        <div className="flex gap-4">
                            <div className="w-full">
                                <Textbox
                                    placeholder="Date"
                                    type="date"
                                    name="date"
                                    label="Task Date"
                                    className="w-full rounded"
                                    register={register("date", { required: "Date is required" })}
                                    error={errors.date?errors.date.message:""}
                                />
                            </div>
                        </div>


                    </div>
                </form>
            </ModalWrapper>
        </>
    );
};

export default AddTask;
