import React from "react";
import ModalWrapper from "./ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Button from "./Button";
import { FaQuestion } from "react-icons/fa";
import clsx from "clsx";

const ConfirmationDialog = ({
    open,
    setOpen,
    msg,
    setMsg = () => {},
    onClick = () => {},
    type = "delete",
    setType = () => {},
}) => {
    const closeDialog = () => {
        setType("delete");
        setMsg(null);
        setOpen(false);
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={closeDialog}>
                <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
                    <DialogTitle as="h3" className="">
                        <p
                            className={clsx(
                                "p-3 rounded-full ",
                                type === "restore" || type === "restoreAll"
                                    ? "text-yellow-600 bg-yellow-100"
                                    : "text-red-600 bg-red-200"
                            )}
                        >
                            <FaQuestion size={60} />
                        </p>
                    </DialogTitle>

                    <p className="text-center text-gray-500">
                        {msg ?? "Are you sure you want to delete the selected record?"}
                    </p>

                    <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4">
                        <Button
                            type="button"
                            className={clsx(
                                " px-8 text-sm font-semibold text-white sm:w-auto",
                                type === "restore" || type === "restoreAll"
                                    ? "bg-yellow-600"
                                    : "bg-red-600 hover:bg-red-500"
                            )}
                            onClick={onClick}
                            label={type === "restore" ? "Restore" : "Delete"}
                        />

                        <Button
                            type="button"
                            className="bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
                            onClick={() => closeDialog()}
                            label="Cancel"
                        />
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
};

export default ConfirmationDialog;
