import prisma from "../../../prisma/client";


function Candidates({jobId}:any) {
async function Candidates({id}:{id:string}) {
    const candidates=await prisma.candidacies.findMany( {
        where:{jobId:id},
       }
    )
  return (

        <div className="mt-5">
            <h4 className="text-lg font-semibold">Candidates List</h4>
            {/* הצג את המועמדים כאן */}
            <p>jobid={jobId}</p>
        </div>
    );}
}

export default Candidates
