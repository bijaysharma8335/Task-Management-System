import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../redux/slices/api/authApiSlice";

const UserAvatar = () => {
    const [open, setOpen] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [logoutUser] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };
    return (
        <>
            <div>
                <Menu as="div" className="relative inline-block text-left ">
                    <div>
                        {" "}
                        <MenuButton className="w-10 h-10 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full bg-blue-600">
                            <span className="text-white font-semibold">
                                {user ? getInitials(user?.name) : "U"}
                            </span>
                        </MenuButton>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-in"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <MenuItems
                            static
                            className="absolute right-0 mt-2  w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none"
                        >
                            <div className="p-4">
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setOpen(true)}
                                            className="text-gray-700   group flex w-full items-center rounded-md px-2 py-2 text-base"
                                        >
                                            <FaUser className="mr-2" aria-hidden="true" />
                                            Profile
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setOpenPassword(true)}
                                            className="text-gray-700  group flex w-full items-center rounded-md px-2 py-2 text-base"
                                        >
                                            <FaUserLock className="mr-2" aria-hidden="true" />
                                            Change Password
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={logoutHandler}
                                            className="text-red-600  group flex w-full items-center rounded-md px-2 py-2 text-base"
                                        >
                                            <IoLogInOutline className="mr-2" aria-hidden="true" />
                                            Logout
                                        </button>
                                    )}
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>{" "}
                </Menu>
            </div>
        </>
    );
};

export default UserAvatar;
