"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'
// import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
const [moreDetails, setMoreDetails]=useState<boolean>(true);
const router=useRouter()
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;

    const values = {
      email: target.email.value,
      password: target.password.value,
    };
    try {

      //   const credential = await signIn("credentials", { ...values });
      //   console.log("credential", credential);

    } catch (error) {
      console.log(error);
    }
  }

  async function register(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;

    const values = {
      email: target.email.value,
      password: target.password.value,
      //@ts-ignore
      name: target.name.value,
    };
    try {

      
      router.push('/Register')
      //   const response = await fetch("http://localhost:3000/api/register", {
      //     method: "POST",
      //     body: JSON.stringify(values),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const data = await response.json();
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <Image className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{isLogin ? "Login" : "Sign Up"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={isLogin ? handleSubmit : register} className="space-y-6" action="#" method="POST">
          {!isLogin && <div>
            <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
            <div className="mt-2">
              <input id="userName" name="userName" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              {isLogin && <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>}
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLogin ?"Sign in" :"Continue"}</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          <a onClick={() => setIsLogin((prev) => !prev)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{isLogin ? "You haven't Account? - Sign Up":"You have Account? - Sign In"}</a>
        </p>
      </div>
    </div>

  );
}

type InputLoginProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
};

function InputLogin({ label, ...props }: InputLoginProps) {
  return (
    <>
      <div className="mb-6 w-full">
        <label
          htmlFor="default-input"
          className="block w-[80%] mx-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          {...props}
          className="bg-gray-50 border border-gray-300
           text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500
             block w-[80%] mx-auto p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400
               dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500"
        />
      </div>
    </>
  );
}
