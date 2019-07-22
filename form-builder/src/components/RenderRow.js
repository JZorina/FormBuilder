import React from 'react';

 const RenderRow = ({key_,data,keys}) =>{
    return keys.map((key, index)=>{
    return <td key={data[key]}>{data[key]}</td>
    })
   }

export default RenderRow;