import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';

import About from './pages/About'; 
import DocumentsHub from './pages/documents/DocumentsHub';
import Notes from './pages/Notes';
import Gantt from './pages/documents/Gantt';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/documents" element={<DocumentsHub />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/gantt" element={<Gantt />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}