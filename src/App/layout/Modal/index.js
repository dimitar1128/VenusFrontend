import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Modaler = (props) => {
  React.useEffect(() => {
    setShow(props.isVisible);
  }, [props.isVisible]);

  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
    props.onChange();
  };

  const handleYes = () => {
    props.yesAction();
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modaler;
