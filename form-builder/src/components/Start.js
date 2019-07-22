import React from 'react';
import { Route, BrowserRouter as Router ,Switch} from 'react-router-dom';
import App from './App';
import Wizard from './Wizard';
import FormViewer from './FormViewer';
import DataViewer from './DataViewer';


  class Start extends React.Component{
    render(){
      return(
        <Router>
            <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/Wizard" component={Wizard} />
                <Route path="/FormViewer/:id" component={FormViewer} />
                <Route path="/DataViewer/:id" component={DataViewer} />
            </Switch>
            </div>
    </Router>
       
      );
    }
  
  }
  
  export default Start;
