import React, { Component } from "react"

import { Badge, Alert } from 'react-bootstrap';

export default class VotesTalliedResult extends Component {
  constructor(props) {
    super(props);
    this.state = { proposals: [], winProposalId: null };
    this.getwinnerProposalId();
  }

  getwinnerProposalId = async () => {
    this.props.contract.getPastEvents('WinnerIs', { fromBlock: 0, toBlock: 'latest' })
      .then((results) => {
        let proposals = [];
        results.forEach(async (result) => {
          let proposalInfo = await this.props.contract.methods.getOneProposal(result.returnValues.proposalId).call({ from: this.props.account });
          proposals.push({ proposalId: result.returnValues.proposalId, info: proposalInfo });
          console.log(proposalInfo);
          this.setState({ proposals: proposals });
          this.setState({ winProposalId: result.returnValues.proposalId });
          
        })
        this.setState({ nbProposal: results.length });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if(this.props.workflowStatus==5){
      return (
        <div className="VotesTalliedResult">
          <h2>🎉 Dépouillement des votes :  TERMINÉ !</h2>
          <br />
          <p>
              {this.state.proposals.map(proposalInfo =>
                <p key={proposalInfo.proposalId}>
                  <h2>Le gagnant est la proposition <Badge bg="secondary">{this.state.winProposalId == null ? '...' : '#' + this.state.winProposalId}</Badge> avec {proposalInfo.info.voteCount} vote(s)</h2>
                  <Alert variant="success">
                    <h3><em>"{proposalInfo.info.description}</em>"</h3>
                  </Alert>
                </p>
              )}
            <br />
            <strong>Merci de votre partipation;</strong>
            <br />👍
            <br />
          </p>
        </div>
      )
    } else {
      return (
        <div>
        <h2>🎉 Dépouillement des votes :  EN ATTENTE !</h2>
          <p>
            La phase "VotesTallied" n'est pas disponible actuellement.<br />
          </p>
        </div>
      )
    }
  }

}