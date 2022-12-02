import { useNavigate } from "react-router-dom"
import Draggable from "react-draggable"
import { Button } from "react-bootstrap"
import { options } from "../helpers/data"
import axios from "axios"

function Tools({ reset, track, stop, x, y }) {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const logout = () => {
    axios({
      method: "POST",
      url: `https://draggable-form-v1.herokuapp.com/user/logoutAll`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        localStorage.clear()
        navigate("/", { replace: true })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="ToolsContainer tools">
      <h4>Components</h4>
      {options.map((data, i) => {
        return (
          <Draggable key={i} onDrag={(e, data) => track(data)} onStop={() => stop(data.value)} position={{ x: 0, y: 0 }}>
            <div className="drag center border-g mb-3">
              <h5>{data.label}</h5>
            </div>
          </Draggable>
        )
      })}
      <div className="tools">
        <Draggable onDrag={(e, data) => track(data)} position={{ x: 0, y: 0 }}>
          <div className="drag border-g">
            I am at: {x}, {y}
          </div>
        </Draggable>
      </div>
      <div className="center mb-3">
        <Button className="w-100" onClick={reset}>
          Reset
        </Button>
      </div>
      <div className="center">
        <Button className="w-100" variant="danger" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Tools
