import React, { Component } from "react"
import Web3 from 'web3';

import { Form, Button, InputGroup, ToastContainer, Toast } from 'react-bootstrap';

export default class RegisteringVotersAction extends Component {
  constructor(props) {
    super(props);
    this.state = { toastResult: "-", inputValue: null, addVoterResult: "-", startRegisteringResult: "-" };
  }

  OnChangeVoterInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addVoter = async (e) => {
    e.preventDefault();
    const component = this;
    await this.props.contract.methods.addVoter(Web3.utils.toChecksumAddress(this.state.inputValue)).send({ from: this.props.account })
      .then(function (receipt) {
        // will be fired once the receipt is mined
        let newVoterAddress = receipt.events.VoterRegistered.returnValues.voterAddress;
        component.setState({ toastResult: newVoterAddress + " viens d'être ajouté !" });
        setTimeout(() => window.location.reload(), 3000);
      });

  }

  render() {
    if(this.props.workflowStatus==0){
      return (
        <div className="RegisteringVotersAction">

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

          <h2>🕵️‍♂️ Enregistrement des participants : OUVERT !</h2>
          <p>
            Tous les participants sont enregistrés durant cette phase.<br />
            Seul l'administrateur peut whitelist de nouveaux participants.<br />
          </p>
          <br />
          <h4>
            Ajouter une nouvelle adresse de votant (onlyOwner)
          </h4>
          <form onSubmit={this.addVoter} className="form">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="ERC-20 address (0x...)"
                aria-label="ERC-20 address (0x...)"
                aria-describedby="basic-addon2"
                id="voterAddress"
                name="inputValue"
                onChange={this.OnChangeVoterInput}
              />
              <Button variant="primary" type="submit">
                Ajouter cette adresse
              </Button>
            </InputGroup>
          </form>
          <br />

      </div>

      )
    } else {
      return (
        <div>
          <h2>✏️ Enregistrement des propositions : FERMÉ !</h2>
          <p>
            La phase "ProposalsRegistration" n'est pas disponible actuellement.<br />
          </p>
        </div>
      )
    }
  }

}