import React from "react"

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="welcome">
        <h2>👋 Bienvenue sur Voting !</h2>
        <p>
          Cette outil va vous permettre de voter pour une proposition durant la phase "VotingSession".<br />
          Vous pourrez avant cela, durant la phase "ProposalRegistration", émettre des propositions.<br />
          Puis il sera procédé au dépouillement durant la phase "VotesTallied",<br />ce qui determinera la proposition gagnante.<br />
          <strong>Bonne participation à tous !</strong>
        </p>
      </div>
    );
  }

}