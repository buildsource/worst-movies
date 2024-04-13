import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Drawer from './components/Drawer';
import Dashboard from './pages/Dashboard';
import MovieList from './pages/MovieList';

const App: React.FC = () => {
    return (
        <Router>
            <>
                <Drawer />
                <main className="ml-64">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/movies" element={<MovieList />} />
                    </Routes>
                </main>
            </>
        </Router>
    );
};

export default App;
