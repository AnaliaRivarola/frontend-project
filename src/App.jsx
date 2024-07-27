import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './components/Main';
import ProjectForm from './components/ProjectForm';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add-project" element={<ProjectForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
