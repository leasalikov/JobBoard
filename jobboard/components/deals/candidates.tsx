"use client"
import { Candidacies, JobSearchers } from "@prisma/client";
import prisma from "../../prisma/client";
import { useEffect, useState } from "react";


function Candidates({ jobId }: { jobId: string }) {

    const [candidates, setCandidates] = useState([])

    async function fetchCandidates() {
        const response = await fetch(`http://localhost:3000/api/candidacies?jobId=${jobId}`);
        const candidates = await response.json();
        console.log(candidates.candidacies);

        setCandidates(candidates.candidacies);
    }

    useEffect(() => {
        fetchCandidates()
    }, [])

    return (
        <div className="mt-5">
            <h4 className="text-lg font-semibold">Candidates List</h4>

            {/* Display candidates here */}
            {candidates.length > 0 && candidates.map((candidate: any) => (
                <div className="w-1/3 px-3 mb-6">
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">name: {candidate.user.name}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">email: {candidate.user.email}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">phone: {candidate.user.phone}</p>
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <img src={candidate.user.image as string} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <a href={candidate.user.resume as string}  className="h-10 w-10 rounded-full bg-gray-50" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Candidates