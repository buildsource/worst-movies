import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Drawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                onClick={toggleDrawer}
                className="p-2 text-white bg-blue-500 hover:bg-blue-700"
            >
                {isOpen ? 'Close' : 'Menu'}
            </button>
            {isOpen && (
                <div className="absolute top-0 left-0 w-64 h-full bg-gray-100 shadow-md z-50">
                    <div className="p-5">
                        <h2 className="text-lg font-semibold">Navigation</h2>
                        <ul className="mt-4">
                            <li className="mb-2">
                                <Link to="/" className="text-blue-500 hover:underline" onClick={toggleDrawer}>Dashboard</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/movies" className="text-blue-500 hover:underline" onClick={toggleDrawer}>Lista de Filmes</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Drawer;
