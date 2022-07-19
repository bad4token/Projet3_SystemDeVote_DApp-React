// Import
import React from "react"

import { ToastContainer, Toast, Button } from 'react-bootstrap';

export default class AdmintoolChangeVoteStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { toastResult2: "-" };
    }

    OnChangeVoterInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    };
    startProposalsRegistering = async (e) => {
        e.preventDefault();
        const component = this;
        await this.props.contract.methods.startProposalsRegistering().send({ from: this.props.account })
        component.setState({ toastResult2: "La phase 'ProposalsRegistering' est maintenant ouverte !" });
        setTimeout(() => window.location.reload(), 3000);
    }

    stopProposalsRegistering = async (e) => {
        e.preventDefault();
        const component = this;
        await this.props.contract.methods.endProposalsRegistering().send({ from: this.props.account })
        component.setState({ toastResult2: "La phase 'ProposalsRegistering' est maintenant fermé !" });
        setTimeout(() => window.location.reload(), 3000);
    }

    startVotingSession = async (e) => {
        e.preventDefault();
        const component = this;
        await this.props.contract.methods.startVotingSession().send({ from: this.props.account })
        component.setState({ toastResult2: "La phase 'VotingSession' est maintenant ouverte !" });
        setTimeout(() => window.location.reload(), 3000);
    }

    endVotingSession = async (e) => {
        e.preventDefault();
        const component = this;
        await this.props.contract.methods.endVotingSession().send({ from: this.props.account })
        component.setState({ toastResult2: "La phase 'VotingSession' est maintenant fermé !" });
        setTimeout(() => window.location.reload(), 3000);
    }

    tallyVotes = async (e) => {
        e.preventDefault();
        const component = this;
        await this.props.contract.methods.tallyVotes().send({ from: this.props.account })
        component.setState({ toastResult2: "La phase 'tallyVotes' est maintenant ouverte !" });
        setTimeout(() => window.location.reload(), 3000);
    }
    resetyVotes = async (e) => {
        alert("VOTING TERMINE\nCette fonction n'est pas disponible pour le moment.")
    }
    

    render() {

        if(this.props.displayAdmintool==1){
            switch (Number(this.props.workflowStatus)) {
                case 0: // Button launch ProposalsRegistrationStarted
                    return (
                        <div className="AdmintoolChangeVoteStatus">
                            <ToastContainer className="p-3" position="top-end">
                                <Toast bg="dark">
                                <Toast.Header>
                                    <strong className="me-auto">ADMIN TOOL</strong>
                                </Toast.Header>
                                <Toast.Body className="dark text-white">
                                    <>
                                    Current statut is : <strong>RegisteringVoters</strong><br />
                                    <div className="mb-2">
                                    <form onSubmit={this.startProposalsRegistering} className="form">
                                        <Button variant="primary" type="submit">
                                            Start ProposalsRegistration
                                        </Button>
                                        </form>
                                    </div>
                                    {this.state.toastResult2}
                                    </>
                                </Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </div>
                    );
                    case 1: // Button launch ProposalsRegistrationEnded
                    return (
                        <div className="AdmintoolChangeVoteStatus">
                            <ToastContainer className="p-3" position="top-end">
                                <Toast bg="dark">
                                <Toast.Header>
                                    <strong className="me-auto">ADMIN TOOL</strong>
                                </Toast.Header>
                                <Toast.Body className="dark text-white">
                                    <>
                                    Current statut is : <strong>ProposalsRegistrationStarted</strong><br />
                                    <div className="mb-2">
                                    <form onSubmit={this.stopProposalsRegistering} className="form">
                                        <Button variant="primary" type="submit">
                                            Stop ProposalsRegistration
                                        </Button>
                                        </form>
                                    </div>
                                    {this.state.toastResult2}
                                    </>
                                </Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </div>
                    );
                case 2: // Button launch VotingSessionStarted
                    return (
                        <div className="AdmintoolChangeVoteStatus">
                            <ToastContainer className="p-3" position="top-end">
                                <Toast bg="dark">
                                <Toast.Header>
                                    <strong className="me-auto">ADMIN TOOL</strong>
                                </Toast.Header>
                                <Toast.Body className="dark text-white">
                                    <>
                                    Current statut is : <strong>ProposalsRegistrationEnded</strong><br />
                                    <div className="mb-2">
                                    <form onSubmit={this.startVotingSession} className="form">
                                        <Button variant="primary" type="submit">
                                            Start VotingSession
                                        </Button>
                                        </form>
                                    </div>
                                    {this.state.toastResult2}
                                    </>
                                </Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </div>
                    );
                case 3: // Button launch VotingSessionEnded
                    return (
                        <div className="AdmintoolChangeVoteStatus">
                            <ToastContainer className="p-3" position="top-end">
                                <Toast bg="dark">
                                <Toast.Header>
                                    <strong className="me-auto">ADMIN TOOL</strong>
                                </Toast.Header>
                                <Toast.Body className="dark text-white">
                                    <>
                                    Current statut is : <strong>VotingSessionStarted</strong><br />
                                    <div className="mb-2">
                                    <form onSubmit={this.endVotingSession} className="form">
                                        <Button variant="primary" type="submit">
                                            Stop VotingSession
                                        </Button>
                                        </form>
                                    </div>
                                    {this.state.toastResult2}
                                    </>
                                </Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </div>
                    );
                case 4: // Button launch VoteTallied
                    return (
                        <div className="AdmintoolChangeVoteStatus">
                            <ToastContainer className="p-3" position="top-end">
                                <Toast bg="dark">
                                <Toast.Header>
                                    <strong className="me-auto">ADMIN TOOL</strong>
                                </Toast.Header>
                                <Toast.Body className="dark text-white">
                                    <>
                                    Current statut is : <strong>VotingSessionEnded</strong><br />
                                    <div className="mb-2">
                                    <form onSubmit={this.tallyVotes} className="form">
                                        <Button variant="primary" type="submit">
                                            Launch VoteTallied
                                        </Button>
                                        </form>
                                    </div>
                                    {this.state.toastResult2}
                                    </>
                                </Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </div>
                    );
                default:
                    console.log('Workflow status: ' + this.props.workflowStatus);
                    return (
                        <div className="AdmintoolChangeVoteStatus">
                            <ToastContainer className="p-3" position="top-end">
                                <Toast bg="dark">
                                <Toast.Header>
                                    <strong className="me-auto">ADMIN TOOL</strong>
                                </Toast.Header>
                                <Toast.Body className="dark text-white">
                                    <>
                                    <div className="mb-2">
                                    <form onSubmit={this.resetyVotes} className="form">
                                        <Button variant="danger" type="submit">
                                            Reset Voting
                                        </Button>
                                        </form>
                                    </div>
                                    Cette fonction n'est pas disponible<br /> dans le <strong>Smart Contract</strong> !
                                    </>
                                </Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </div>
                    );

                    return <p>Error workflow</p>;
            }
        } else {
            return (
                <div className="AdmintoolChangeVoteStatus">
                    <ToastContainer className="p-3" position="top-end">
                        <Toast bg="danger" delay={5000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Vous n'êtes pas l'admin !</strong>
                            </Toast.Header>
                        </Toast>
                    </ToastContainer>
                </div>
            );
        }
        
    }
}