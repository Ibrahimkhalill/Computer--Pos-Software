
import React from "react";

import Barcode from 'react-barcode';
import "./pdf.css";


export const ComponentToPrint = React.forwardRef((props, ref) => {
   

    return (
        <>
           <div ref={ref} className="barcode" >
           <Barcode value={props.code} />
           </div>
          
              
           
        </>
    );
});

