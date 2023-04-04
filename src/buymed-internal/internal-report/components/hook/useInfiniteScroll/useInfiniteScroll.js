import { useState, useEffect, useRef } from 'react';

const useInfiniteScroll = (
    callback,
    direction,
) => {
    const [isFetching, setIsFetching] = useState(false);
    const [element, setElement] = useState(null);
    const handleScroll = () => {
        if(element.clientHeight < 100){
            return;
        }
        if(direction === 'top'){
            if (element.scrollTop <= 5){ 
                setIsFetching(true);
            }
        }
        else{
            if (element.scrollHeight - element.clientHeight - element.scrollTop <= 5){ 
                setIsFetching(true);
            }
        }
       
    }

    useEffect(() => {
        if(element){
            element.addEventListener("scroll", handleScroll)        
        }
        return () => {
            if(element){
                element.removeEventListener("scroll", handleScroll);

            }
        }
    }, [element]);

    useEffect(() => {
        if(isFetching && callback){
            callback();
        }
    }, [isFetching]);
   
    return {isFetching, setIsFetching, element, setElement};
}

export default useInfiniteScroll;