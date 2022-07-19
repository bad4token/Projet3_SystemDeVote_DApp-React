// Import NPM
import React, { useEffect, useState } from 'react';
import VotingContract from './contracts/Voting.json';
import getWeb3 from './getWeb3';

// Import ASSETS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import COMPONENTS
import CnxWeb3 from "./components/CnxWeb3";
import LogStatut from "./components/LogStatut";
import AdmintoolChangeVoteStatus from "./components/AdmintoolChangeVoteStatus";
import Intro from "./components/Intro";
import Welcome from './components/Welcome';
import RegisteringVotersResult from './components/RegisteringVotersResult';
import RegisteringVotersAction from './components/RegisteringVotersAction';
import ProposalsRegistrationResult from './components/ProposalsRegistrationResult';
import ProposalsRegistrationAction from './components/ProposalsRegistrationAction';
import VotingSessionResult from './components/VotingSessionResult';
import VotingSessionAction from './components/VotingSessionAction';
import VoteTalliedResult from './components/VoteTalliedResult';
import Footer from "./components/Footer";

// Import Bootstrap
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';


function App() {
  const [state, setState] = useState({ isOwner: false, isVoter: false, web3: null, accounts: null, contract: null });
  const [contractState, setContractState] = useState({
    owner: '',
    workflowStatus: 0
  });

  const [addrOwner, setAddrOwner] = useState(0);
  const [addrUser, setAddrUser] = useState(0);
  const [displayAdmintool, setDisplayAdmintool] = useState(0);

  const [activeTab, setActiveTab] = useState("-1");
  const [stateBulbTab1, setStateBulbTab1] = useState("⚫ 1. Welcome");
  const [stateBulbTab2, setStateBulbTab2] = useState("🔴 2. RegisteringVoters");
  const [stateBulbTab3, setStateBulbTab3] = useState("🔴 3. ProposalsRegistration");
  const [stateBulbTab4, setStateBulbTab4] = useState("🔴 4. VotingSession");
  const [stateBulbTab5, setStateBulbTab5] = useState("🔴 5. VoteTallied");

  useEffect(() => {
    (async function () {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];

        const instance = new web3.eth.Contract(VotingContract.abi, deployedNetwork && deployedNetwork.address);
        console.log(instance.methods);

        let workflowStatus = await instance.methods.workflowStatus().call();
        let owner = await instance.methods.owner().call();
        setContractState({ owner: owner, workflowStatus: workflowStatus });

        setState({ web3: web3, accounts: accounts, contract: instance });

        const addrOwner = setAddrOwner(owner);
        const addrUser = setAddrUser(accounts[0]);

        if(owner==accounts[0]){
          setDisplayAdmintool(1);
//          await SetDisplayAdmintool();
        }

        switch (workflowStatus) {
          case "0":
            setStateBulbTab2("🟢 2. RegisteringVoters");
            setActiveTab("0");
            return
          case "1":
            setStateBulbTab3("🟢 3. ProposalsRegistration");
            setActiveTab("1");
            return
          case "3":
            setStateBulbTab4("🟢 4. VotingSession");
            setActiveTab("2");
            return
          case "5":
            setStateBulbTab5("🟢 5. VoteTallied");
            setActiveTab("3");
            return
          default:
            setActiveTab("-1");
            return
        }
        
      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    })();
  }, []);

//  async function SetDisplayAdmintool(){
//    setDisplayAdmintool(1);
//  }

  if (!state.web3) {
    return (
      <div>
        <CnxWeb3></CnxWeb3>
      </div>
    );
  } else {

    return (
      <div className="App">
        <LogStatut addrUser={addrUser} />

        <AdmintoolChangeVoteStatus
          contract={state.contract}
          account={state.accounts[0]}
          displayAdmintool={displayAdmintool}
          workflowStatus={contractState.workflowStatus}
        />

        <Intro></Intro>

        <Container>
        <Row>
          <Col>
            <Tabs
              defaultActiveKey={activeTab}
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="-1" title={stateBulbTab1} tabClassName="Tab">
                <Welcome addr={state.accounts[0]} />
              </Tab>
              <Tab eventKey="0" title={stateBulbTab2} tabClassName="Tab">
              <RegisteringVotersAction
                  contract={state.contract}
                  account={state.accounts[0]}
                  workflowStatus={contractState.workflowStatus}
                />
              <RegisteringVotersResult
                  contract={state.contract}
                  account={state.accounts[0]}
                  workflowStatus={contractState.workflowStatus}
                />
              </Tab>
              <Tab eventKey="1" title={stateBulbTab3} tabClassName="Tab">
                <ProposalsRegistrationAction
                  contract={state.contract}
                  account={state.accounts[0]}
                  workflowStatus={contractState.workflowStatus}
                />
                <ProposalsRegistrationResult
                  contract={state.contract}
                  account={state.accounts[0]}
                  workflowStatus={contractState.workflowStatus}
                />
              </Tab>
              <Tab eventKey="2" title={stateBulbTab4} tabClassName="Tab">
                <VotingSessionResult
                  contract={state.contract}
                  account={state.accounts[0]}
                  workflowStatus={contractState.workflowStatus}
                />
                <VotingSessionAction
                  contract={state.contract}
                  account={state.accounts[0]}
                  workflowStatus={contractState.workflowStatus}
                />
              </Tab>
              <Tab eventKey="3" title={stateBulbTab5} tabClassName="Tab">
                <VoteTalliedResult
                  contract={state.contract}
                  account={state.accounts[0]}
                  workflowStatus={contractState.workflowStatus}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>

      <br />
      <br />
      <br />
      <Footer
        contractOwner={contractState.owner}
        contractAddr={state.contract.options.address}
      />

      </div>
    );
  }
}
export default App;