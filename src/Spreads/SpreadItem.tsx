import React, { useEffect, useState } from 'react';

const SpreadItem = (props:{x:number,y:number,title:string,direction?:string}) => {
    const [dir,setDir] = useState("flex-row")
    useEffect(()=>{
        if(props.direction){
            switch(props.direction){
                case "top":     setDir('flex-col-reverse');             break;
                case "right":   setDir("flex-row");                      break;
                case "left":    setDir('flex-row-reverse');              break;
                case "bottom":  setDir('flex-col');                     break;
                default:        setDir('flex-row');                     break;
            }
        }
    },[])

    return (
        <div    className={`absolute flex top-[${props.y}px] ${dir}  `} 
                style ={{   left:props.x,
                            top:props.y}}>
            <div className=' border-l-purple-700 border-2 rounded-md w-[40px] h-[80px] '> </div>
            <div>{props.title}</div>
            
        </div>
    );
};

export default SpreadItem;