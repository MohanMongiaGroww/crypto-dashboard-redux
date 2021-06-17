import React from "react";
import Sparkline from "react-sparkline-canvas";

const SparkLine = ({data}) => {

    // const convertDataToNumber = () =>{
    //     if(data !== null && data !== undefined)
    //     {
    //         return data.map(entry => {
    //             return Number.parseFloat(entry);
    //         })
    //     }
    //     return [];
    // }


    return (
        <Sparkline
            data={[1,2,3,45,45,2,3,30,10,15]}
            width={200}
            height={200}
        />
    )
}

export default SparkLine;