import { DarkThemeToggle } from "flowbite-react";
import { useState } from "react";
import Response from "../components/Response";
import { useReadQuery, useUserLogoutMutation } from "../features/api/apiSlice";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("keradion_user"));
  const {
    data: invoices,
    isFetching: invoicesIsFetching,
    isError: invoicesIsError,
  } = useReadQuery({
    url: `/user/invoices?saver[eq]=${user?.user?._id}&populatingType=invoices&populatingValue=company,saver`,
    tag: ["invoices", "company"],
  });

  const [pending, setPending] = useState(false);
  const [logout, logoutResponse] = useUserLogoutMutation();

  const logoutHandler = () => {
    logout({});
  };

  return (
    <div className="fixed w-full z-50 bg-white bg-dark">
      <Response
        response={logoutResponse}
        setPending={setPending}
        redirectTo="/"
        type="logout"
      />
      <div className="flex lg:hidden fixed top-0 left-0 z-50 flex-col items-center w-full h-auto py-10 ">
        <div className="flex bg-white bg-dark -mt-12 justify-between items-center px-2 h-full w-full">
          <p className="text-lg font-bold text-main">KERADION</p>
          {user ? (
            <div className="flex items-center gap-3">
              <p className="px-2 hidden lg:block py-1 rounded-xl bg-main">
                {user.email.split("@")[0]}
              </p>
              <a href={`/dashboard`} className="cursor-pointer">
                Dashboard
              </a>

              <a href={`/dashboard/invoices`} className="cursor-pointer">
                <div className="items-center flex flex-col justify-center">
                  <button
                    type="button"
                    class="relative inline-flex items-center text-sm font-medium text-center"
                  >
                    <svg
                      class="w-7 h-7"
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
                  </button>
                </div>
              </a>
            </div>
          ) : (
            <div className="flex relative gap-4">
              <div className="">
                <a
                  href="/login"
                  onClick={() => setLoginForm(!loginForm)}
                  className={`cursor-pointer px-3 h-[70px] absolute -top-5 hover:text-white pt-5 -left-[70px] flex `}
                >
                  Login
                  <svg
                    className="w-2.5 h-2.5 mt-1.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </a>
              </div>
              <p className="text-gray-600">|</p>
              <div className="relative">
                <a href="/signup" className="cursor-pointer">
                  Register
                </a>
              </div>
            </div>
          )}

          <svg
            onClick={() => {
              const id = document.getElementById("header-mobile");
              id?.classList?.remove("hidden");
              id?.classList?.add("flex");
            }}
            class="w-10 h-10 text-gray-800 dark:text-white"
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

        <div
          id="header-mobile"
          className="h-[100vh] hidden w-full bg-white bg-dark fixed top-0 left-0 z-50 items-center justify-center flex-col"
        >
          <svg
            onClick={() => {
              const id = document.getElementById("header-mobile");
              id?.classList?.add("hidden");
              id?.classList?.remove("flex");
            }}
            class="w-6 h-6 text-gray-800 dark:text-white absolute top-4 right-4 cursor-pointer"
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
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>

          <ul className="py-5 h-[100vh] overflow-y-scroll w-full">
            <li className="mt-10" role="presentation">
              <a
                href="/"
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Home
              </a>
            </li>
            <li className="" role="presentation">
              <a
                href="/dashboard/invoices"
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Invoices
              </a>
            </li>

            <div className="flex items-center hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3">
              <DarkThemeToggle /> <p>Light mode</p>
            </div>
            <li className="" role="presentation">
              <p
                onClick={logoutHandler}
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Logout
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="w-full flex flex-col lg:flex-row "></div>

        <div className="w-full text-sm text-white py-[5px] lg:px-[18%] bg-[rgb(5,4,4)] flex gap-4 justify-between items-center">
          <div className="flex w-full items-center gap-2 justify-end">
            {user ? (
              <div className="flex items-center gap-5">
                <p className="px-2 py-1 rounded-xl bg-main">
                  {user.email.split("@")[0]}
                </p>
                <a href={`/dashboard`} className="cursor-pointer">
                  Dashboard
                </a>
                <a
                  href={`/dashboard/${user?.role}/invoices`}
                  className="cursor-pointer"
                >
                  <div className="items-center flex flex-col justify-center">
                    <button
                      type="button"
                      class="relative inline-flex items-center p-1s text-sm font-medium text-center t"
                    >
                      <svg
                        class="w-7 h-7"
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
                    </button>
                  </div>
                </a>
                <p onClick={logoutHandler} className="cursor-pointer">
                  Logout
                </p>
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="relative">
                  <a
                    href="/login"
                    // onMouseOver={() => setLoginForm(true)}
                    className={`cursor-pointer bg-gray-900 px-3 h-12 absolute -top-3 pt-3 -left-[70px] flex `}
                  >
                    Login
                    <svg
                      className="w-2.5 h-2.5 mt-1.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </a>
                </div>
                <p className="text-gray-600">|</p>
                <div className="relative">
                  <a href="/signup" className="cursor-pointer">
                    Register
                  </a>
                </div>
              </div>
            )}
            <div className="top-2 right-2 z-50">
              <DarkThemeToggle />
            </div>
          </div>
        </div>

        {/* tabs desktop header nav */}

        <div className="border-b relative shadow-2xl  py-2 md:py-1 border-gray-200 dark:border-gray-700">
          <ul
            className="flex relative z-40  gap-1 flex-wrap items-center justify-center -mb-px text-sm font-medium text-center"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            <li className="me-2">
              <div className="flex items-center justify-center gap-6">
                {/*  */}
                <div className="flex absolute z-20 shadow-sm -top-[50px] left-[8%] h-auto w-[120px] gap-3 items-center justify-center">
                  <div className="text-xl text-main font-bold">KERADION</div>
                </div>
              </div>
            </li>
            <li className="me-2 ml-[20%] xl:ml-12" role="presentation">
              <a
                href="/"
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                Home
              </a>
            </li>
            <li className="me-2 ml-2" role="presentation">
              <a
                href={`/dashboard/${user?.role}/invoices`}
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                Invoices
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
