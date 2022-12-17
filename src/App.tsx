import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardItem from './Cards/CardItem';
import TarotSlider from './Interface/Slider';
import Deck from './Cards/Deck';

function App() {
  return (
    <div className="App flex justify-center">
        <TarotSlider />
        <Deck />
    </div>
  );
}

export default App;
