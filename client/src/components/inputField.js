import { Form } from 'react-bootstrap'

function InputField({ id, text, type, placeholder, name }) {
    return (
        <Form.Group className="mb-3" controlId={id}>
            <Form.Label>{text}</Form.Label>
            <Form.Control name={name} type={type} placeholder={placeholder} />
        </Form.Group>
    );
  }
  
  export default InputField;