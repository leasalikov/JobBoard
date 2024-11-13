"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Modal: React.FC<{ onClose: () => void, apply: (values: any) => void }> = ({ onClose, apply }) => {
    const session = useSession();

    const [CoverLetter, setCoverLetter] = useState('');
    const [Resume, setResume] = useState('');
    const [resumesSelect, setResumesSelect] = useState( [ ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/jobsearchers/${session.data?.user?.email}`);
                const data = await response.json();
                console.log("resume "+data);
                
                setResumesSelect(data.jobSearcher.resume);
               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const ApplyJob = (e: FormEvent<HTMLFormElement>) => {

        console.log("session", session.data)
        if (!session.data) {
            console.log("mgld", session.data)
            // <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            //     <span className="font-medium">Info alert!</span> you have to log in/sign up.
            // </div>
            alert("you have to log in/sign up.")
            return
        }
        const userEmail = session?.data?.user?.email;

        e.preventDefault(); 
        const values = {
            userEmail: userEmail,
            coverLetter: CoverLetter,
            resume: Resume
        };

        console.log('values   ', values); 
        apply(values);

        onClose(); 
    };


    return (
        <div style={modalStyles}>
            <div style={modalContentStyles}>
                {/* <h2>Add Cv/Resume</h2> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Main modal --> */}
                    {/* <div id="default-modal" tabIndex={1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-2xl max-h-full"> */}
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="w-96 flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Apply   for   this   job:
                            </h3>
                            <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form onSubmit={ApplyJob} className="max-w-sm mx-auto">

                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose Resume</label>
                            <select
                                name="Resume"
                                value={Resume}
                                onChange={(e) => setResume(e.target.value)}
                                id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a Resume</option>
                                {resumesSelect.length>0 && resumesSelect.map((resume,index) => (
                                    <option key={index} >{resume}</option>
                                ))}
                            </select>
                            
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover letter</label>

                            <div className="max-w-sm space-y-3">
                                <textarea className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows={3} placeholder="Readonly"

                                    name="CoverLetter"
                                    value={CoverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}>
                                    let me know who you are...
                                </textarea>
                            </div>

                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={onClose} data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Cancel
                                </button>
                                <button data-modal-hide="default-modal" type="submit" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Apply
                                </button>
                            </div>
                        </form>
                        {/* <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </div> */}
                        {/* <!-- Modal footer --> */}

                    </div>
                </div>
            </div>
        </div>
        //    </div>
        //  </div>


    );
};

// ParentComponent.tsx



export default function ButtonWithModal({ job }: any) {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    async function apply(values: any) {
        console.log('apply')
        console.log(job)

        try {
            const response = await fetch('http://localhost:3000/api/candidacies', {
                method: 'POST',
                body: JSON.stringify({ jobId: job.id, ...values }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response)
            // const data = await response.json();
            // console.log('data    ' + JSON.stringify(data));
            // return data;
            return response;
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <button onClick={() => setModalOpen(true)} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium
                    rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none
                    focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog"
                        aria-expanded="false" aria-controls="hs-modal-example" data-hs-overlay="#hs-modal-example"
                    >Apply</button>

                    {isModalOpen && <Modal onClose={handleCloseModal} apply={apply} />}
                </div>
            </div>
        </div>
    );
};




// סגנונות
const modalStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyles: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
};