import React from 'react'
import JobCard from '../jobCard/page'



const arr=[{
"geographicalLocation": "gf",
"requiredExperienceLevel": "String",
"salaryOffered": "String",
"jobType": "String",
"field": "String",
"jobTitle": "String",
"requirements": "String",
"jobDescription": "String",
"status": "String"
},
{
    "geographicalLocation": "jerusalem",
    "requiredExperienceLevel": "String",
    "salaryOffered": "String",
    "jobType": "String",
    "field": "String",
    "jobTitle": "String",
    "requirements": "String",
    "jobDescription": "String",
    "status": "String"
}]

function showDeals() {
    
   
    return (
        <div>
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">From the blog</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">Learn how to grow your business with our expert advice.</p>
              </div>
              <div className="flex flex-wrap -mx-3"> {/* קונטיינר עם Flexbox */}
                {arr.map((i, index) => (
                  <div className="w-1/3 px-3 mb-6"> {/* אלמנט עם רוחב של 1/3 */}
                    <JobCard key={index} props={arr[index]} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default showDeals
