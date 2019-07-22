import React from 'react';
import unsplash from '../api/unsplash';
import FieldsViewer from './FieldsViewer';
var result;
class FormViewer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:props.match.params.id,
            Schema:[],
            flag:false,
            formData:[],

        }
        this.initialStateformData = { ...this.state.formData } 
    }
     componentDidMount=async()=>{
        this.getFormDetails();
    }
    async getFormDetails(){
        await unsplash.post('/getFormSchema',{
            id:this.props.match.params.id
        }).then((response)=> {
            if(response.data.success===true){
                var schema=JSON.parse(response.data.data[0].formSchema);
                this.setState({Schema:schema});
                this.setState({flag:true});
            }
            else
            console.log(response);
    }).catch((error)=> {
        console.log("got error while posting data", error);
     });
     console.log(this.state.Schema);
    }
    onFormSubmit=(e)=>{
        //prevent the page refreshing every 'enter' press 
        e.preventDefault();

    }
    nextPath=(path)=>{
        this.props.history.push(path);
    }
    validateForm=()=>
    {
        if(Object.keys(this.state.formData).length)
            this.SaveForm();
        else
        alert("please fill out the form :)");
    }
    SaveForm=()=>
    {
        unsplash.post("/SaveData",{
            data: this.state.formData,
            id:this.state.id
        }).then((response)=> {
            alert("Thankyou for you feedback :)");
            this.setState({formData:[]});
            console.log(this.state.values);
            console.log(this.state.formData);
            console.log(Object.keys(this.state.formData));

            if(response.success)
                console.log("Data submitted successfully: ", response);

                
        }).catch((error)=> {
           console.log("got errr while posting data", error);
        });
        
        //this.nextPath("/");
    }
    ChangeVal=(label,e)=>{

        const fields={...this.state.formData}
        fields[label]= e.target.value;
        this.setState({formData:fields});

    }

    resetForm(){
        this.setState(this.initialStateformData );
    }
    render(){  
        if(this.state.flag){
            result=this.state.Schema.properties.map((item, index)=>{

                return(
                <FieldsViewer
                    key={index} 
                    label={item.label}
                    type={item.type}
                    handleChange={this.ChangeVal.bind(this, item.label)}
                        />
            
                        )})
            }
        return(
            <div className="ui segment">
                <div style={{padding:"80px",fontSize : "30px"}}>
                    <h1 className="ui header">{this.state.Schema.title}</h1>
                </div>
                <form onSubmit={this.onFormSubmit}  className="ui form"> 
                {     
                      this.state.flag && [result]
                }
                 <div style={DivButtonstyles}>
                 <button 
                    style={ButtonDonestyles}
                    type='submit'
                    className="ui button"
                    onClick={this.validateForm}>
                       Done!
                    </button>
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
const ButtonDonestyles={
 
    width:"17em",
    marginTop:"50px",
    background:"#D7BDE2 " 
    
}
const Buttonstyles={
 
    width:"13em",
    marginTop:"30px",
    background:"#D7BDE2 " 
    
}

export default FormViewer;
