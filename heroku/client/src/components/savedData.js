import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from 'react-bootstrap'
import axios from "axios"

function Tools({ getData }) {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    getAll()
    return () => console.log("cleanup")
    // eslint-disable-next-line
  }, [])

  const getAll = () => {
    axios({
      method: "GET",
      url: `https://draggable-form-v1.herokuapp.com/data/getAll`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
    <div className="ToolsContainer tools-saved">
      <h4>Saved Forms</h4>
      {data &&
        data.map((value, i) => {
          return (
            <div key={value._id} className="saved-forms border-g mb-3">
              <Link onClick={() => getData(value._id)} className="w-100 center">
                {value._id}
              </Link>
            </div>
          )
        })}
      <div className="center">
        <Button className="w-100" variant="danger" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Tools
