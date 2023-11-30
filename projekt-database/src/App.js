import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/Home';
import Navibar from './pages/Navibar';
import Books from './pages/Books';
import Review from './pages/Review';
import Add from './pages/Add';
import Login from './pages/Login';
import Edit from './pages/Edit';
import Delete from './pages/Delete';

function App() {
  return (
    <div className="App">

      <Navibar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path='/review/:id' element={<Review />} />
          <Route path='/add' element={<Add />} />
          <Route path='/login' element={<Login />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/delete' element={<Delete />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
