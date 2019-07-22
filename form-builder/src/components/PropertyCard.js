import React from 'react';
import WizardField from './WizardField';
import DropDownWizardField from './DropDownWizardField';

 class PropertyCard extends React.Component{
 
    constructor(props){
        super(props);
        this.state={
            label:'',
            name:'',
            type:'',  
        };
    }
    
    ChangeName=(e) => {
        this.setState({ name: e.target.value });
      }

    ChangeLabel = (e) => {
        this.setState({ label: e.target.value });
      }

    ChangeType = (e, { value }) => {
        this.setState({ type:  value  });
      }

    CreateJson = () => {
        this.props.GetPropertyJson(JSON.stringify(this.state));
    }

  
    render(){
        return(
            <div>
                <WizardField 
                label={'label'}
                type={'text'}
                name={this.state.label} 
                onUpdate={this} 
                handleChange={this.ChangeLabel}
                />

                <WizardField 
                label={'name'}
                type={'text'}
                name={this.state.name} 
                onUpdate={this} 
                handleChange={this.ChangeName}/>

                <DropDownWizardField 
                label={'type'}
                name={this.state.type} 
                onUpdate={this} 
                handleChange={this.ChangeType}/>

                <button 
                style={{marginTop:"10px" }}
                className="ui primary button"
                variant="primary"
            
                onClick={ () => this.props.GetPropertyJson(JSON.stringify(this.state))}
                >Done!</button>
            </div>

        );
    }
}


export default PropertyCard;