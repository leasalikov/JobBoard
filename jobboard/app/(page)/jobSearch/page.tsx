"use client"
// import prisma from "../../../prisma/client";
import { Select, SelectItem } from "@nextui-org/select";

async function searchJobs(values: any) {

    const jobs = await fetch("http://localhost:3000/api/jobs?category=software%7Ceducation&experienceLevel=jonior&location=1")

    return jobs;
}

export default function JobSearch({ searchParams }: any) {

    const jobsToShow = {
        keyword: searchParams.keyword || "",
        location: searchParams.location || "",
        categories: searchParams.categories || "",
        experienceLevel: searchParams.experienceLevel || "",
        jobTypes: searchParams.jobTypes || "",
        salary: searchParams.salary || "",
    };

    const categoryOptions = [
        { value: "software", label: "software" },
        { value: "marketing", label: "merketing" },
        { value: "sales", label: "sales" },
        { value: "AI", label: "AI" },
        { value: "syber", label: "syber" },
        { value: "QA", label: "QA" },
        { value: "hardware", label: "hardware" },
        { value: "finance", label: "finance" },
        { value: "network", label: "network" },
        { value: "operating system", label: "operating system" },
        { value: "information security", label: "information security" },
        { value: "sport", label: "sport" },
        { value: "design", label: "design" },
        { value: "medicine", label: "medicine" },
        { value: "touring", label: "touring" },
    ];

    const experienceLevelOptions = [
        { value: "junior", label: "junior" },
        { value: "mid", label: "mid" },
        { value: "senior", label: "senior" },
    ];

    const jobTypeOptions = [
        { value: "full-time", label: "full time" },
        { value: "part-time", label: "part time " },
        { value: "freelance", label: "freelance" },
    ];

    return (
        <div>
            <h1>search jobs</h1>
            <form method="get">
                <input
                    type="text"
                    name="keyword"
                    placeholder="keyword"
                    defaultValue={jobsToShow.keyword}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="loction"
                    defaultValue={jobsToShow.location}
                />
                <Select
                    selectionMode="multiple"
                    label="category"
                    placeholder="choose category"
                >{categoryOptions.map((category) => (
                    <SelectItem key={category.value}>
                        {category.label}
                    </SelectItem>
                ))}</Select>
                <Select label="experienceLevel"
                    selectionMode="multiple"
                    placeholder="choose experience level"
                >{experienceLevelOptions.map(level => (
                    <SelectItem key={level.value}>
                        {level.label}
                    </SelectItem>
                ))}</Select>
                <Select
                    label="jobType"
                    selectionMode="multiple"
                    placeholder="choose job type"
                >{jobTypeOptions.map(jobType => (
                    <SelectItem key={jobType.value}>
                        {jobType.label}
                    </SelectItem>
                ))}</Select>
                <input
                    type="number"
                    name="salary"
                    placeholder="salary"
                    defaultValue={jobsToShow.salary}
                />
                <button type="submit">search</button>
            </form >

            {/* <div>
                {jobs.map((job: any) => (
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