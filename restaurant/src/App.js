import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import Report from './Pages/Report';
import Inventory from './Pages/Inventory';
import Employee from './Pages/Employee';
import Settings from './Pages/Settings';



function App() {
  return (
    <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/report" element={<Report/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/settings" element={<Settings/>} />


        </Routes>
    </BrowserRouter>
  );
}

export default App;
