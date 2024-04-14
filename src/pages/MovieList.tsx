import React from 'react';
import WinnersList from '../components/Dashboard/WinnersList';

const MovieList: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WinnersList/>
            </div>
        </div>
    );
}

export default MovieList;
