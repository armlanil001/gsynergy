import React from 'react';
import gsLogo from '../assets/Gsynergy Logo V2 Long Description.svg'
const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center justify-center">
        <img
          src={gsLogo} // Replace with your logo path
          alt="GSynergy Logo"
          className="h-20 w-40 mr-1"

        />
      </div>
      <h1 className="text-2xl font-bold text-gray-800">Data Viewer</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">Profile</button>
        <button className="text-gray-600 hover:text-gray-900">Logout</button>
      </div>
    </header>
  );
};

export default Header;