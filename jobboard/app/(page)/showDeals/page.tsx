import prisma from '../../../prisma/client';
import JobCard from '../jobCard/page';

// const jobs=[{
//   "jobId":"1",
// "geographicalLocation": "gf",
// "requiredExperienceLevel": "String",
// "salaryOffered": "String",
// "jobType": "String",
// "field": "String",
// "jobTitle": "String",
// "requirements": "String",
// "jobDescription": "String",
// "status": "String"
// },
// {
//   "jobId":"2",
//     "geographicalLocation": "jerusalem",
//     "requiredExperienceLevel": "String",
//     "salaryOffered": "String",
//     "jobType": "String",
//     "field": "String",
//     "jobTitle": "String",
//     "requirements": "String",
//     "jobDescription": "String",
//     "status": "String"
// }]
//props=id,image:מעסיק
async function showDeals({ id }: { id: string }) {
  console.log("id",id)
  const jobs = await prisma.jobs.findMany({
    where: { employerId: id }
  });
 return(
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Learn how to grow your business with our expert advice.</p>
          </div>
          <div className="flex flex-wrap -mx-3"> {/* קונטיינר עם Flexbox */}

            {jobs.map((job, index) => (
              <div className="w-1/3 px-3 mb-6"> {/* אלמנט עם רוחב של 1/3 */}
                <JobCard key={index} job={job} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>)
  };



export default showDeals