import React from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";

const AddSubTask = ({ open, setOpen, id }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    console.log("addsub task")
    const submitHandler = () => {};
    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <DialogTitle as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
                    Add SUB TASK{" "}
                </DialogTitle>

                <div className="mt-2 flex flex-col gap-6">
                    <Textbox
                        placeholder="Sub Task Title"
                        type="text"
                        label="Title"
                        name="title"
                        className="w-full rounded"
                        register={register("title", { required: "Title is required" })}
                        error={errors.title ? errors.title.message : ""}
                    />
                    <div className="flex items-center gap-4">
                        <Textbox
                            placeholder="Date"
                            type="date"
                            name="date"
                            label="Task Date"
                            register={register("date", { required: "Date is required!" })}
                            error={errors.date ? errors.date.message : ""}
                        />{" "}
                        <Textbox
                            placeholder="Tag"
                            type="text"
                            name="tag"
                            label="Tag"
                            register={register("tag", { required: "Tag is required!" })}
                            error={errors.tag ? errors.tag.message : ""}
                        />
                    </div>
                </div>
                <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">
                    <Button
                        type="submit"
                        className="bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto"
                        label="Add Task"
                    />
                    <Button
                        type="button"
                        className="bg-white border text-sm font-semibold text-gray-900 sm:w-auto"
                        onClick={() => setOpen(false)}
                        label="Cancel"
                    />
                </div>
            </form>
        </ModalWrapper>
    );
};

export default AddSubTask;
