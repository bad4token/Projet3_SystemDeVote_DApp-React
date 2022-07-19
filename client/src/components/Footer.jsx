import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <p>Contract address is <strong>{this.props.contractAddr}</strong> | Contract owner is <strong>{this.props.contractOwner}</strong></p>
        <strong>VOTING-DAPP for Alyra Project #3 </strong>
      </div>
    );
  }
}