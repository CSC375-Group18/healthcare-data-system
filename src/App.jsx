import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';

import About from './pages/About'; 
import Documents from './pages/Documents';
import Notes from './pages/Notes';
import Gantt from './pages/Gantt';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/gantt" element={<Gantt />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}