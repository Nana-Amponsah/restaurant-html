import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import Inventory from './Pages/Inventory';
import Employee from './Pages/Employee';



function App() {
  return (
    <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/employee" element={<Employee/>} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
