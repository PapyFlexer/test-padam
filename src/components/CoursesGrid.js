import React from "react"
import Table from 'react-bootstrap/Table'
import ButtonWithAlert from "./ButtonWithAlert";
import 'bootstrap/dist/css/bootstrap.min.css';


class CoursesGrid extends React.Component 
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      data:[]
    }
  }

  // affichage de la date au format JJ MM AAA - HH-MM
  displayDate(dateStr) 
  {
   var returnDate = new Date(dateStr);
   console.log(returnDate);
   var jour = returnDate.getDate() < 10 ? "0"+returnDate.getDate() : returnDate.getDate(); // ajout du zero avant unité
   var mois = returnDate.getMonth()+1 < 10 ? "0"+(returnDate.getMonth()+1) : returnDate.getMonth()+1 ;// ajout du zero avant unité
   var heure = returnDate.getHours() <10 ? "0"+returnDate.getHours() : returnDate.getHours();// ajout du zero avant unité
   var minutes = returnDate.getMinutes() <10 ? "0"+returnDate.getMinutes() : returnDate.getMinutes();// ajout du zero avant unité
   var returnStr = jour+"/"+mois+"/"+ returnDate.getFullYear()+ " - "+heure+":"+minutes;
   console.log("date formatée : "+returnStr)
   return returnStr;
  }

  render()
  {
    return (
        <div className="CoursesTable">
           <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Point de départ</th>
                    <th>Date et Heure de départ</th>
                    <th>Point d'arrivée</th>
                    <th>Date et Heure d'arrivée</th>
                    <th>Commander la course</th>
                    </tr>
                </thead>
                <tbody>
                   {
                      this.props.data.map( 
                        row =>(
                          <tr>
                            <td>{row.departureStop}</td>
                            <td>{this.displayDate(row.departureTime)}</td>
                            <td>{row.arrivalStop}</td>
                            <td>{this.displayDate(row.arrivalTime)}</td>
                            <td><ButtonWithAlert id={row.id}/></td>
                          </tr>
                        )
                      )
                    }
                </tbody>
            </Table>
        </div> 
      )
  }
}
export default CoursesGrid
