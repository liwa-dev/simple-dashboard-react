import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import Home from './wlcm';
import Dashboard from './dashboard';
import audioFile from './audio/file.mp3';

function AudioPlayer({ src, onStart, ...props }) {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleKeyPress = (event) => {
      if (!started) {
        document.removeEventListener('click', handleKeyPress);
        audio.play();
        audio.loop = true;
        console.log('test');
        setStarted(true);
        onStart();
        
      }
    };

    document.addEventListener('click', handleKeyPress);
  }, [onStart]);

  return (
    <div {...props}>
      <audio ref={audioRef} src={src} />
      {!started && <div className='enterMsg'>
        <div>
          <span>Click Anywhere to Start</span>
        </div>
      </div>}
      {started && props.children}
    </div>
  );
}

export default function App() {
  const [canAccess, setCanAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAccessPages = (event) => {
      if (!canAccess) {
        console.log('clicked')
        setCanAccess(true);
        navigate('/welcome');
        document.removeEventListener('click', handleAccessPages);
      }
    };
  
    if (!canAccess) {
      navigate('/');
    } else {
      navigate('/welcome');
    }
    document.addEventListener('click', handleAccessPages);
  
    return () => {
      document.removeEventListener('click', handleAccessPages);
    };
  }, [canAccess]);
  

  

  return (
    <div className="App">
      <Routes>
        {(canAccess) && <Route path="/welcome" element={<Home />} />}
        {(canAccess) && <Route path="/dashboard" element={<Dashboard />} />}
      </Routes>
      <AudioPlayer src={audioFile} onStart={() => { setCanAccess(true); }} />
    </div>
  );
}


