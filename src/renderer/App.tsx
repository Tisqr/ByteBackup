import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from '@mui/material';

function Main() {
  return (
    <div>
      <Button variant="contained">Hello</Button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
