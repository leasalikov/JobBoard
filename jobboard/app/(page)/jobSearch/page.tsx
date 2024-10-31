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
        // const arr = values.map((value: any) => value != '')
        // console.log('values222      ' + arr)
        const queryString = Object.entries(values)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`)
            .join('&');
        console.log('queryString       ' + queryString)
        // const response = await fetch("http://localhost:3000/api/jobs?category=software&experienceLevel=junior&salary=25000")
        const response = await fetch(`http://localhost:3000/api/jobs?${queryString}`);
        console.log(response)
        const data = await response.json();
        console.log('Response data:', data);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return data;
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
        <div>
            <h1>search jobs</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="keyword"
                    placeholder="keyword"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="loction"
                />
                <Select
                    selectionMode="multiple"
                    label="category"
                    placeholder="choose category"
                    onSelectionChange={(selectedItems: any) => handleSelectionChange("categories", selectedItems)}
                >
                    {categoryOptions.map((category) => (
                        <SelectItem key={category.value}>
                            {category.label}
                        </SelectItem>
                    ))}
                </Select>
                <label>choose experience level</label>
                <select name="experienceLevel"
                    defaultValue={selectedValues.experienceLevel}
                >{experienceLevelOptions.map((level: any) => (
                    <option key={level.value} value={level.value}>
                        {level.label}
                    </option>
                ))}</select>
                <Select
                    label="jobType"
                    selectionMode="multiple"
                    placeholder="choose job type"
                    onSelectionChange={(items: any) => handleSelectionChange('jobTypes', items)}
                >{jobTypeOptions.map((jobType: any) => (
                    <SelectItem key={jobType.value}>
                        {jobType.label}
                    </SelectItem>
                ))}</Select>
                <input
                    type="number"
                    name="salary"
                    placeholder="salary"
                />
                <button type="submit">search</button>
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
    );

}

