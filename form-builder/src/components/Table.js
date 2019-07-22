import React from 'react';

class Table extends React.Component{
        constructor(props){
        super(props);
        }

    render(){
            return(
            <div>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Form Id</th>
                            <th>Form Name</th>
                            <th># Submissions</th>
                            <th>Submit Page	</th>
                            <th>Submissions Page</th>
                    </tr>
                    </thead>
                    <tbody>{this.props.forms.map(function(item,key){
                        return(
                            <tr key={key}>
                            <td data-label="Form Id">{item.id}</td>
                            <td data-label="Form Name">{item.title}</td>
                            <td data-label="# Submissions">{item.count}</td>
                            <td data-label="Submit Page">
                                <a href={`/FormViewer/${item.id}/`}>View</a></td>
                            <td data-label="Submissions Page">
                                <a href={`/DataViewer/${item.id}/`}>View</a></td>
                            </tr>
                         )
                        })}
                    </tbody>
                    </table>
                </div>
        );
    }
}

export default Table;
