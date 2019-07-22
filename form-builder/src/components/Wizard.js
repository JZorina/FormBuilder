import React from 'react';
import PropertyCard from './PropertyCard';
import FieldsViewer from './FieldsViewer';
import unsplash from '../api/unsplash';


class Wizard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showCard:false,
            title:'',
            type:'',
            name:'',
            label:'',
            fields:[]
            
            
        };
        this.AddField = this.AddField.bind(this);
        this.CreateProperty = this.CreateProperty.bind(this);

    }

    CreateProperty=()=>{
        this.setState({showCard:true});
    }
    onFormSubmit=(e)=>{
        //prevent the page refreshing every 'enter' press 
        e.preventDefault();
 
    }
    AddField=(e)=>{
        var prevState = JSON.parse(e);
        this.setState({name:prevState['name']});
        this.setState({label:prevState['label']});
        this.setState({type:prevState['type']});
        this.setState({showCard:false}); 
        this.pushFieldToFields();
    }

    pushFieldToFields=()=>{
        this.setState(prevState => ({
            fields: [...prevState.fields, {name:prevState.name,
                label:prevState.label,
                type:prevState.type}]
          }))
        this.setState({name:''});
        this.setState({label:''});
        this.setState({type:''});
    }


    SaveForm=()=>
    {
        const formObject={
            title:this.state.title,
            properties:this.state.fields
        };
        unsplash.post("/AddForm",{
            form: formObject
        }).then((response)=> {
           console.log("Data submitted successfully: ", response);
        }).catch((error)=> {
           console.log("got error while posting data", error);
        });
        this.nextPath("/");
    }
    nextPath=(path)=>{
        this.props.history.push(path);
    }
    render(){
        const result = this.state.fields.map((field, index) =>{
            return(
                <FieldsViewer
                    key={index} 
                    name={field.name}
                    label={field.label}
                    type={field.type}
                />
            )
            })
          
        return(
            <div className="ui segment">
            <form onSubmit={this.onFormSubmit} className="ui form"> 
                <div className="field">
                    <input 
                        required
                        style={{fontSize : "2em"}}
                        className="ui header"
                        placeholder="Place your form title here"
                        type="text" 
                        value={this.state.title } 
                        onChange={(e)=>this.setState({title:e.target.value})}
                    />

                    {
                        this.state.showCard && <PropertyCard GetPropertyJson={this.AddField}/>
                    }

                    <div>
                        <button 
                        style={{marginTop:"50px",marginBottom:"50px" }}
                        className="ui button"
                        onClick={this.CreateProperty}>
                            Add Field
                        </button>
                    </div>

                  <div>
                    {
                        this.state.fields.length>0 && [result]
                    }
                    </div>
                    <div style={DivButtonstyles}>
                        <button 
                        type='submit'
                        style={Buttonstyles}
                        className="ui button"
                        onClick={this.SaveForm}>
                        Done building my form
                        </button>
                    </div>
                </div>
            </form>

            <div style={DivButtonstyles}>
            <button 
                style={Buttonstyles}
                className="ui button"
                onClick={()=>this.nextPath('/')}>
                    Back
            </button>
            </div>
        </div>

        );
    }
}
const DivButtonstyles={
 
    alignItems : "center", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
    
}
const Buttonstyles={
 
    marginTop:"50px",
    background:"#D7BDE2 " 
    
}

export default Wizard;