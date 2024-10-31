import prisma from "../../../prisma/client";


 function Candidates({ jobId }: { jobId: string }) {
    // const candidates = await prisma.candidacies.findMany({
    //     where: { jobId: jobId },
    // }
    // )
    return (

        <div className="mt-5">
            <h4 className="text-lg font-semibold">Candidates List</h4>
          
            {/* הצג את המועמדים כאן */}

            <p>jobid={jobId}</p>
        </div>
    );
}

export default Candidates
