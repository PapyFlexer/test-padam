import React from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dropdown from 'react-bootstrap/Dropdown';
import CoursesGrid from './components/CoursesGrid';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      trips:[]
    }
  }
  
  handleStopPointChanged( value ) {
    console.log(value);
    this.findTrips(value);
  }

  async findTrips( stationName )
  {
    let url = 'https://6130d11c8066ca0017fdaa97.mockapi.io/trips?departureStop='+stationName;
    this.loadTrips(url);
  }

  async loadTrips(url)
  {
     try {
      // recuperation des trajets
      fetch(url)
      .then(res => res.json())
      // tri des trajets en fonction des points de depart
      .then(json => json.sort((a,b) => a.departureStop.localeCompare(b.departureStop)))
      .then(json => this.setState({ trips : json }))
    } catch (error) {
        //log error
        console.log(error);
    }
  }
 
 
   componentDidMount(){
    //this.loadTrips('https://6130d11c8066ca0017fdaa97.mockapi.io/trips');
    try {
      // recuperation liste de points de depart
      fetch(`https://6130d11c8066ca0017fdaa97.mockapi.io/stops`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }))
    } catch (error) {
      console.log(error);
    }
  }

  render(){
      return (
    <div className="App">
       <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Choix du point de depart
        </Dropdown.Toggle>

        <Dropdown.Menu onChange={(e)=>{this.handleStopPointChanged(e.value)}}e>
        {
          // on boucle sur l'array de pointspour construire les items
          this.state.data.map(title => (
          <Dropdown.Item>{title}</Dropdown.Item>
          ))}
          
        </Dropdown.Menu>
      </Dropdown>

      <CoursesGrid data={this.state.trips}/>   
      
   </div>
    )
  }
}



export default App;