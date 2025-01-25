import './App.css'
import Home from './components/Home'
import Predict from './components/Predict'
import Songs from './components/Songs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

    return (
        <>
            <nav className="nav-bar">
                <a href="/" className='ch1'>CEOL</a>
                <h2>Song Recommendation using Emotion Recognition</h2>
                <div>
                    <a href="/predict" className='clinks'>Prediction</a>
                    <a href="/play" className='clinks'> Song</a>
                </div>
            </nav>
            <div className="main-div">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/predict" element={<Predict />} />
                        <Route path="/play" element={<Songs />} />
                    </Routes>
                </BrowserRouter>
            </div>
            <footer className="foot-style">
                <a target='_blank' href='https://github.com/MaharajMahaadev' className='clinks'>Github</a>
                <p>Created by Maharaj Mahaadev</p>
                <a target='_blank' href='https://maharajmahaadev.vercel.app/' className='clinks'>Portfolio</a>
            </footer>
        </>
    )
}

export default App