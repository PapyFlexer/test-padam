import React from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoursesGrid from './components/CoursesGrid';

class App extends React.Component 
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      data:[],
      trips:[]
    }
  }

  // rafraichit le tableau de courses en fonction du point de depart actif
  async findTrips( stationName )
  {
    let url = 'https://6130d11c8066ca0017fdaa97.mockapi.io/trips?departureStop='+stationName;
    this.loadTrips(url);
  }


  // changement de selection sur le combobox
  handleStopPointChanged( value ) 
  {
    console.log(value);
    this.findTrips(value);
  }

  // recupération de toutes les courses
  async loadTrips(url)
  {
     try {
      // recuperation des trajets
      fetch(url)
      .then(res => res.json())
      // tri des trajets en fonction des destinations
      .then(json => json.sort((a,b) => a.arrivalStop.localeCompare(b.arrivalStop)))
      .then(json => this.setState({ trips : json }))
    } catch (error) {
        //log error
        console.log(error);
    }
  }
 
 
   componentDidMount()
   {
    try {
      // recuperation liste de points de depart
      fetch(`https://6130d11c8066ca0017fdaa97.mockapi.io/stops`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }))
    } catch (error) {
      console.log(error);
    }
    // chargement de toutes les courses dans le tableau CoursesGrid
    this.loadTrips('https://6130d11c8066ca0017fdaa97.mockapi.io/trips')
  }

  render()
  {
    return (
        <div className="App">
        <select id = "dropdown" onChange=
        {
          (e) => 
          {
            console.log(e.target.value); 
            // on rafraichit le tableau des courses en fonction du point de depart selectionné
            this.handleStopPointChanged(e.target.value)
          }
        }>
        <option>Choix du point de départ...</option>
        {
          // on boucle sur le tableau de retour des departurePoints
          this.state.data.map(title => (
            <option value={title}>{title}</option>
          ))
        }
      </select>
      <hr/>
      <CoursesGrid data={this.state.trips}/>   
   </div>
    )
  }
}



export default App;