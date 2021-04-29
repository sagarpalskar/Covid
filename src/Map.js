import React from "react";
import { VectorMap } from "react-jvectormap";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

class map extends React.Component {
  state = {
    map: [
      { code: 'IN-BR', value: 566 },
      { code: 'IN-PY', value: 800 },
      { code: 'IN-DD', value: 900 },
      { code: 'IN-DL', value: 500 },
      { code: 'IN-NL', value: 1000 },
      { code: 'IN-HP', value: 10000 },
      { code: 'IN-HR', value: 800 },
      { code: 'IN-WB', value: 900 },

      { code: 'IN-HP', value: 10000 },
      { code: 'IN-HR', value: 800 },
      { code: 'IN-AS', value: 1000 },
      { code: 'IN-UT', value: 14000 },
      { code: 'IN-UP', value: 300 },
      { code: 'IN-JK', value: 200 },
      { code: 'IN-NR', value: 500 },
      { code: 'IN-JH', value: 500 },
      { code: 'IN-SK', value: 500 },

      { code: 'IN-MZ', value: 10000 },
      { code: 'IN-CT', value: 800 },
      { code: 'IN-CH', value: 900 },
      { code: 'IN-GA', value: 500 },
      { code: 'IN-GJ', value: 1000 },
      { code: 'IN-RJ', value: 14000 },
      { code: 'IN-MP', value: 300 },
      { code: 'IN-OR', value: 200 },
      { code: 'IN-TN', value: 10000 },
      { code: 'IN-AN', value: 800 },
      { code: 'IN-AP', value: 900 },
      { code: 'IN-AR', value: 500 },
      { code: 'IN-KA', value: 1000 },
      { code: 'IN-PB', value: 14000 },
      { code: 'IN-ML', value: 300 },
      { code: 'IN-MN', value: 200 },
      { code: 'IN-MH', value: 300 },
      { code: 'IN-KL', value: 200 },
    ],
    indiaState: [],
    data: [],
    city: '',
    count: ''
  }

  handleClick = (event, code) => {
 //   var res = code.replace("IN-", "");
    console.log(`You have click ${code}`)

  }
  getdata(key) {
    var countryData = [];
    this.state.indiaState.forEach(function (obj) {
      countryData[obj.statecode] = obj;
    });
    return countryData[key];
  }

  getalldata() {
    var countryData = [];
    this.state.indiaState.forEach(function (obj) {
      countryData[`IN-${obj.statecode}`] = parseInt(obj.active);
    });

    return countryData;
  }

  changeBg() {
    this.refs.map.setBackgroundColor('red');
  }

  handleshow2 = (e, el, code) => {
    var res = code.replace("IN-", "");
    if(this.getdata(res) == undefined){
       el.html(el.html() +
      `<br> Not Found <br>`
    );}
    else{
        el.html(el.html() +
          `<br>
          <br> Confirmed cases: ${this.getdata(res).confirmed}<br>
          <br> Active cases: ${this.getdata(res).active}<br>
          <br> Deaths cases: ${this.getdata(res).deaths}<br>`
        );
    }
  };
  async componentDidMount() {
    await axios.get('https://api.covid19india.org/data.json')
      .then(response => {
      //  toast.info("success")
        this.setState({ indiaState: response.data.statewise });

      }).catch(err => {
        toast.error("Internal Server Error")
      })
  }
  render() {
    return (
      <div>
      <ToastContainer />

      <VectorMap 
        map={"in_mill"}
        backgroundColor="#FEF5E7"
        focusOn={{
          x: 0.5,
          y: 0.5,
          scale: 0,
          animate: false
        }}
        zoomOnScroll={true}
        containerStyle={{
          width: "100%",
          height: "580px"
        }}
        onRegionClick={this.handleClick} //gets the country code
        onRegionTipShow={this.handleshow2}
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
            fill: 'blue'
          },
          selected: {
            fill: 'white'
          },
        }}

        regionsSelectable={false}
        series={{
          regions: [
            {
              values: this.getalldata(), //can be directly served //with api response or any data
              scale: ['#F8E4E2', '#FC3409'], //color range
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
      </div>
    )
  }
}
export default map;
