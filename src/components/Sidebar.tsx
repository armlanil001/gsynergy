import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 bg-stone-300 text-black font-semibold h-screen p-4">
        
            <ul>
                <li className="mb-4">
                    <Link to="/stores" className="hover:text-gray-400">Stores</Link>
                </li>
                <li className="mb-4">
                    <Link to="/skus" className="hover:text-gray-400">SKUs</Link>
                </li>
                <li className="mb-4">
                    <Link to="/planning" className="hover:text-gray-400">Planning</Link>
                </li>
                <li className="mb-4">
                    <Link to="/charts" className="hover:text-gray-400">Charts</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;