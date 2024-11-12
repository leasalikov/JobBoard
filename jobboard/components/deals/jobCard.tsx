
"use client"
import React from "react"
import { useState } from "react";
import Candidates from "./candidates";
import { useSession } from 'next-auth/react';

//category description employerId experienceLevel field id location requirements salary status title type

//props=job
function JobCard({ job }: any) {
    console.log("job", job)
    const [isCandidates, setIsCandidates] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);

    const session = useSession();

    const userImg = session.data?.user?.image as string;
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div key={job.id}
                className="relative w-96 h-96 bg-white shadow-sm border border-slate-200 rounded-lg p-3 pb-6">
                <div className="flex justify-center mb-4 mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 text-purple-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                </div>
                <div className="flex justify-center mb-3">
                    <h2 className="text-slate-800 text-2xl font-semibold">{job.title}</h2>
                </div>
                <div className="p-3 mt-5 border-t border-slate-100 text-center max-h-60 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-slate-100">
                    <p className="block text-slate-600 leading-normal font-light mb-4 max-w-lg">
                        {job.description}</p>
                    <p className="block text-slate-600 leading-normal font-light mb-4 max-w-lg">
                        {job.location}</p>
                    <p>{job.experienceLevel}</p>
                    <p>salary : {job.salary}</p>
                    <button onClick={() => setIsCandidates(!isCandidates)} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        {isCandidates ? 'Hide Candidates' : 'Show Candidates'}
                    </button>
                    {isCandidates && <Candidates jobId={job.id} />}
                    {/* {!isCandidates &&
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <p className="flex justify-center items-center font-bold tracking-tight text-gray-400 sm:text-3xl">You don't have any candidares yet!</p>
                        </div>} */}

                    {/* <button onClick={() => { setApllyJob(!apllyJob) }}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Apply for a job</button> */}
                </div>
            </div>
        </div>
        // <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        //     <article className="flex max-w-xl flex-col items-start justify-between">
        //         <div className="flex items-center gap-x-4 text-xs">
        //             <time dateTime="2020-03-16" className="text-gray-500">Mar 16, 2020</time>
        //             <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Marketing</a>
        //         </div>
        //         <div className="group relative">
        //             <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        //                 job Title:{job.title}
        //             </h3>
        //             <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">category:{job.category}</p>
        //             <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">description:{job.description}</p>
        //             {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">employerId:{job.employerId}</p> */}
        //             <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">experience Level:{job.experienceLevel}</p>
        //             <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">field:{job.field}</p>
        //             {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">jobTitle:{props.jobTitle}</p> */}
        //             <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">location:{job.location}</p>
        //             {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">job Description:{job.jobDescription}</p> */}
        //             <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">status:{job.status}</p>
        //         </div>
        //         <button onClick={()=>setIsCandidates(!isCandidates)} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
        //         {isCandidates ? 'Hide Candidates' : 'Show Candidates'}
        //         </button>
        //         <button onClick={()=>setIsAvailable(!isAvailable)} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
        //         {isCandidates ? 'Job Available' : 'Job Not Available'}
        //         </button>
        //         {isCandidates &&<Candidates jobId={job.id}/>}
        //         <div className="relative mt-8 flex items-center gap-x-4">
        //             <img src={userImg} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
        //             <div className="text-sm leading-6">
        //                 <p className="font-semibold text-gray-900">
        //                     <a href="#">
        //                         <span className="absolute inset-0"></span>
        //                         {session.data?.user?.name}
        //                     </a>
        //                 </p>
        //                 <p className="text-gray-600">Co-Founder / CTO</p>
        //             </div>
        //         </div>
        //     </article>
        // </div>
    )
}

export default JobCard
