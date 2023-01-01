import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import './index.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShortURLRedirect from './pages/ShortURLRedirect';
import NavigationBar from './components/NavigationBar';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <NavigationBar></NavigationBar>
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/:code" element={<ShortURLRedirect />}></Route>
            </Routes>
        </Router>
    </React.StrictMode>
);
