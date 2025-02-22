import * as React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Navbar from './components/Navigation/Navbar';
import GraphsPage from './Pages/ChartsPage';
import ReportsPage from './Pages/ReportsPage';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graphs" element={<GraphsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
