import React, { Fragment, useRef } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";

const ModalWrapper = ({ open, setOpen = () => {}, children }) => {
    const cancelButtonRef = useRef(null);

    return (
        <Transition show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10 w-full"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                {/* Background Overlay */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4 sm:p-0">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                            {/* Modal Content */}
                            <div className="bg-white p-6">{children}</div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalWrapper;
