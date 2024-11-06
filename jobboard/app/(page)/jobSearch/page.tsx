"use client"
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";

export default function JobSearch() {

    const [jobsToShow, setJobsToShow] = useState([]);

    const handleSelectionChange = (key: string, selectedItems: any) => {
        console.log(selectedItems)
        // const itemsArray = Array.isArray(selectedItems) ? selectedItems : Object.values(selectedItems);
        setSelectedValues((prev: any) => ({
            ...prev,
            [key]: Array.isArray(selectedItems) ? selectedItems : [selectedItems]
        }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());
        values.categories = selectedValues.categories.map((categorySet: any) =>
            Array.from(categorySet).join(',')).join(',');
        values.jobTypes = selectedValues.jobTypes.map((jobTypeSet: any) =>
            Array.from(jobTypeSet).join(',')).join(',');
        const jobs = await searchJobs(values);
        console.log(jobs)
        setJobsToShow(jobs)
    };


    async function searchJobs(values: any) {
        console.log(typeof values)
        console.log('values     ' + values)
        const queryString = Object.entries(values)
            .map(([key, value]) => value ?
                `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
                : '')
            .filter(Boolean)
            .join('&');
        console.log('queryString ' + queryString);
        const response = await fetch("http://localhost:3000/api/jobs?category=software&experienceLevel=junior&salary=25000")
        console.log(response)
        const data = await response.json();
        console.log('Response data:', data);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return data.jobs;
    }


    const [selectedValues, setSelectedValues] = useState({
        keyword: "",
        location: "",
        categories: [],
        experienceLevel: "",
        jobTypes: [],
        salary: ""
    });


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
        { value: "lead", label: "lead" },
    ];

    const jobTypeOptions = [
        { value: "full-time", label: "full time" },
        { value: "part-time", label: "part time " },
        { value: "freelance", label: "freelance" },
    ];


    return (
        <>
            <br />
            <br />
            <br />
            <div
                className="relative flex h-[calc(100vh-2rem)] w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        name="keyword"
                        placeholder="Keyword"
                    />
                    <input
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        name="location"
                        placeholder="Loction"
                    />
                    <Select
                        selectionMode="multiple"
                        label="Category"
                        placeholder="choose category"
                        onSelectionChange={(selectedItems: any) => handleSelectionChange("categories", selectedItems)}
                        className="block rounded-md h-12 border-0 text-gray-900 placeholder:text-gray-400 
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mt-10 pb-0 mr-4"
                    >
                        {categoryOptions.map((category) => (
                            <SelectItem key={category.value}>
                                {category.label}
                            </SelectItem>
                        ))}
                    </Select>
                    {/* className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" */}

                    <Select
                        label="Experience level"
                        selectionMode="single"
                        placeholder="choose level"
                        onSelectionChange={(items: any) => handleSelectionChange('experienceLevel', items)}
                        className="block rounded-md h-12 border-0 text-gray-900 placeholder:text-gray-400 
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mt-10 mr-4"
                    >{experienceLevelOptions.map((level: any) => (
                        <SelectItem key={level.value}>
                            {level.label}
                        </SelectItem>
                    ))}</Select>
                    <Select
                        className="block rounded-md h-12 border-0 text-gray-900 placeholder:text-gray-400 
                        focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mt-10 mr-4"                        label="jobType"
                        selectionMode="multiple"
                        placeholder="choose job type"
                        onSelectionChange={(items: any) => handleSelectionChange('jobTypes', items)}
                    >
                        {jobTypeOptions.map((jobType: any) => (
                            <SelectItem key={jobType.value}>
                                {jobType.label}
                            </SelectItem>
                        ))}</Select>
                    <input
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="number"
                        name="salary"
                        placeholder="salary" />
                    <br />
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">search</button>
                </form >
                <div>
                    {jobsToShow && jobsToShow.map((job: any) => (
                        <div key={job.id}>
                            <h2>{job.title}</h2>
                            <p>{job.description}</p>
                            <p>{job.location}</p>
                            <p>{job.experienceLevel}</p>
                            <p>salary : {job.salary}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

