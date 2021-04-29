
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Detailed from './Detailed';
import TotalCase from './TotalCase';
import Map from './Map';
import Grid from '@material-ui/core/Grid';
import ScrollArea from'react-scrollbar';
//import CustomScroll from 'react-custom-scroll';
//import WorldMap  from './WorldMap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <ScrollArea
      speed={0.8}
      className="area"
      contentClassName="content"
      horizontal={false}
      >
      <div style={{ height: '100%', width: '100%',/* paddingBlockStart: '15px',*/ position: 'fixed', backgroundColor: "#FEF5E7" }}>
        <h4 style={{ color: '#85929E', textAlign: "center", fontSize:"2.5vw", marginTop: "1vw", marginBottom: "1vw" }}>India covid update</h4>
        <br />
       
        <div>
          <Router>
            <Grid container direction="row" justify="flex-start"
              alignItems="flex-start" spacing={2}
            >
              <Grid item xs={8} >
                <Map />
              </Grid>
              <Grid item xs={4.5}>
                 <Grid container direction="column" justify="flex-start"
                 alignItems="flex-start" spacing={2}
                 >
                       <Grid item  xs={15}>
                           <TotalCase />
                       </Grid>
                       <Grid item xs={15} >
                          <h4 style={{ color: '#85929E',fontSize:"1.5vw",  marginTop: "1vw", marginBottom: "1vw"  }}>State Wise Detailed Information </h4>
                           <Detailed />
                       </Grid>
                   </Grid>
                 { /*  <Link to="/detailed">
                    <h4 style={{ color: '#85929E',fontSize:"1.3vw" }}>State Wise Detailed Information </h4>
                    </Link>

                <Switch>
                  <Route exact path="/detailed"><Detailed /></Route>
                 </Switch>*/}
              </Grid>
            </Grid>
          </Router>
        { /*< WorldMap/>*/}
        </div>
       
      </div>
       </ScrollArea>
    );
  }
}

export default App;