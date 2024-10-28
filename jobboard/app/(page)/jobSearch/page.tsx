"use client"
import React from "react";
import Nav from "@/components/section/Nav";
import { useEffect, useState } from "react";
import { MultiSelect } from 'primereact/multiselect';


export default function JobsSearch() {

    // const [jobs, setJobs] = useState([]);
    const jobsToShow = {
        keyword: '',
        category: '',
        location: '',
        experienceLevel: '',
        jobType: '',
        salary: ''
    };


    useEffect(() => {
        searchJobs();
    }, []);


    const searchJobs = async () => {

    };

    const handleInputChange = (event: any) => {
        // setJobsToShow({ ...jobsToShow, [event.target.name]: event.target.value })
    }


    return (
        <div>
            <Nav />


            <p>jobsSearch</p>
            {/* <MultiSelect >

            </MultiSelect> */}
            <div>
                <input
                    type="text"
                    name="keyword"
                    placeholder="keyword"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Where is your next career step taking you?"
                    onChange={handleInputChange}
                />
                <select name="category" onChange={handleInputChange}>
                    <option value="">category</option>
                    <option value="software">software</option>
                    <option value="marketing">marketimg</option>
                    <option value="sales">sales</option>
                </select>
                <select name="experienceLevel" onChange={handleInputChange}>
                    <option value="">experience level</option>
                    <option value="junior">junior</option>
                    <option value="mid">mid</option>
                    <option value="senior">senior</option>
                </select>
                <select name="jobType" onChange={handleInputChange}>
                    <option value="">job type</option>
                    <option value="full-time">full time</option>
                    <option value="part-time">pert time</option>
                    <option value="freelance">freelance</option>
                </select>
                <input
                    type="number"
                    name="salary"
                    placeholder="salary"
                    onChange={handleInputChange}
                />
                <button onClick={searchJobs}>search</button>
            </div>

            {/* <div>
                {jobs.map((job) => (
                    <div key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p>{job.location}</p>
                        <p>{job.experienceLevel}</p>
                        <p>שכר מוצע: {job.salary}</p>
                    </div>
                ))}
            </div> */}
        </div>
    );
}
