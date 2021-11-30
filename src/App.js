import React from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dropdown from 'react-bootstrap/Dropdown';
import CoursesGrid from './components/CoursesGrid';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:[]
    }
  }
  
  handleStopPointChanged( value ) {
    console.log(value)
  }
 
  async componentDidMount(){
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

        <Dropdown.Menu onChang={(e)=>{this.handleStopPointChanged(e.value)}}e>
        {
          // on boucle sur l'array de pointspour construire les items
          this.state.data.map(title => (
          <Dropdown.Item>{title}</Dropdown.Item>
          ))}
          
        </Dropdown.Menu>
      </Dropdown>

      <CoursesGrid/>   
      
   </div>
    )
  }
}



export default App;