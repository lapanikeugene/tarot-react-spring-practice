import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardItem from './Cards/CardItem';
import TarotSlider from './Interface/Slider';
import Deck from './Cards/Deck';
import SpreadItem from './Spreads/SpreadItem';
import Spread from './Spreads/Spread';
import FirstStep from './navigation/FirstStep';

function App() {
  return (
    <div className="App flex justify-center">
        <FirstStep />
        <TarotSlider />
        <Deck />
        <Spread />
    </div>
  );
}

export default App;
