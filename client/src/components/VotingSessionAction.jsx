import React from "react"

import { Toast, ToastContainer, Badge } from 'react-bootstrap';

export default class VotingSessionAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toastResult: "-", selectedProposal: null, proposals: [] };
    this.getAllProposals();
  }

  onVoteSelect = e => {
    this.setState({ selectedProposal: e.target.value })
  }

  voteSubmit = async (e) => {
    e.preventDefault();

    const component = this;

    await this.props.contract.methods.setVote(this.state.selectedProposal).send({ from: this.props.account })
      .then(function (receipt) {
        let voter = receipt.events.Voted.returnValues.voter;
        let votedProposal = receipt.events.Voted.returnValues.proposalId;
        component.setState({ toastResult: voter + " a voté la proposition n°" + votedProposal });
        setTimeout(() => window.location.reload(), 3000);
      });
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
    if(this.props.workflowStatus==3){
      return (
        <div className="VotingSessionAction">

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

        <h2>📩 Enregistrement des votes : OUVERT !</h2>
        <p>
          Toutes les propositions ont été enregistrés.<br />C'est à vous maintenant de voter pour l'une d'entre elle.
        </p>

        <p><h5>Il y a <Badge bg="secondary">{this.state.nbProposal} </Badge> proposition(s) à départager, dur dur !</h5></p>

        <form onSubmit={this.voteSubmit} className="form">
          <select name="proposals" id="proposals" onChange={this.onVoteSelect}>
            {this.state.proposals.map(proposalInfo =>
              <option key={proposalInfo.proposalId} value={proposalInfo.proposalId}>{proposalInfo.info.description}</option>
            )}
          </select>
          <input type="submit" value="Vote" className="button" />
        </form>
        <br />
      </div>

      )
    } else {
      return (
        <div>
          <h2>📩 Enregistrement des votes : FERMÉ !</h2>
          <p>
            La phase "VotingSessionAction" n'est pas disponible actuellement.<br />
          </p>
        </div>
      )
    }

  }

}