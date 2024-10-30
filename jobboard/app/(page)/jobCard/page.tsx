
"use client"
import React from "react"
import { useState } from "react";
import Candidates from "../candidates/page";
import { useSession } from 'next-auth/react';
//category description employerId experienceLevel field id location requirements salary status title type

//props=job
function JobCard({ job }: any) {
    console.log("job",job)
    const [isCandidates, setIsCandidates] = useState(false);
   
    const session = useSession();
    
    const userImg = session.data?.user?.image as string;
    return (
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <article className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime="2020-03-16" className="text-gray-500">Mar 16, 2020</time>
                    <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Marketing</a>
                </div>
                <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        job Title:{job.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">category:{job.category}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">description:{job.description}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">employerId:{job.employerId}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">experienceLevel:{job.experienceLevel}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">field:{job.field}</p>
                    {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">jobTitle:{props.jobTitle}</p> */}
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">location:{job.location}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">job Description:{job.jobDescription}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">status:{job.status}</p>
                </div>
                <button onClick={()=>setIsCandidates(!isCandidates)} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                {isCandidates ? 'Hide Candidates' : 'Show Candidates'}
                </button>
                {isCandidates && <Candidates  jobId={job.id}/>}
                <div className="relative mt-8 flex items-center gap-x-4">
                    <img src={userImg} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                            <a href="#">
                                <span className="absolute inset-0"></span>
                                Michael Foster
                            </a>
                        </p>
                        <p className="text-gray-600">Co-Founder / CTO</p>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default JobCard
