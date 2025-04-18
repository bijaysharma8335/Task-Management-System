import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import TaskDetails from "./pages/TaskDetails";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Trash from "./pages/Trash";
// import Toaster from "sooner";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { setOpenSidebar } from "./redux/slices/authSlice";
import React, { Fragment, useRef } from "react";
import { Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";

import { ToastContainer } from "react-toastify";
function Layout() {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    // user ? (
    return (
        <div className="w-full h-screen flex flex-col md:flex-row">
            <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
                <Sidebar />
            </div>
            {/* Mobile sidebar */}
            <MobileSidebar />
            <div className="flex-1 overflow-y-auto">
                {/* navbar */}
                <Navbar />
                <div className="p-4 2xl:px">
                    <Outlet />
                </div>
            </div>
        </div>
    );
    // ) : (
    //     <Navigate to="/login" state={{ from: location }} replace />
    // );
}

const MobileSidebar = () => {
    const { isSidebarOpen } = useSelector((state) => state.auth);
    const mobileMenuRef = useRef(null);
    const dispatch = useDispatch();
    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };
    return (
        <>
            <Transition
                as={Fragment}
                show={isSidebarOpen}
                enter="transition-opacity  duration-700 "
                enterFrom="opacity-x-10"
                enterTo="opacity-x-100"
                leave="transition-opacity duration-700 "
                leaveFrom=" opacity-x-100"
                leaveTo=" opacity-x-0"
            >
                {(ref) => (
                    <div
                        ref={(node) => (mobileMenuRef.current = node)}
                        className={clsx(
                            "md:hidden w-full h-full bg-black/40 transition-all  duration-700 transform",
                            isSidebarOpen ? "translate-x-0" : "translate-x-full"
                        )}
                        onClick={() => closeSidebar()}
                    >
                        <div className="bg-white w-3/4 h-full ">
                            <div className="w-full flex justify-end px-5 pt-2">
                                <button
                                    onClick={() => closeSidebar()}
                                    className="flex justify-end items-end"
                                >
                                    <IoMdClose size={25} />
                                </button>
                            </div>

                            <div className="mt-10">
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </>
    );
};

function App() {
    return (
        <main className="w-full min-h-screen bg-[#f3f4f6]">
            <Routes>
                <Route element={<Layout />}>
                    <Route index path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<Tasks />} />{" "}
                    <Route path="/completed/:status" element={<Tasks />} />
                    <Route path="/in-progress/:status" element={<Tasks />} />
                    <Route path="/todo/:status" element={<Tasks />} />
                    <Route path="/team" element={<Users />} />
                    <Route path="/trashed" element={<Trash />} />
                    <Route path="/task/:id" element={<TaskDetails />} />
                </Route>

                <Route path="/login" element={<Login />} />
            </Routes>

            <ToastContainer />
        </main>
    );
}

export default App;
