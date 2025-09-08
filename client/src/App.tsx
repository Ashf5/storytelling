
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './app/pages/homepage';
import RegisterPage from './app/pages/RegisterPage';
import Login from './app/pages/Login';
import EditStory from './app/pages/EditStory';
import CreateStoryPage from './app/pages/CreateStoryPage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<Login />} />

        <Route path='/stories' element={<CreateStoryPage />} />
        <Route path='/stories/:id' element={<EditStory />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
