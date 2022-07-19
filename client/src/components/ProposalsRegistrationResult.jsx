import React from "react"

import { Form, FloatingLabel, Button, Badge, Table } from 'react-bootstrap';


export default class ProposalsRegistrationResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { proposals: [] };
    this.getAllProposals();
  }

  getAllProposals = async () => {
    this.props.contract.getPastEvents('ProposalRegistered', { fromBlock: 0, toBlock: 'latest' })
      .then((results) => {
        let proposals = [];
        results.forEach(async (result) => {
          let proposalInfo = await this.props.contract.methods.getOneProposal(result.returnValues.proposalId).call({ from: this.props.account });
          proposals.push({ proposalId: result.returnValues.proposalId, info: proposalInfo });
          console.log(proposalInfo);
          this.setState({ proposals: proposals });
        })
        this.setState({ nbProposal: results.length });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <p>
          <h4>Il y a actuellement <Badge bg="secondary">{this.state.nbProposal} </Badge> proposition(s) d'enregistrée(s).</h4>
          Seules les personnes VOTANTES peuvent consulter la liste des propositions.
        </p>
        <br />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#ID</th>
              <th>Description de la proposition</th>
              <th>Nombre de vote reçu</th>
            </tr>
          </thead>
          <tbody>
            {this.state.proposals.map(proposalInfo =>
              <tr key={proposalInfo.proposalId}>
                <td>{proposalInfo.proposalId}</td>
                <td>{proposalInfo.info.description}</td>
                <td>{proposalInfo.info.voteCount}</td>
              </tr>
            )}
          </tbody>
        </Table>

      </div>
    )
  }
}