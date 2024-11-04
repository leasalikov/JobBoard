"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';

import { FaGoogle } from "react-icons/fa"
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from "@nextui-org/react";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isJobSearcher, setIsJobSearcher] = useState<boolean>(true);
  const session = useSession();
  const router = useRouter()
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;
    const values = {
      email: target.email.value,
      password: target.password.value,
    };
    try {
      const credential = await signIn("credentials", { ...values, callbackUrl: "/" });
      console.log("credential", credential);
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
      name: target.username.value,
      username: "",
      phone: "",
      status: "",
      type: ""
    };
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      const SignInvalues = {
        email: target.email.value,
        password: target.password.value,
      };
      try {
        const credential = await signIn("credentials", { ...SignInvalues, callbackUrl: "/app/Register" });
        console.log("credential", credential);
      } catch (error) {
        console.log(error);
      }
      // router.push('/Register')

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
        <Tabs
          className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          fullWidth
          placement="top"
          size="lg"
          aria-label="Tabs form"
          onSelectionChange={() => setIsJobSearcher(!isJobSearcher)}
        >
          <Tab className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
            key="jobSearcherrlogin" title="job searcher"></Tab>
          <Tab className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
            key="employerlogin" title="employer">
          </Tab>
        </Tabs>

        <form onSubmit={isLogin ? handleSubmit : register} className="space-y-6" action="#" method="POST">
          {!isLogin && <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
            <div className="mt-2">
              <input id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLogin ? "Sign in" : "Continue"}</button>
          </div>
        </form>
        <div className="flex w-full flex-col justify-center items-center gap-4">
          {!isLogin && <button
            onClick={async () => {
           signIn("google signUp")
          //  alert(session?.data?.user?.email)
              try {
                await fetch(`http://localhost:3000/api/users/${session?.data?.user?.email}`, {
                  method: "PATCH",
                  body: JSON.stringify({ type: isJobSearcher ? "jobSearcher" : "employer" }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
            router.push('/Register')

            } catch (error) {
              console.log(error);
            }
      
          
            }}
            className="flex w-[80%] items-center justify-center bg-white
         dark:bg-gray-900 border border-gray-300 rounded-lg 
         shadow-md px-6 py-2 text-sm font-medium text-gray-800
          dark:text-white hover:bg-gray-200 focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FaGoogle className="h-6 w-6 mr-2" />
            <span>Continue with Google</span>
          </button>}

          {isLogin &&
            <button
              onClick={() => signIn("google signIn", { callbackUrl: "/" })}
              className="flex w-[80%] items-center justify-center bg-white
         dark:bg-gray-900 border border-gray-300 rounded-lg 
         shadow-md px-6 py-2 text-sm font-medium text-gray-800
          dark:text-white hover:bg-gray-200 focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <FaGoogle className="h-6 w-6 mr-2" />
              <span>Continue with Google</span>
            </button>}
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          <a onClick={() => setIsLogin((prev) => !prev)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{isLogin ? "You haven't Account? - Sign Up" : "You have Account? - Sign In"}</a>
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
