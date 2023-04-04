import { useState, useEffect, useRef } from "react";


const useUnmountPromise = () => {
    const isMounted = useRef(true);

    useEffect(()=>{
        return () => {
            isMounted.current = false;
        }
    },[])


    const unMountPromise = async (promise, data, callback) => {
        if(promise){
            const res = await promise(data);
            if(isMounted.current && callback){
                callback(res);
            }
        }
        
    } 

    return unMountPromise;
}

export default useUnmountPromise;