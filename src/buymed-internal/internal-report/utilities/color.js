import * as MuiColor from '@material-ui/core/colors';
import { getRndInteger } from '.';



const colorArray =  Object.keys(MuiColor).map(color => MuiColor[color])

export const getAvatarRandomColor = () => {
   const index = getRndInteger(0, colorArray.length - 1);
   const value = getRndInteger(1,7)*100;
   return colorArray[index][value];
}

export const getAvatarColorIndexBase = (index = 0) => {
   const colorIndex = index%colorArray.length;
   return colorArray[colorIndex][500];
}