
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Detailed from './Detailed';
import TotalCase from './TotalCase';
import Map from './Map';
import Grid from '@material-ui/core/Grid';
import ScrollArea from 'react-scrollbar';
//import CustomScroll from 'react-custom-scroll';
//import WorldMap  from './WorldMap';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Typography
} from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const heading = "India Covid Update";

class App extends React.Component {
  render() {
    return (

      <div style={{ height: '100%', width: '100%',/* paddingBlockStart: '15px',*/ position: 'fixed', backgroundColor: "#FEF5E7" }}>
        <MuiThemeProvider theme={theme}>
          <Typography variant="h4" gutterBottom style={{ color: '#85929E', textAlign: "center", marginTop: "1vw", marginBottom: "1vw" }}>
            {heading}
          </Typography>
        </MuiThemeProvider>
        {/*<h4 style={{ color: '#85929E', textAlign: "center", fontSize:"2.5vw", marginTop: "1vw", marginBottom: "1vw" }}>India Covid Update</h4>*/}
        <br />
        <div>
          <Router>
            <Grid container direction="row" justify="flex-start"
              alignItems="flex-start" spacing={2}
            >
              <Grid item xs={7} >
                <Map />
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column" justify="flex-start"
                  alignItems="flex-start" spacing={2}
                >
                  <Grid item xs={15}>
                    <TotalCase />
                  </Grid>
                  <Grid item xs={15} >
                    {/* <h4 style={{ color: '#85929E',fontSize:"1.5vw",  marginTop: "1vw", marginBottom: "1vw"  }}>State Wise Detailed Information </h4>*/}
                    <Typography variant="h7" gutterBottom style={{ color: '#85929E' }}>State Wise Detailed Information</Typography>
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
          {/*< WorldMap/>*/}
        </div>

      </div>

    );
  }
}

export default App;