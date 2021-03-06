import React from "react"
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/Alert";
import 'bootstrap/dist/css/bootstrap.min.css';


class ButtonWithAlert extends React.Component {
    constructor(props){
        super(props);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.setUrl = this.setUrl.bind(this);
        this.state = {
            tripId: this.props.id,
            show: false,
            success: false 
        };
    }

    // ajouter l'appel à l'API pour valider la course ou dire qu'il y a eu un pb
    // url = "https://6130d11c8066ca0017fdaa97.mockapi.io/book/:"tripId""
    // retour : si on obtient {"success:true} tout baigne sinon retour au tableau de course"}


    // eventuellement, ajouter un genre de loader en attendant le retour de l'api
  
    handleDismiss() {
      this.setState({ show: false });
    }
    setUrl() {
      return 'https://6130d11c8066ca0017fdaa97.mockapi.io/book/'+this.state.tripId
    }

    async testReservation() {
      // requete vers reservation
      const requestOptions = {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json'
          }
      };
      // recuperation tripId
      //let reqURL = 'https://6130d11c8066ca0017fdaa97.mockapi.io/book/:52';
      let reqURL = this.setUrl();
      fetch(reqURL, requestOptions)
          .then(response => response.json())
          .then(data => this.setState({
              show : true,
              success:data.success
          }));
  }
  
  
    handleShow() {
        this.testReservation();
    }
  
    render() 
    {
      if (this.state.show) {
        if (this.state.success) {
          return (
            <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
              <h4>Confirmation!</h4>
              <p>
                Votre course a bien été commandée
              </p>
              <p>
                <Button onClick={this.handleDismiss}>Refermer</Button>
              </p>
            </Alert>
          );
        } else if (!this.state.success)
        {
          return (
            <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
              <h4>Erreur!</h4>
              <p>
                Votre course n'a pas pu etre commandée
              </p>
              <p>
                <Button onClick={this.handleDismiss}>Refermer</Button>
              </p>
            </Alert>
          );
        }
      }
  
      return <Button  variant="success" onClick={this.handleShow}>Commander course</Button>;
    }
}
  
export default ButtonWithAlert;