import React from 'react';
import unsplash from '../api/unsplash';
import RenderRow from './RenderRow';

class DataViewer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            headers:[],
            flag:false,
            data:[]
        }
    }
    nextPath=(path)=>{
        this.props.history.push(path);
    }

    componentDidMount=async()=>{
        this.getFormSchema();
        this.getFormData();
        
    }

    getFormData=async()=>{
        await unsplash.post('/getFormData',{
            id:this.props.match.params.id
        }).then((response)=> {
            if(response.data.length>0){

                for(var i=0;i<response.data.length;i++)
                {
                    var  formObj=JSON.parse(response.data[i].data)

                    this.setState(prevState => ({
                        data: [...prevState.data,formObj]
                    }))
                }
 
            }
            else{
               

            }
            console.log(response);
    }).catch((error)=> {
        console.log("got error while posting data", error);
     });
     console.log(this.state);
    }
    getFormSchema=async()=>{
        await unsplash.post('/getFormSchema',{
            id:this.props.match.params.id
        }).then((response)=> {
            if(response.data.success===true){
                var schema=JSON.parse(response.data.data[0].formSchema);
                this.setState({headers:schema.properties});
                this.setState({flag:true});
              
            }
            else
            console.log(response);
    }).catch((error)=> {
        console.log("got error while posting data", error);
     });
    }

    getKeys = function(){
        var res=[];
        this.state.headers.map((item) => {
            res.push(item.label)
        });
            return res;
        }

    getHeader = function(){
        var keys = this.getKeys();
        return keys.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
        })
    }

   
     renderTableData() {
        return this.state.data.keys.map((key, index)=>{
            return <td key={this.state.data[key]}>{this.state.data[key]}</td>
            })
     }
     getRowsData = function(){
        var items = this.state.data;
        var keys = this.getKeys();
        return items.map((row, index)=>{
        return <tr key={index}><RenderRow key_={index} data={row} keys={keys}/></tr>
        })
        }
    render(){
       
        return(
            <div className="ui container" style={{marginTop:'10px'}}>
            <table className="ui celled table" id='FormData'>
                <thead>
                <tr>{this.getHeader()}</tr>
                </thead>
               <tbody>
               {this.getRowsData()}
               </tbody>
            </table>
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
    width:"13em",
    marginTop:"50px",
    background:"#D7BDE2 " 
    
}
export default DataViewer;