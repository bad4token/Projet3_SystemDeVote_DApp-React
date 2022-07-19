// Import
import PropTypesLib from 'prop-types';

import { Alert, Button } from 'react-bootstrap';

function LogStatut(props) {

    const addrUser = props.addrUser;

    if(props.addrUser!="0x0000000000000000000000000000000000000000"){
        return (
            <div className="LogWallet">
                <Alert variant="success">
                    Vous êtes connecté avec le compte <strong>{props.addrUser}</strong><br />
                    <Button variant="primary">
                        Déconnecter votre wallet
                    </Button>
                </Alert>
            </div>
        );
    } else {
        return (
            <div className="LogWallet">
                <Alert variant="danger">
                    Vous n'êtes pas connecté<br /> 
                    <Button variant="primary">
                        Connecter un wallet
                    </Button>
                </Alert>
            </div>
        );
    }
  
  }

// Vérification du type des props
LogStatut.propTypes = {
    addrUser: PropTypesLib.string.isRequired,
};


export default LogStatut;