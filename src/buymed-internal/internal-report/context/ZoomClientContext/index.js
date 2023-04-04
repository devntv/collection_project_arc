import {createContext} from "react";

const ZoomVideoContext = createContext({
    isStartedVideo:false,
    isUnMuted:false
});

export default ZoomVideoContext;