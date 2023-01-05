import './App.css';
import Deck from './Cards/Deck';
import Spread from './Spreads/Spread';
import HeroTitle from './navigation/HeroTitle';
import Modal from './modal/Modal';
import React from 'react';

function App() {
  const ref = React.createRef();
  return (
    <div className="App relative flex justify-center w-full">
      <div className='relative w-[800px] mx-10'>
      <HeroTitle />
       
        <Deck />
        <Spread />
    </div>

    <Modal />
    </div>
  );
}

export default App;
