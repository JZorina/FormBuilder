import React from 'react';
import unsplash from '../api/unsplash';
import Table from './Table';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            forms:[],
        };
    }

    async componentDidMount()
    {
       this.GetTableDetails();
    }
   
    async GetTableDetails(){
        await unsplash.get('/getTableDetails',{
        }).then((response)=> {
            if(response.success==='false'){
                alert("cant get data from server");
            }
            else{
               
                for(var i=0;i<response.data.length;i++)
                {
                    var  formObj={
                        id:response.data[i].id,
                        title:response.data[i].title,
                        count:response.data[i].count
                    }
                    this.setState(prevState => ({
                        forms: [...prevState.forms,formObj]
                    }))
                }    
        }
        }).catch((error)=> {
            console.log("got error while posting data", error);
            });
    }
    nextPath=(path)=>{
        this.props.history.push(path);
    }
  
    render(){
        return(
            <div className="ui container" style={{marginTop:'10px'}}>
                <Table forms={this.state.forms}/>
                <div style={{alignItems : "center", 
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"}}>
                    <button
                        style={{marginTop:"50px",background:"#D7BDE2 "}}
                        className="ui button"
                        onClick={()=>this.nextPath('/Wizard')}
                    >
                    CreateForm
                    </button>   
                </div>
            </div>
        );
    }

}


export default App;
