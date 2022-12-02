import { useState } from "react"
import { Link } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import Forms from "../components/savedData"
import axios from "axios"

function App() {
  const [result, setResult] = useState({})
  const token = localStorage.getItem("token")

  const getDataHandler = (id) => {
    setResult({})
    axios({
      method: "GET",
      url: `https://draggable-form-v1.herokuapp.com/data/get/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data)
        setResult(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="p-3">
      <div className="container border-g">
        <Row>
          <Col md={4}>
            <Forms getData={getDataHandler} />
          </Col>
          <Col md={8}>
            <div className="FormContainer tools-saved">
              <div className="d-flex justify-content-between">
                <h4>Form Data</h4>
                <h4>
                  <Link to="/form">Create</Link>
                </h4>
              </div>
              {result &&
                Object.keys(result).map((key, i) => {
                  return (
                    <div key={i} className="display">
                      {key}: {result[key]}
                    </div>
                  )
                })}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default App
