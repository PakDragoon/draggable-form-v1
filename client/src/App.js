import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import ThemeProvider from "./theme"
import Form from "./views/Form"
import Login from "./views/Login"
import Signup from './views/Signup'
import SavedForms from "./views/SavedForm"
import "./assets/css/App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <ThemeProvider>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/saved" element={<SavedForms />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
