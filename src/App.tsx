import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardItem from './Cards/CardItem';
import TarotSlider from './Interface/Slider';
import Deck from './Cards/Deck';
import SpreadItem from './Spreads/SpreadItem';
import Spread from './Spreads/Spread';

function App() {
  return (
    <div className="App flex justify-center">
        <TarotSlider />
        <Deck />
        <Spread />
    </div>
  );
}

export default App;
