import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Logout } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Outlet } from "react-router-dom";
import callCenterImage from "../assets/promotion.avif";
import { useReadQuery, useUserLogoutMutation } from "../features/api/apiSlice";
import Response from "../components/Response";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("keradion_user"));

  const {
    data: invoices,
    isFetching: invoicesIsFetching,
    isError: invoicesIsError,
  } = useReadQuery({
    url: `/user/invoices?user[eq]=${user?.user?._id}`,
    tag: ["invoices"],
  });

  const [logout, logoutResponse] = useUserLogoutMutation();
  const [pending, setPending] = useState(false);
  const logoutHandler = () => {
    logout({});
  };

  const sidebarHandler = (type) => {
    const id = document.getElementById("logo-sidebar");
    // console.log(id, "ids");
    id?.classList?.value.includes("hidden") && type === "auto"
      ? id?.classList?.remove("hidden")
      : id?.classList?.add("hidden");
  };

  return (
    <div>
      <nav class="fixed top-0 z-50 w-full bg-white bg-dark border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <Response
          response={logoutResponse}
          setPending={setPending}
          redirects="/"
          type="logout"
        />
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex flex-col font-light w-full justify-between items-center">
              <div className="text-sm hidden xl:flex flex-col   absolute  items-center left-2  text-gray-600 ">
                <p className="text-lg ">Welcome to Keradion Design</p>
                <a
                  href="/"
                  className="flex items-center cursor-pointer gap-2 hover:text-gray-800"
                >
                  <svg
                    class="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14M5 12l4-4m-4 4 4 4"
                    />
                  </svg>
                  <p className="">back to home</p>
                </a>
              </div>
              <div class="flex items-center w-full justify-end ms-3">
                <div
                  onClick={() => sidebarHandler("auto")}
                  className="lg:hidden cursor-pointer absolute left-2 self-start"
                >
                  <svg
                    class="w-8 h-8 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M5 7h14M5 12h14M5 17h10"
                    />
                  </svg>
                </div>

                <div className="flex relative gap-3 text-xs lg:gap-6 lg:mr-10 self-end items-center">
                  <a
                    href="/"
                    className="items-center cursor-pointer flex flex-col justify-center "
                  >
                    <svg
                      class="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p className="text-xs font-semibold">home</p>
                  </a>

                  <a
                    href={`/dashboard/${user?.role}/invoices`}
                    className="cursor-pointer"
                  >
                    <div className="items-center flex flex-col justify-center">
                      <button
                        type="button"
                        class="relative flex flex-col items-center text-sm font-medium text-center"
                      >
                        <svg
                          class="w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                        </svg>

                        {invoices?.data?.length > 0 && (
                          <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs p-1 font-bold text-white bg-main border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                            {invoices?.data?.length}
                          </div>
                        )}
                        <p className="text-xs font-semibold">Invoices</p>
                      </button>
                    </div>
                  </a>
                </div>
                <div className="flex ml-3 gap-2 -mt-2 lg:mt-0 items-center">
                  <button
                    onClick={() => {
                      const id = document.getElementById("dropdown-user");
                      id?.classList?.value?.includes("hidden")
                        ? id?.classList.remove("hidden")
                        : id?.classList.add("hidden");
                    }}
                    type="button"
                    class="flex text-sm rounded-full lg:w-[160px] border-2 border-gray-300 border-dark focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <div className="flex w-full gap-2 items-center">
                      {user?.profilePicture?.length > 1 ? (
                        <img
                          class="w-10 h-10 rounded-full"
                          src={user?.profilePicture}
                          alt="photo"
                        />
                      ) : (
                        <div className="w-12 h-12 p-1 text-lg font-bold rounded-full flex items-center justify-center bg-main text-white text-center">
                          {user?.email?.substring(0, 1)}
                        </div>
                      )}

                      <p className="hidden lg:block text-sm font-bold">
                        {user?.role}
                      </p>
                      <div className="p-1">
                        <svg
                          class="w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m8 10 4 4 4-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
                <div
                  class="z-50 absolute shadow-lg border top-14 right-3 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div class="px-4 py-3" role="none">
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {user?.email}
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li>
                      <a
                        href={`/dashboard/change-password`}
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Security
                      </a>
                    </li>
                    <li>
                      <p
                        onClick={logoutHandler}
                        class="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Log out
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        class="fixed hidden lg:block top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white bg-dark dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <a href="/" class="flex flex-col ms-2 md:me-24">
              <p className="text-2xl font-bold text-main">KERADION</p>
              <p className="text-2xl font-bold text-main">DESIGN</p>
              <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"></span>
            </a>
            <li onClick={() => sidebarHandler("off")}>
              <a
                href={`/dashboard/${user?.role}`}
                class="flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <DashboardIcon className="" />
                <span class="ms-3">Overview</span>
              </a>
            </li>

            <li>
              <a
                href={`/dashboard/${user?.role}/invoices`}
                class="flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Invoices</span>
              </a>
            </li>

            {user?.role === "admin" && (
              <li>
                <a
                  href="/dashboard/admin/users"
                  class="flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    class="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                    />
                  </svg>

                  <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
                </a>
              </li>
            )}
            <li>
              <a
                href={`/dashboard/${user?.role}/profile`}
                class="flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </a>
            </li>

            <li>
              <a
                href="/dashboard/message"
                class="flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Messaging</span>
              </a>
            </li>

            <li
              onClick={logoutHandler}
              className="text-gray-500  hover:text-gray-900"
            >
              <p
                href="#"
                class="flex cursor-pointer items-center  rounded-lg dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Logout className="" />
                <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </p>
            </li>
          </ul>
        </div>
      </aside>

      <div
        onClick={() => sidebarHandler("off")}
        class="pl-4 pt-4 mt-20  bg-dark bg-whites lg:ml-64"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
