// Import NPM
import React, { Component } from "react"
import Web3 from 'web3';

// Import BOOTSTRAP
import { Form, Button, InputGroup } from 'react-bootstrap';


export default class AdmintoolAddVoters extends Component {


    render() {

        if(this.props.displayAdmintool==1){
            return (
                <div className="AdmintoolChangeVoteStatus">
                    <h4>
                        Ajouter une nouvelle adresse de votant (onlyOwner)
                    </h4>

                </div>
            )
        } else {
            return (
                <div className="AdmintoolChangeVoteStatus">
                    <strong className="me-auto">Vous n'êtes pas l'admin !</strong>
                </div>
            );
        }
        
    }
}