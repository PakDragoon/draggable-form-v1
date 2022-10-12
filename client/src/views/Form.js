import { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import FormField from '../components/inputField'
import Tools from '../components/optionFields'
import axios from 'axios'

function FormContainer() {
  const token = localStorage.getItem('token')
  const [fields, setFields] = useState([])
  const [count, setCount] = useState(0)
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);

  const trackPos = (data) => {
      setXAxis(data.x);
      setYAxis(data.y);
  };

  const stop = (type) => {
    if(xAxis > 300) add(type)
    setXAxis(0)
    setYAxis(0)
  };

  const add = (type) => {
    setCount(count + 1)
    setFields([...fields, {id: count, text: type, type: type, placeholder: `Enter ${type}`, name: count}])
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
      .then(res => {
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='p-3'>
      <div className="container border-g">
        <Row>
          <Col md={3}>
            <Tools add={add} track={trackPos} stop={stop} reset={reset} x={xAxis} y={yAxis} />
          </Col>
          <Col md={9}>
            <div className={`FormContainer tools ${xAxis > 300 ? 'background-g' : ''}`}>
              <h4>Form</h4>
              <Form id="testform" onSubmit={(e) => submitHandler(e)}>
                {fields && fields.map((value, index) => {
                  return <FormField key={index} id={value.id} name={value.name} text={value.text} type={value.type} placeholder={value.placeholder} />
                })}
                {fields.length > 0 ? <Button className='mb-3' onClick={(e) => submitHandler(e)}>Submit</Button> : ''}
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default FormContainer;
