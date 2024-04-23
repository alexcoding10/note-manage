// En AppRouter.jsx

import { Routes, Route } from'react-router-dom';
import Login from '../pages/login/Login';
import Note from '../pages/note/Note';
function AppRouter() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/notes" element={<Note/>} />
        </Routes>
    
    </>
  );
}

export default AppRouter;
