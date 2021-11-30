import React from "react"
import Table from 'react-bootstrap/Table'
import ButtonWithAlert from "./ButtonWithAlert";
import 'bootstrap/dist/css/bootstrap.min.css';


class CoursesGrid extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:[]
    }
  }

async componentDidMount(){
    try {
      // recuperation des trajets
      fetch('https://6130d11c8066ca0017fdaa97.mockapi.io/trips')
      .then(res => res.json())
      // tri des trajets en fonction des points de depart
      .then(json => json.sort((a,b) => a.departureStop.localeCompare(b.departureStop)))
      .then(json => this.setState({ data: json }))
    } catch (error) {
        //log error
        console.log(error);
    }
  }
  render(){
    return (
    <div className="CoursesTable">
           <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Point de départ</th>
                    <th>Heure de départ</th>
                    <th>Point d'arrivée</th>
                    <th>Heure d'arrivée</th>
                    <th>Commander Course</th>
                    </tr>
                </thead>
                <tbody>
                   
                       {
                            this.state.data.map( row =>(
                                <tr>
                                <td>{row.departureStop}</td>
                                <td>{row.departureTime}</td>
                                <td>{row.arrivalStop}</td>
                                <td>{row.arrivalTime}</td>
                                <td><ButtonWithAlert /></td>
                                </tr>
                            ))
                       }
}
                </tbody>
            </Table>
    </div> 
  )
}

}
export default CoursesGrid