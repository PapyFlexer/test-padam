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

  displayDate(dateStr) {
   var returnDate = new Date(dateStr);
   console.log(returnDate);
   var jour = returnDate.getDate() < 10 ? "0"+returnDate.getDate() : returnDate.getDate() ;
   var mois = returnDate.getMonth()+1 < 10 ? "0"+(returnDate.getMonth()+1) : returnDate.getMonth()+1 ;
   var heure = returnDate.getHours() <10 ? "0"+returnDate.getHours() : returnDate.getHours();
   var minutes = returnDate.getMinutes() <10 ? "0"+returnDate.getMinutes() : returnDate.getMinutes();
   return jour+"/"+mois+"/"+ returnDate.getFullYear()+ " - "+heure+":"+minutes;
  }

    componentDidMount(){
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
                    <th>Date et Heure de départ</th>
                    <th>Point d'arrivée</th>
                    <th>Date et Heure d'arrivée</th>
                    <th>Commander Course</th>
                    </tr>
                </thead>
                <tbody>
                   
                       {
                            this.state.data.map( row =>(
                                <tr>
                                <td>{row.departureStop}</td>
                                <td>{this.displayDate(row.departureTime)}</td>
                                <td>{row.arrivalStop}</td>
                                <td>{this.displayDate(row.arrivalTime)}</td>
                                <td><ButtonWithAlert id={row.id}/></td>
                                </tr>
                            ))
                       }

                </tbody>
            </Table>
    </div> 
  )
}

}
export default CoursesGrid