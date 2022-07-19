import { Button, Spinner } from 'react-bootstrap';

function CnxWeb3() {
  return (
    <div className="CnxWeb3">
      <br />
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="xl"
          role="status"
          aria-hidden="true"
        />
         <br />Loading WEB3...
      </Button>
    </div>
  );
}

export default CnxWeb3;