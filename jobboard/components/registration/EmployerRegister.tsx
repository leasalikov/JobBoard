"use client";

import React, { FormEvent, useState } from "react";
// import { signIn } from "next-auth/react";

export default function LoginForm() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [moreDetails, setMoreDetails] = useState<boolean>(false);

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
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Your Profile
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={register} className="space-y-6" action="#" method="POST">

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                        <div className="mt-2">
                            <input id="phone" name="phone" type="tel" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    {/* <div>
                        <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
                        <div className="mt-2">
                            <input id="userName" name="userName" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div> */}
                    <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                            </svg>

                            <div>
                                <label className="flex flex-col items-center justify-center w-full h-70 ">
                                    <a className="font-semibold text-indigo-600 hover:text-indigo-500">  Choose image</a>
                                    <input id="add-img" type="file" className="hidden" />
                                </label>
                            </div>

                            {/* <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button> */}
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload CV</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF or DOC</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">Experience</label>
                        <div className="mt-2">
                            <select id="experience" name="experience" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option>No experience</option>
                                <option>1-2 years</option>
                                <option>3-5 years</option>
                                <option>5+ years</option>
                            </select>
                        </div>
                    </div>
                    {/* <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div> */}

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                </form>




                <p className="mt-10 text-center text-sm text-gray-500">
                    You can set and edit your profile information at any time<br />
                    <a href="/home" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Skip</a>

                </p>
            </div>
        </div>

    );
}
