"use client";

import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";



// import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
type User = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    type?: string | null
}


export default function PostJobForm() {
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session)
            router.push('/Login')
        // const { type } = session.data?.user as User
        // if (type!="employer") 
        //     alert()

    }, [session])
    const details = [
        { name: "geographicalLocation", label: "geographical Location" },
        { name: "requiredExperienceLevel", label: "required Experience Level" },
        { name: "salaryOffered", label: "salary Offered" },
        { name: "jobType", label: "job Type" },
        { name: "field", label: "field" },
        { name: "jobTitle", label: "job Title" },
        { name: "jobDescription", label: "job Description" },
        { name: "requirements", label: "requirements" },
        { name: "status", label: "status" }
    ]
    async function postjob(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.currentTarget;
        const values = {
            location: target.geographicalLocation.value,
            experienceLevel: target.requiredExperienceLevel.value,
            salary: target.salaryOffered.value,
            category: target.jobType.value,
            field: target.field.value,
            title: target.jobTitle.value,
            requirements: target.requirements.value,
            type: "",
            description: target.jobDescription.value,
            status: target.status.value,
            employerEmail:session.data?.user?.email
        };
        try {
            const response = await fetch("http://localhost:3000/api/jobs", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <Image className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Post New Job
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={postjob} className="space-y-6" action="#" method="POST">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {details.map((i, index) =>
                            <div key={index}>
                                <label htmlFor={details[index].name} className="block text-sm font-medium leading-6 text-gray-900">{details[index].label}</label>
                                <div className="mt-2">
                                    <input id={details[index].name} name={details[index].name} type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        )}
                    </div>

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

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600">post</button>
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


