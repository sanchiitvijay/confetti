import { useEffect,useRef } from "react";
import { useDispatch } from "react-redux";


const useThrottle=(func,delay)=>{
    const lastCall=useRef(0);
    const dispatch=useDispatch();
    return (...args)=>{
        const now=new Date().getTime();
        if(now-lastCall.current>=delay){
            lastCall.current=now;
            dispatch(func(...args));
        }
    }
}


export default useThrottle