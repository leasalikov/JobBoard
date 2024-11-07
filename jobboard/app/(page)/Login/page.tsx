"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"
import { Tabs, Tab } from "@nextui-org/react";
import forgotPassword from "../forgotPassword/page";
import Cookies from 'js-cookie';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isJobSearcher, setIsJobSearcher] = useState<boolean>(false);

  useEffect(() => {
    Cookies.set('user-type',
      isJobSearcher ? "jobsearcher" : "employer")
    return () => Cookies.remove('user-type');
  }, [isJobSearcher]);

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
      name: target.username.value,
      username:"",
      phone: "",
      status: "",
      type: isJobSearcher ? "jobsearcher" : "employer"
    };
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const data = await response.json();
      const SignInvalues = {
        email: target.email.value,
        password: target.password.value,
      };
      try {
        const credential = await signIn("credentials", { ...SignInvalues, callbackUrl: "/../Register" });
        console.log("credential", credential);
      } catch (error) {
        console.log(error);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className=" justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Tabs
          variant="underlined"
          placement="top"
          size="lg"
          aria-label="Tabs form"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-indigo-600",
            tab: "max-w-fit px-0 h-12",
            // tabContent: "group-data-[selected=true]:text-indigo-600"
          }}
          onSelectionChange={() => setIsJobSearcher(!isJobSearcher)}
        >
          <Tab className="flex items-center space-x-2" key="jobSearcherrlogin" title="job searcher"></Tab>
          <Tab className="flex items-center space-x-2" key="employerlogin" title="employer"></Tab>


        </Tabs>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">{isJobSearcher ? "Job searcher " : "Employer "}{isLogin ? "login" : "sign up"}
          </h2>
        </div>
        <form onSubmit={isLogin ? handleSubmit : register} className="space-y-6" action="#" method="POST">
          {!isLogin &&
            <InputLogin
              label="User Name"
              type="text"
              id="username"
              name="username"
            />}

          <InputLogin
            label="Email address"
            type="email"
            id="email"
            name="email"
          />

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              {isLogin && <div className="text-sm">
                <a href="/forgotPassword" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
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
          <button
            onClick={() =>{isLogin ?signIn("google", { callbackUrl: "/" }):signIn("google", { callbackUrl: "/Register" })} }
            className="flex w-[80%] items-center justify-center bg-white
         dark:bg-gray-900 border border-gray-300 rounded-lg 
         shadow-md px-6 py-2 text-sm font-medium text-gray-800
          dark:text-white hover:bg-gray-200 focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FaGoogle className="h-6 w-6 mr-2" />
            <span>Continue with Google</span>
          </button>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          <a href="#" onClick={() => setIsLogin((prev) => !prev)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{isLogin ? "You haven't Account? - Sign Up" : "You have Account? - Sign In"}</a>
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
};

function InputLogin({ label, ...props }: InputLoginProps) {
  return (
    <>
      <div>
        <label htmlFor={props.name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <div className="mt-2">
          <input {...props} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
    </>
  );
}
