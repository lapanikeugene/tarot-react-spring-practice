import { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";


const Modal = ()=>{
   const [mousePos,setMousePos] = useState<{x:number,y:number}>({x:0,y:0});
   const [textPart,setTextPart] = useState({title:"",desc:"",answ:""});
   const [scrolled, setScrolled] = useState(0); // correct position after scrolling. 
   const modalSelector = useAppSelector(s=>s.modal);
   


   // get scroll offset. otherwise modal will be shown too high when user scroll down. 
   useEffect(() => {
  
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrolled(position);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);


    //get mouse position
    useEffect(()=>{
        const handleMoveMouse = (event: MouseEvent)=>{
                setMousePos({x:event.clientX,y:event.clientY})

          
        }

        window.addEventListener("mousemove",handleMoveMouse)
       
        return()=>{
            window.removeEventListener("mousemove",handleMoveMouse)
        }
    },[setMousePos])

    //change text part of modal if it was changed. 
    useEffect(()=>{
        console.log("modal data:",modalSelector)
        setTextPart({   title:  modalSelector.modalTitle,
                        desc:   modalSelector.modalDesc,
                        answ:   modalSelector.modalAnswer
                        
        })

    },[modalSelector])

    return (
        <>
        {modalSelector.isModalVisible&&
        <div className={`bg-white/90 p-1 w-[300px] h-[200px] absolute rounded border border-amber-300`}
            style={{
                left: mousePos.x-150,
                top: mousePos.y > 210 ? mousePos.y-210+scrolled :  mousePos.y+ 20 
            }}
        >
            <h3 className=" text-amber-400 text-lg font-bold ">{textPart.title}</h3>
            <div className="flex justify-between">
            <span className=" text-left font-semibold ">Meaning:</span> <span >{textPart.desc}</span>    
            </div>
            <div  className="flex justify-between mt-2">
            <span  className=" text-left  font-semibold ">Answer:</span>     <span>{textPart.answ}</span>
            </div>
             {/* {mousePos.x} - {mousePos.y} - {scrolled} */}

        </div>}
        </>
    )
}


export default Modal;