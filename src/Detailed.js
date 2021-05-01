import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
//import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
    createMuiTheme,
    responsiveFontSizes,
    MuiThemeProvider,
    Typography
  } from "@material-ui/core";
  
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  const confirmCases = "Confirm Cases:- ";
  const activeCase = "Active Case:- ";
  const recoveredCase = "Recovered Case:- ";
  const deathCase = "Death Case:- ";

class detailed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            districtName: '',
            cityName: '',
            countryData: [],
            districtData: [],
            confirmeCase: '',
            activeCase: '',
            recoveredCase: '',
            deathCase: ''

        }
    }
    handleChange = (event) => {
        this.setState({ cityName: event.target.value });
        this.setState({ districtData: Object.entries(this.getdata(event.target.value)) });
    };
    getdata(key) {
        var countryData = [];
        this.state.countryData.forEach(function (obj) {
            if (key == obj[0]) {
                countryData = obj[1].districtData;
                return countryData;
            }
        });
        return countryData;
    }
    handleChange1 = (event) => {
        var detailedInfo = [];
        this.setState({ districtName: event.target.value });
        this.state.districtData.forEach(function (obj) {
            if (event.target.value == obj[0]) {
                detailedInfo = obj[1];
                return detailedInfo;
            }
        });
        this.setState({ confirmeCase: detailedInfo.confirmed });
        this.setState({ activeCase: detailedInfo.active });
        this.setState({ recoveredCase: detailedInfo.recovered });
        this.setState({ deathCase: detailedInfo.deceased });
        return detailedInfo;
    };

    async componentDidMount() {
        await axios.get('https://api.covid19india.org/state_district_wise.json')
            .then(response => {
                var data = Object.entries(response.data)
                this.setState({ countryData: data }, () => {
                });

            }).catch(err => {
                toast.error("Internal Server Error")
            })
    }

    render() {
        return (
            <div >
                <ToastContainer />
                <Paper elevation={9} style={{ padding: '1vw', borderRadius: '1vw', width: '120%',/* background: 'linear-gradient(to bottom left,#FC3409 10% ,#F8E4E2 80%)'*/ }} >
                <MuiThemeProvider theme={theme}>
                    {/* <InputLabel id="demo-simple-select-outlined"style={{fontSize:"1vw"}}>State Name  </InputLabel><br />*/}
                    <Typography variant="body2" gutterBottom/*style={{ fontSize: "1.2vw" }}*/> State Name </Typography>

                    <Select style={{ /*width: "90%"*/ borderRadius: '20vw', height: '50px', }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        fullWidth
                        value={this.state.cityName}
                        onChange={this.handleChange}
                        //  label="City Name"
                        variant="outlined"
                        IconComponent={props => (
                            <i {...props} className={`material-icons ${props.className}`}>
                             <ArrowDropDownIcon style={{ fontSize: "2vw" }}/>    </i>
                          )} 
                    >
                        {
                            this.state.countryData.map((data, i) => (
                                <MenuItem value={data[0]}>
                                   {/* <div style={{ fontSize: "1.3vw" }}>
                                        {data[0]}
                                       </div>*/}
                                    <Typography variant="caption" gutterBottom >  {data[0]}</Typography>

                                </MenuItem>
                            ))}
                        <MenuItem value="">
                        <Typography variant="caption" gutterBottom >None</Typography>
                           {/* <div style={{ fontSize: "1.3vw" }}> None  </div>*/}
                        </MenuItem>

                    </Select><br />

                    <Typography variant="body2" gutterBottom /*style={{ fontSize: "1.2vw" }}*/> District Name  </Typography>

                    {/* <InputLabel id="demo-simple-select-outlined" style={{fontSize:"1vw"}}>District Name  </InputLabel><br />*/}
                    <Select style={{ /*width: '20vw',*/ borderRadius: '20vw', height: '50px', }}
                        labelId="demo-simple-select-outlined"
                        id="demo-simple-select-outlined"
                        fullWidth
                        value={this.state.age}
                        onChange={this.handleChange1}
                        //    label="District Name"
                        variant="outlined"
                          IconComponent={props => (
                            <i {...props} className={`material-icons ${props.className}`}>
                             <ArrowDropDownIcon style={{ fontSize: "2vw" }}/>    </i>
                          )} 
                    >
                        {
                            this.state.districtData.map((data, i) => (
                                <MenuItem value={data[0]}>
                                    {/*<div style={{ fontSize: "1.3vw" }}>
                                        {data[0]}
                                       </div>*/}
                                    <Typography variant="caption" gutterBottom >  {data[0]}</Typography>
                                </MenuItem>
                            ))}
                        <MenuItem value="">
                        <Typography variant="caption" gutterBottom >None</Typography>
                            {/*<div style={{ fontSize: "1.3vw" }}> None </div>*/}
                        </MenuItem>

                    </Select>
                    <Typography variant="body2" gutterBottom >{confirmCases} {this.state.confirmeCase}</Typography>
                    <Typography variant="body2" gutterBottom >{activeCase} {this.state.activeCase}</Typography>
                    <Typography variant="body2" gutterBottom style={{ color: 'green'}}>{recoveredCase} {this.state.recoveredCase}</Typography>
                    <Typography variant="body2" gutterBottom style={{ color: 'red'}}>{deathCase} {this.state.deathCase}</Typography>

                   { /*<Typography style={{ fontSize: "1.5vw" }}> Confirme Cases: {this.state.confirmeCase}</Typography>
                    <Typography style={{ fontSize: "1.5vw" }}>  Active Case: {this.state.activeCase}</Typography>
                    <Typography style={{ color: 'green', fontSize: "1.5vw" }}>Recovered Case: {this.state.recoveredCase}</Typography>
                    <Typography style={{ color: 'red', fontSize: "1.5vw" }}>Death Case: {this.state.deathCase}</Typography>*/}
                    </MuiThemeProvider>
                </Paper>
            </div>
        )
    }
}
export default detailed;
