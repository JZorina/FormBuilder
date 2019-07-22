import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const typeOptions = [
  { key: 'text', value: 'text', text: 'text' },
  { key: 'color', value: 'color', text: 'color' },
  { key: 'date', value: 'date', text: 'date' },
  { key: 'email', value: 'email', text: 'email' },
  { key: 'tel', value: 'tel', text: 'tel' },
  { key: 'number', value: 'number', text: 'number' },

]
function DropDownWizardField({label, name, handleChange}) {
    return(
        <div style={{marginTop:"15px" }}>
            <label>
                {label}:
            </label>

            <Dropdown 
            placeholder='Select type'
            clearable 
            options={typeOptions} 
            selection
            value={name} 
            onChange={handleChange}
            />
    </div>
        );
    }

export default DropDownWizardField;