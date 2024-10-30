"use client"
import React, { FormEvent, useState } from 'react';




const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const AddCvResume = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // מניעת ברירת מחדל
        

        const values = {
            email: email,
            password: password,
            name: name,
        };

        console.log(values); // הדפסת הערכים לקונסולה
        // כאן תוכל להוסיף את הלוגיקה להעלאת ה-CV/רזומה
        onClose(); // סגירת המודל
    };

    return (
        <div style={modalStyles}>
            <div style={modalContentStyles}>
                <h2>Add Cv/Resume</h2>
                <form onSubmit={AddCvResume}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /><br /><br />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br /><br />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br /><br />
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="submit" >Add Cv/Resume</button>
                </form>
            </div>
        </div>
    );
};

// ParentComponent.tsx


function ButtonWithModal() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
                <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">From the blog</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">Learn how to grow your business with our expert advice.</p>
              </div>
            <button onClick={handleOpenModal}>Open Modal</button>
            {isModalOpen && <Modal onClose={handleCloseModal} />}
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

export default ButtonWithModal;
