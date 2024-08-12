import { useRef } from "react";
import { useDispatch } from "react-redux";


const useThrottle=(func,delay,dispatchFlag)=>{
    const lastCall=useRef(0);
    const dispatch=useDispatch();
    return (...args)=>{
        const now=new Date().getTime();
        if(now-lastCall.current>=delay){
            lastCall.current=now;
            if(dispatchFlag){
            dispatch(func(...args));}
            else{
                func(...args);
            }
        }
    }
}


export default useThrottle