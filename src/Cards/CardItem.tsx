

import { useSpring, animated } from '@react-spring/web'
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectCard } from '../redux/cardsSlice';
import { useAppDispatch } from '../redux/store';
import { spreadsDB } from './assets/spreads';

const CardItem = (props:{cardNumber:number,cardName:string}) => {
    const dispatch = useAppDispatch();
    const [spring,api] = useSpring(()=>({from:{opacity:1,x:0,y:0,left:0,top:0}}));
    const [position, setPosition] = useState({x:0,y:0});
    const [selected,setSelected] = useState(true);
    const [shouldBeInterpreted,setShouldBeInterpreted] = useState(false);
    const selector = useAppSelector((s)=>s.deck);
    const selectorCards = useAppSelector((s)=>s.cards);
    const spreadSelector = useAppSelector(s=>s.spreads);




    const handleClick = () => {
        console.log("click");
        const newPosX = Math.floor(Math.random()*600);
        const newPosY = Math.floor(Math.random()*600);
        api.start({
          from: {
            left: position.x,
            top: position.y,
          },
          to: {
            left:newPosX,
            top: newPosY,
          },
        })

        setPosition({x:newPosX,y:newPosY})
        

      }
      const hideCard=()=>{
        api.start({
          from: {
           opacity:1
          },
          to: {
            opacity:0
          },
        })
      }
     
      const handleClickAfter = () =>{
        if(!selected){
          setSelected(true);
          setShouldBeInterpreted(true);
          dispatch(selectCard(props.cardName))
          setFinalPosition(800,selectorCards.cards.length*90);
          
        }
      }
      const setFinalPosition=(x:number,y:number) =>{
        api.start({
          from: {
            left: position.x,
            top: position.y,
          },
          to: {
            left:x,
            top: y,
          },
        })
      }

      useEffect(()=>{
        if(selectorCards.cards.length==spreadsDB[spreadSelector.streapType].position.length&&!shouldBeInterpreted)
        {
          hideCard();
         
        }else{
          let timer1 = setTimeout(() => {
            const index = selectorCards.cards.indexOf(props.cardName);
            
            api.start({
              from: {
                left: position.x,
                top: position.y,
              },
              to: {
                left:spreadsDB[spreadSelector.streapType].position[index].x,
                top:spreadsDB[spreadSelector.streapType].position[index].y,
              },
            })
          }, 2000)

          return  () => {
            clearTimeout(timer1);
          }
          
        }
      },[selectorCards])

      useEffect(()=>{
        console.log("props.cardNumber",props.cardNumber)
        console.log("selector.deck",selector.deck[props.cardNumber])
        console.log(selector.mixStep)
        if(selector.mixStep>1)
            handleClick();

        if(selector.mixStep==4)
        {
          setSelected(false)
          console.log("final move should begin!")
          setFinalPosition(selector.deck[props.cardNumber].x,selector.deck[props.cardNumber].y)
        }
      },[selector.mixStep])
    return (
        <animated.div  onClick={handleClickAfter} style={{
            width:40,
            position:'absolute',
         
            height:80,
            
            ...spring

        }}
            className=" bg-slate-500 hover:bg-slate-900 cursor-pointer"
       />
    );
};

export default CardItem;