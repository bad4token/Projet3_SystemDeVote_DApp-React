![N|Solid](https://www.coe.int/documents/14181903/15917751/logo-vote-2022.jpg/532b2399-6926-9fca-a87d-fd2d59f1ccb7?t=1654677562000)

# DApp React : Voting
## _Realisation d'une application en REACT de l'application de voting_

<br/>

## **1. Smart Contract**
Nous allons faire quelques modifications à notre Smart Contract.

<br/>

### **1.1. Utilisation des commentaires avec natspec**
Voir le [Smart Contracts](https://github.com/bad4token/Projet3_SystemDeVote_DApp-React/blob/main/truffle/contracts/Voting.sol) modifié avec les spécificitées natspec .

<br/>

### **1.2. Ajout d'un event WinnerIs**
Dans le cadre de l'application il sera nécessaire de pouvoir récupérer l'`ID` du gagnant. Pour cela ajoutons un event :

```js
event WinnerIs (uint proposalId);
```
et modifions aussi la fonction `tallyVotes()` en ajoutant un `emit`
```js
/// @dev Change status to tallyVotes and extract winner
function tallyVotes() external onlyOwner {
    require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");
    uint _winningProposalId;
    for (uint256 p = 0; p < proposalsArray.length; p++) {
        if (proposalsArray[p].voteCount > proposalsArray[_winningProposalId].voteCount) {
            _winningProposalId = p;
        }
    }
    winningProposalID = _winningProposalId;

    emit WinnerIs(winningProposalID);
    
    workflowStatus = WorkflowStatus.VotesTallied;
    emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
}
```

<br/>

### **1.3. Correction d'une faille de sécurité**
Correction :
```js




```

<br/><br/>

## **2. Application DApp**
Nous allons faire quelques modifications à notre Smart Contract.

<br/>

### **2.1. Vidéo de présentation**

<br/>

VIDEO : https://www.loom.com/share/c1e223ed05a24c0b869a8ca0d4d12df0

Désolé pour le "_toc toc toc_"

<br/>


### **2.2. Mise en ligne sur Github Pages**

Le Smart Contract a été déployé sur le testnet Ropsten à l'adresse suivante  
https://bad4token.github.io/Projet3_SystemDeVote_DApp-React

L'application est visible en ligne à l'adresse suivante.  
https://bad4token.github.io/Projet3_SystemDeVote_DApp-React







<br/><br/>

## **3. License**

MIT