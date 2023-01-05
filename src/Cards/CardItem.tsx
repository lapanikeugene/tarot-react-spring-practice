

import { useSpring, animated } from '@react-spring/web'
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectCard } from '../redux/cardsSlice';
import { hideModal, setModalDescription, setModalTitle, showModal,setModalAnswer } from '../redux/modalSlice';
import { useAppDispatch } from '../redux/store';
import { FALL_PLACE_Y, FLIP_DELAY, FLIP_DURATION, GROSS_HEIGHT, GROSS_WIDTH, SMALL_HEIGHT, SMALL_WIDTH, SPREAD_ITEM_HEIGHT, SPREAD_ITEM_WIDTH, START_POSITION } from './assets/settings';
import { spreadsDB } from './assets/spreads';
import { tarotsDB } from './assets/tarots';

const CardItem = (props:{cardNumber:number,cardName:string}) => {
    
    const [startMixing,setStartMixing] = useState(false); // control size of card, after starting mixing
    const dispatch = useAppDispatch();
    const [getFlip,setFlip] = useState(false); // spare resources. loading element of second layer of the card if and only if flip is true. 
    const [spring,api] = useSpring(()=>({ from:{
                                                  opacity:1,
                                                  width:SMALL_WIDTH,
                                                  height:SMALL_HEIGHT,
                                                  x:START_POSITION,
                                                  left:0,
                                                  y:-200,
                                                  top:0,
                                                  transform:`rotate(0deg)`},
                                          to:{y:FALL_PLACE_Y},
    
                                      

                                          delay:5*props.cardNumber
                                        }));
    // animation of changing back and front sides.                                     
    const [springCard,apiSrping] = useSpring(()=>({
      from:{
        width: GROSS_WIDTH,
        height:GROSS_HEIGHT,
        opacity:1,
        transform:"",
        config:{ mass: 5, tension: 500, friction:getFlip ? 40 :180}
      }

    })

    )

    // for animation of second layer of the card, to make it reveal by flip. 
    const [springCardSL,apiCardSL] = useSpring(()=>({
      from:{
        width: GROSS_WIDTH,
        height:GROSS_HEIGHT,
        opacity:0,
        transform:"",
        config:{ mass: 5, tension: 500, friction:getFlip ? 40 :180}
      }

    })

    )
                                        
    // const [opacity,transform] = useSpring(()=>({
    //   opacity: getFlip? 1 :0 ,
    //   transform:`perspective(600px) rotateX(${getFlip ? 180 : 0}deg)`,
    //   config:{ mass: 5, tension: 500, friction:getFlip ? 40 :180},
    // }))
    const [position, setPosition] = useState({x:0,y:0});
    const [selected,setSelected] = useState(true);
    const [shouldBeInterpreted,setShouldBeInterpreted] = useState(false);
    const selector = useAppSelector((s)=>s.deck);
    const selectorCards = useAppSelector((s)=>s.cards);
    const spreadSelector = useAppSelector(s=>s.spreads);

    //https://codesandbox.io/s/spring-flip-card-g30zr?file=/src/App.tsx




    const handleMixing = () => {
        setStartMixing(true);
        console.log("click");
        // simple way make random more random with digits below 0 
        const newPosX = Math.floor(Math.random()*600) * ( Math.floor(Math.random()*20) > 10 ? 1 : -1);
        const newPosY = Math.floor(Math.random()*600) * (Math.floor(Math.random()*20) > 10 ? 1 : -1);
        console.log(newPosX,newPosY);
        api.start({
          from: {
            left: position.x,
            top: position.y,
            // if mixing already happened we are using small size of cards. 
            width: startMixing ? SMALL_WIDTH : GROSS_WIDTH,
            height: startMixing ? SMALL_HEIGHT : GROSS_HEIGHT
          },
          to: {
            left:newPosX,
            top: newPosY,
            width:SMALL_WIDTH,
            height:SMALL_HEIGHT,
          },
          config:{ mass: 5, tension: 500, friction:getFlip ? 40 :180}
        })
        apiSrping.start({
          from: {
         
            width: startMixing ? SMALL_WIDTH : GROSS_WIDTH,
            height: startMixing ? SMALL_HEIGHT : GROSS_HEIGHT,
          },
          to: {
            height: SMALL_HEIGHT,
            width:SMALL_WIDTH,
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
            opacity:0,
            y:-300,
          },
        })
      }
     
      // where to put cards after click?
      const handleClickAfter = () =>{
      
        if(!selected){
          console.log("clicked",selector.isChoose);
          setSelected(true);
          setShouldBeInterpreted(true);
          dispatch(selectCard(props.cardName))
          setFinalPosition(300+selectorCards.cards.length*60,100);
          
        }
      }
      const setFinalPosition=(x:number,y:number) =>{
        api.start({
          from: {
            left: position.x-START_POSITION,
            top: position.y-FALL_PLACE_Y,
            width:  SMALL_WIDTH ,
            height: SMALL_HEIGHT,          
          },
          to: {
            left:x-START_POSITION,
            top: y-FALL_PLACE_Y,
            width: SMALL_WIDTH,
            height: SMALL_HEIGHT,
          },
          onRest:()=>{
              setPosition({x:x,y:y})
            // after card will come to final destination it should flip
        

          
          }
        })
      
      }

      // flip card
      const flip=()=>{
        console.log("flip!")
      // flip add hide first layer of card. 
       setFlip(flip=>!flip);
        apiSrping.start({from:{ 
                            opacity:1, 
                            transform:"rotateY(0deg)"},
                         to:{
                            opacity: 0 ,
                            transform:`rotateY(-180deg)`,
                          }, 
                         config:{
                            duration:FLIP_DURATION
                          },  
                         delay: FLIP_DELAY*props.cardNumber
          
          })
        // flip and show second layer of card
          apiCardSL.start({ from:{ 
                                    width: SPREAD_ITEM_WIDTH,
                                    height: SPREAD_ITEM_HEIGHT,
                                    opacity:0, 
                                    transform:"rotateY(0deg)"},
                            to:{
                            opacity: 1 ,
                            transform:`rotateY(-180deg)`,
                            width: SPREAD_ITEM_WIDTH,
                            height: SPREAD_ITEM_HEIGHT,
                            }, config:{duration:FLIP_DURATION}, delay:FLIP_DELAY*props.cardNumber
        })

      }

      useEffect(()=>{
        console.log("check interupted spread",selectorCards.cards.length,spreadsDB[spreadSelector.spreadType].position.length,shouldBeInterpreted  )
        if(selectorCards.cards.length===spreadsDB[spreadSelector.spreadType].position.length&&!shouldBeInterpreted)
        {
          hideCard();
         
        }else{

          // if all cards selected it's time to send them to spread. 
          if(selectorCards.cards.length===spreadsDB[spreadSelector.spreadType].position.length)
          {
          let timer1 = setTimeout(() => {
            const index = selectorCards.cards.indexOf(props.cardName);
            
            api.start({
              from: {
                left: position.x,
                top: position.y,
                transform:`rotate(0deg)`,
              },
              to: {
                left:spreadsDB[spreadSelector.spreadType].position[index].x-START_POSITION + 
                (spreadsDB[spreadSelector.spreadType].position[index].rotate ? 70 : 0 ),
                top:spreadsDB[spreadSelector.spreadType].position[index].y-FALL_PLACE_Y + 
                (spreadsDB[spreadSelector.spreadType].position[index].rotate ? 20 : 0 ),
                transform:`rotate(${spreadsDB[spreadSelector.spreadType].position[index].rotate || 0}deg)`,
                
              },
              onRest:flip,
            });

         // start change size of first card layer to fit to spread item. 
          apiSrping.start({
            from: {
            
              width:  SMALL_WIDTH ,
              height: SMALL_HEIGHT,          
            },
            to: {
          
              width: SPREAD_ITEM_WIDTH,
              height: SPREAD_ITEM_HEIGHT,
            },
          })

          }, 2000)

          return  () => {
            clearTimeout(timer1);
          }
          }
        }
      },[selectorCards])

      useEffect(()=>{
        console.log("props.cardNumber",props.cardNumber)
        console.log("selector.deck",selector.deck[props.cardNumber])
        console.log(selector.mixStep)
        if(selector.mixStep>1)
            handleMixing();

            //time to choose the cards. 
        if(selector.isChoose)
        {
          setSelected(false)
          console.log("final move should begin!")
          //set rows of cards to proper place. 
          setFinalPosition(selector.deck[props.cardNumber].x-200,selector.deck[props.cardNumber].y+220)
        }
      },[selector.mixStep, selector.isChoose])


      // show and hide modal with title and descritpion when mouse enter and leave second layer of card 
      const handleMouseEnter = ()=>{
        console.log("send comand to show modal");
        dispatch(showModal());
        dispatch(setModalTitle(props.cardName ))
        dispatch(setModalDescription(tarotsDB[props.cardName].desc))
        dispatch(setModalAnswer(tarotsDB[props.cardName].answer))
      }

      const handleMouseLeave = ()=>{
        dispatch(hideModal());
      }



    return (
        <animated.div   style={{
         
            position:'absolute',
           
           
            
            ...spring

        }}
            className={`hover:bg-slate-900 cursor-pointer  ${spreadsDB[spreadSelector.spreadType].position[selectorCards.cards.indexOf(props.cardName)]?.rotate ? "z-0" : "-z-10"} `}
       >
        <animated.div  onClick={handleClickAfter} style={{...springCard}} className={`back-side absolute left-0 top-0 border bg-slate-500 ${getFlip ? "-z-50" : "z-10" }`} />
        {getFlip&&<animated.div 
                                onMouseOver={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{...springCardSL}}
                                className=" bg-slate-800  absolute left-0 top-0 z-0" >
              <img src={`/assets/cards/${tarotsDB[props.cardName].image}`} />
              </animated.div> }
              
          
       </animated.div>
    );
};

export default CardItem;