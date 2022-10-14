import { toast } from "react-toastify"

const config = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const notification = (message, type) => toast[type](message, config)

export const options = [
    { label: 'Text', value: 'text' }, 
    { label: 'Email', value: 'email'},
    { label: 'Password', value: 'password'},
    { label: 'Number', value: 'number'},
    { label: 'Phone', value: 'tel'},
    { label: 'File', value: 'file'},
    { label: 'Date', value: 'date'},
    { label: 'Time', value: 'time'},
    { label: 'Url', value: 'url'},
    { label: 'Range', value: 'range'}
]

