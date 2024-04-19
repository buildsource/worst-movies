import React from 'react';
import YearsWithMultipleWinners from '../components/Dashboard/YearsWithMultipleWinners';
import StudiosWithMostWins from '../components/Dashboard/StudiosWithMostWins';
import ProducersWithWinInterval from '../components/Dashboard/ProducersWithWinInterval';
import WinnersByYearSearch from '../components/Dashboard/WinnersByYearSearch';

const Dashboard: React.FC = () => {
    return (
        <div className="mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <YearsWithMultipleWinners />
                <StudiosWithMostWins />
                <ProducersWithWinInterval />
                <WinnersByYearSearch />
            </div>
        </div>
    );
};

export default Dashboard;
