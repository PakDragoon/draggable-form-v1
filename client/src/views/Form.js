import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import FormField from '../components/inputField'
import Options from '../components/optionFields'
import { notification } from '../helpers/data'
import axios from 'axios'
import { Box, TextField, Modal, Button as MuiButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function FormContainer() {
  const token = localStorage.getItem('token')
  const [fields, setFields] = useState([])
  const [id, setId] = useState('')
  const [label, setLabel] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [type, setType] = useState('')
  const [count, setCount] = useState(0)
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);
  const [open, setOpen] = useState(false);

  const trackPos = (data) => {
      setXAxis(data.x);
      setYAxis(data.y);
  };

  const handleSubmit = () => {
    add(id, label, type, placeholder)
    setOpen(false)
  }

  const stop = (type) => {
    setType(type)
    if(xAxis > 300){ 
      setOpen(true);
      // add(type)
    }
    setXAxis(0)
    setYAxis(0)
  };

  const add = (id, label, type, placeholder) => {
    setCount(count + 1) 
    setFields([...fields, {id, text: label, type, placeholder, name: count}])
    // setFields([...fields, {id: count, text: type, type: type, placeholder: `Enter ${type}`, name: count}])
  }

  const reset = () => {
    setFields([])
    setCount(0)
  }
  
  const submitHandler = (e) => {
    e.preventDefault()
    var el = document.forms.testform
    var formData = new FormData(el)
    let data = []
    for(let i=0; i<count; i++) {
      data.push(formData.get(i))
    }
    axios({
      method: 'POST',
      url: `http://localhost:8000/data/create`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    })
      .then((res) => {
        console.log(res.data)
        setFields([])
        notification('Form has been submitted','success')
      })
      .catch((error) => {
        console.log(error)
        notification('Unable to submit the form, Try again later.', 'error')
      })
  }

  return (
    <div className='p-3'>
      <div className="container border-g">
        <Row>
          <Col md={3}>
            <Options add={add} track={trackPos} stop={stop} reset={reset} x={xAxis} y={yAxis} />
          </Col>
          <Col md={9}>
            <div className={`FormContainer tools ${xAxis > 300 ? 'background-g' : ''}`}>
              <div className="d-flex justify-content-between">
                <h4>Form</h4>
                <h4><Link to="/saved">Saved</Link></h4>
              </div>
              <Form id="testform" onSubmit={(e) => submitHandler(e)}>
                {fields && fields.map((value, index) => {
                  return <FormField key={index} id={value.id} name={value.name} text={value.text} type={value.type} placeholder={value.placeholder} />
                })}
                {fields.length > 0 ? <Button className='mb-3' onClick={(e) => submitHandler(e)}>Save</Button> : ''}
              </Form>
            </div>
          </Col>
        </Row>
        {/* Pop up */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box sx={style}>
            <Row>
              <Col md={12}>
                <TextField className='w-100' label="Id" variant="standard" onChange={(e) => setId(e.target.value)} />
              </Col>
              <Col md={12}>
                <TextField className='w-100' label="Label" variant="standard" onChange={(e) => setLabel(e.target.value)} />
              </Col>
              <Col md={12}>
                <TextField className='w-100' label="Placeholder" variant="standard" onChange={(e) => setPlaceholder(e.target.value)} />
              </Col>
              <Col md={12} className='mt-4'>
                <MuiButton onClick={handleSubmit} variant="outlined">Done</MuiButton>
              </Col>
            </Row>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default FormContainer;
