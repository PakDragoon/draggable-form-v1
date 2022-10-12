import { Routes, Route } from "react-router-dom"
import ThemeProvider from "./theme"
import Form from "./views/Form"
import Login from "./views/Login"
import Signup from './views/Signup'
import "./assets/css/App.css"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
