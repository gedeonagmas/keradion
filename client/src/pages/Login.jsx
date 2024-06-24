import React, { useState } from "react";
import LoadingButton from "../components/loading/LoadingButton";
import { useUserLoginMutation } from "../features/api/apiSlice";
import Response from "../components/Response";

const Login = () => {
  const [loginData, loginResponse] = useUserLoginMutation();
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    loginData({ email, password });
  };

  return (
    <section class="bg-gray-500 px-5 w-full h-full flex items-center justify-center dark:bg-gray-900">
      <Response response={loginResponse} setPending={setPending} type="login" />{" "}
      <div class="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0">
        <div class="w-[375px] md:w-[400px] bg-white px-5 rounded-lg shadow dark:border xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="px-4 py-4">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <a href="/" className="text-xl absolute left-5 top-2 font-bold">
              <svg
                class="w-6 h-6 text-white"
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
            </a>

            <div class="space-y-4 md:space-y-6 mt-4" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <LoadingButton
                pending={pending}
                onClick={loginHandler}
                title="Login"
                color="bg-blue-500"
                width="w-full"
              />
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an Account?{" "}
                <a
                  href="/Signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register Now
                </a>
              </p>
              <a
                href="/forget"
                class="font-medium text-blue-500 text-primary-600 hover:underline dark:text-primary-500"
              >
                Forget Password
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
