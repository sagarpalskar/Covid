import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
//import Typography from '@material-ui/core/Typography';
import {
    createMuiTheme,
    responsiveFontSizes,
    MuiThemeProvider,
    Typography
  } from "@material-ui/core";
  
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  const recordDate = "Record Date:- ";
  const confirmCases = " Confirm Cases:- ";
  const activeCase = " Active Case:- ";
  const recoveredCase = " Recovered Case:- ";
  const deathCase = " Death Case:- ";


class TotalCase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: '',
            date: '',
            totalConfirmeCase: '',
            totalActiveCase: '',
            totalRecoveredCase: '',
            totalDeathCase: ''

        }
    }

    async componentDidMount() {
        await axios.get('https://api.covid19india.org/data.json')
            .then(response => {
             //   toast.info("success")
                this.setState({ total: response.data.statewise[0] });

            }).catch(err => {
                toast.error("Internal Server Error")
            })

        this.setState({ totalConfirmeCase: this.state.total.confirmed });
        this.setState({ totalActiveCase: this.state.total.active });
        this.setState({ totalRecoveredCase: this.state.total.recovered });
        this.setState({ totalDeathCase: this.state.total.deaths });
        this.setState({ date: this.state.total.lastupdatedtime });

    }

    render() {
        return (
            <div>
                <ToastContainer />
                <MuiThemeProvider theme={theme}>  
                <Typography variant="h7" gutterBottom style={{ color: '#85929E'}}>India</Typography>

                <Paper elevation={9} style={{ padding: '1vw', borderRadius: '1vw', width: '120%',/* background: 'linear-gradient(to bottom left,#FC3409 10% ,#F8E4E2 80%)'*/ }} >
                
                   <Typography variant="body2" gutterBottom style={{ color: 'orange'}}>{recordDate} {this.state.date}</Typography>
                   <Typography variant="body2" gutterBottom >{confirmCases} {this.state.totalConfirmeCase}</Typography>
                   <Typography variant="body2" gutterBottom >{activeCase} {this.state.totalActiveCase}</Typography>
                   <Typography variant="body2" gutterBottom style={{ color: 'green'}} >{recoveredCase} {this.state.totalRecoveredCase}</Typography>
                   <Typography variant="body2" gutterBottom style={{ color: 'red'}} >{deathCase} {this.state.totalRecoveredCase}</Typography>

                  {/*  <Typography style={{fontSize:"1.5vw", marginBottom: "1vw" }}> Record Date {this.state.date}</Typography>
                    <Typography style={{fontSize:"1.5vw"}}>  Total Confirm Cases:- {this.state.totalConfirmeCase}</Typography>
                    <Typography style={{ fontSize:"1.5vw"}}> Total Active Case:-   {this.state.totalActiveCase}</Typography>
                    <Typography style={{ color: 'green',fontSize:"1.5vw" }}>Total Recovered Case:-  {this.state.totalRecoveredCase}</Typography>
                    <Typography style={{ color: 'red',fontSize:"1.5vw" }}>Total Death Case:-        {this.state.totalDeathCase}</Typography>*/}
                </Paper>
                </MuiThemeProvider>

            </div>
        )
    }
}
export default TotalCase;
