import React from "react";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ModalWrapper from "./ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";

const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const submitHandler = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning("Password doesn't match");
            return;
        }

        try {
            const res = await changePassword(data).unwrap();
            toast.success("Password changed successfully!");

            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } catch (error) {
            console.log(error);
            toast.error(error.message || error.error);
        }
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <DialogTitle
                        as="h2"
                        className="text-base font-bold leading-6 text-gray-900 mb-4"
                    >
                        Change Password
                    </DialogTitle>

                    <div className="mt-2 flex flex-col gap-6">
                        <Textbox
                            placeholder="New Password"
                            type="password"
                            name="password"
                            label="New Password"
                            className="w-full rounded"
                            register={register("password", {
                                required: "New Password is required!",
                            })}
                            errors={errors.password ? errors.password.message : ""}
                        />
                        <Textbox
                            placeholder="Confirm New Password"
                            type="password"
                            name="cpass"
                            label="Confirm New Password"
                            className="w-full rounded"
                            register={register("cpass", {
                                required: "Confirm New Password is required!",
                            })}
                            errors={errors.cpass ? errors.cpass.message : ""}
                        />
                    </div>
                    {isLoading ? (
                        <div className="py-5">
                            <Loading />
                        </div>
                    ) : (
                        <div className="py-3 mt-4 sm:flex-row-reverse">
                            <Button
                                type="submit"
                                label="Save"
                                className="bg-blue-600 text-white px-8 text-sm font-semibold  hover:bg-blue-800"
                            />
                            <button
                                type="button"
                                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
            </ModalWrapper>
        </>
    );
};

export default ChangePassword;
