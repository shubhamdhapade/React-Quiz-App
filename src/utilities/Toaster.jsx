import { toast, ToastContainer } from "react-toastify"

export const showToasterMessage = (message, type) => {
    const config ={
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    }
    if(toast[type]){
        toast[type](message, config)
    } else {
        toast.info(message, config)
    }
};
const Toaster = () => {
    return <ToastContainer />
}
export default Toaster;