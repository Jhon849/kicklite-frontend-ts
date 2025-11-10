import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-system overflow-x-hidden">
      <Navbar />
      <main className="pt-20 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
