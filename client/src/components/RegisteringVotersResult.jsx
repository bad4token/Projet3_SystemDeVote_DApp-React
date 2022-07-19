import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Form, FloatingLabel, Button, Badge, InputGroup, Offcanvas, Table } from 'react-bootstrap';


export default class RegisteringVotersResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nbVoter: 0, voters: [] };
    this.getAllVoters();
    this.getAllVotes();
  }

  componentDidMount(){
    this.getAllVoters = this.getAllVoters.bind(this);
    this.getAllVotes = this.getAllVotes.bind(this);
  }

  getAllVoters = async () => {
    const component = this;
    this.props.contract.getPastEvents('VoterRegistered', { fromBlock: 0, toBlock: 'latest' })
      .then((results) => {
        let voters = [];
        results.forEach(async (result) => {
          let voterInfo = await this.props.contract.methods.getVoter(result.returnValues.voterAddress).call({ from: this.props.account });
          voters.push({ address: result.returnValues.voterAddress, info: voterInfo });
          this.setState({ voters: voters });
        });
        this.setState({ nbVoter: results.length });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllVotes = async () => {
    this.props.contract.getPastEvents('Voted', { fromBlock: 0, toBlock: 'latest' })
      .then((results) => {
        results.forEach(async (result) => {
          console.log(result);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="RegisteringVotersResult">
        <Container>
          <Row>
          <Col sm={6}>
            Nombre total de participants<h3><Badge bg="secondary">{this.state.nbVoter}</Badge></h3><br />
          </Col>
          <Col sm={6}>Votre adresse est <br /><strong>{this.props.account}</strong></Col>
          </Row>
        </Container>

        <h4>Participants enregistrés</h4>
        <p>
          Seules les personnes WHITELIST peuvent consulter la liste des participants.
        </p>
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
              <th>Adresse du votant</th>
              <th>As-il déjà voté ?</th>
              <th>Si oui, quoi ?</th>
            </tr>
          </thead>
          <tbody>
            {this.state.voters.map(voterInfos =>
                <tr key={voterInfos.address}>
                  <td>{voterInfos.address}</td>
                  <td>{voterInfos.info.hasVoted ? 'Oui' : 'Non'}</td>
                  <td>{voterInfos.info.hasVoted ? 'id=' + voterInfos.info.votedProposalId : '-'}</td>
                </tr>
            )}
          </tbody>
        </Table>

      </div >
    )
  }
}