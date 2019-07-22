import React from 'react';

const FieldsViewer=({label, handleChange, type="text"})=>{
    
    return(
        <div>
           <label>{label}:</label>
           <br/>
           <input
                style={Fieldstyles}
               // required
                type={type}
                placeholder={label}
                onChange={handleChange}
                >          
           </input>
        </div>
    );
        
}
const Fieldstyles={
 
    width:"50em",
    marginBottom:"50px",
    background:"#F8F9F9 " ,
    border:"1px solid"
    
}

export default FieldsViewer;

