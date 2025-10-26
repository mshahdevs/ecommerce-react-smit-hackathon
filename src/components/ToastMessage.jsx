import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ show, onClose, message }) => {
  return (
    <ToastContainer
      position='bottom-center'
      className='p-3'
      style={{
        zIndex: 9999,
        position: "fixed",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "400px",
      }}
    >
      <Toast show={show} onClose={onClose} delay={2000} autohide bg='success'>
        <Toast.Header closeButton={false}>
          <strong className='me-auto text-white'>Success</strong>
        </Toast.Header>
        <Toast.Body className='text-white text-center fw-semibold'>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
