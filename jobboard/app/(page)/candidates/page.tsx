"use client"
import prisma from "../../../prisma/client";


async function Candidates({ jobId }: { jobId: string }) {

    const response = await fetch(`http://localhost:3000/api/candidacies?jobId=${jobId}`);
    const candidates = await response.json();
    console.log(candidates);

    return (
        <div className="mt-5">
            <h4 className="text-lg font-semibold">Candidates List</h4>

            {/* Display candidates here */}
            {candidates.map((candidate: any) => (
                <div className="w-1/3 px-3 mb-6">
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">name: {candidate.user.name}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">email: {candidate.user.email}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">phone: {candidate.user.phone}</p>
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <img src={candidate.user.image as string} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Candidates