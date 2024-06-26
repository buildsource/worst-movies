import React from 'react';
import WinnersList from '../components/List/WinnersList';

const MovieList: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <WinnersList />
        </div>
    );
};

export default MovieList;
