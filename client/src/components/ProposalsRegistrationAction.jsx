import React from "react"

import { Form, Button, FloatingLabel, ToastContainer, Toast } from 'react-bootstrap';

export default class ProposalsRegistrationAction extends React.Component {

  constructor(props) {
    super(props);
    this.state = { toastResult: "-", inputValue: null  };
  }

  ProposalOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const component = this;
    await this.props.contract.methods.addProposal(this.state.inputValue).send({ from: this.props.account })
      .then(function (receipt) {
        let newProposal = receipt.events.ProposalRegistered.returnValues.proposalId;
        component.setState({ toastResult: "Proposition n°" + newProposal + " viens d'être ajoutée !" });
        setTimeout(() => window.location.reload(), 3000);
      });
  }

  render() {
    if(this.props.workflowStatus==1){
      return (
        <div className="ProposalsRegistrationAction">

          <ToastContainer className="p-3" position="top-start">
            <Toast bg='light' delay={5000} autohide>
            <Toast.Header>
                <strong className="me-auto">RESULT BOX</strong>
            </Toast.Header>
            <Toast.Body>
              {this.state.toastResult}
            </Toast.Body>
            </Toast>
          </ToastContainer>

          <h2>✏️ Enregistrement des propositions : OUVERT !</h2>
          <p>
            La phase "ProposalsRegistration" est maintenant officielement ouverte.<br />
            Vous pouvez dès à présent ajouter vos proposition qui seront soumis aux votes à l'étape suivante.
          </p>
          <br />
          <>
            <form onSubmit={this.handleSubmit} className="form">
              <FloatingLabel controlId="floatingTextarea" label="Quelle proposition souhaitez vous faire ? (ex: Du poulet pour tous à la cantine, yeah !)">
                <Form.Control
                  id="proposalDesc"
                  name="inputValue"
                  as="textarea"
                  placeholder="Ecrire une proposition"
                  style={{ height: '100px' }}
                  onChange={this.ProposalOnChange}
                />
              </FloatingLabel>
              <Button variant="primary" type="submit">
                Soumettre cette proposition au vote
              </Button>
          </form>
          </>
          <br />

        </div>
      )
    } else {
      return (
        <div className="ProposalsRegistrationAction">
          <h2>✏️ Enregistrement des propositions : FERMÉ !</h2>
          <p>
            La phase "ProposalsRegistration" n'est pas disponible actuellement.<br />
            Il n'est donc pas possible d'ajouter de nouvelles propositions.<br />
            Cependant vous pouvez consulter les propositions qui ont déjà été ajouté. 
          </p>
        </div>
      )
    }
    
  }

}