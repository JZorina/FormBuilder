import React from 'react';


function WizardField({label, name, handleChange, type="text"}) {
    return(
        <div>
            <label>
                {label}:
            </label>
            <input 
                type={type}
                value={name} 
                onChange={handleChange}
            />
        </div>
        );
    }


export default WizardField;