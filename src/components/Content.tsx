import React from 'react';

const Content: React.FC = () => {
    return (
        <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-6">Welcome to the Data Viewer</h1>
            <p className="text-gray-700">Select a tab from the sidebar to view data.</p>
        </div>
    );
};

export default Content;