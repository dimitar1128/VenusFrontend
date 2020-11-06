import React from 'react';
import { Toast } from 'react-bootstrap';

const Toaster = (props) => {
  React.useEffect(() => {
    setShow(props.isVisible);
  }, [props.isVisible]);

  const [show, setShow] = React.useState(false);
  return (
    <Toast
      onClose={() => {
        setShow(false);
        props.onChange();
      }}
      show={show}
      delay={1500}
      autohide
      style={{
        position: 'absolute',
        top: 25,
        right: 10,
        zIndex: 100,
      }}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">{props.message}</strong>
      </Toast.Header>
    </Toast>
  );
};

export default Toaster;
