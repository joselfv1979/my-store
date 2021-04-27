import '../css/AppStatus.css'
import loading from "../puff.svg";


const AppError = ({ error, removeError }) => {

    return (
        <>
            {error && (<div className="error">
                <div className="start"></div>
                <div className="content">{error}</div>
                <div className="closebtn"
                    onClick={() => {removeError()}}>x</div>
            </div>)}
        </>
    )
}

const AppMessage = ({ message, removeMessage }) => {

    return (
        <>
            {message && (<div className="success">
                <div className="start"></div>
                <div className="content">{message}</div>
                <div className="closebtn"
                    onClick={() => removeMessage()}>x</div>
            </div>)}
        </>
    )
}

const AppWaiting = () => {

    return (
        <>
            {/* {waiting && (<div className="waiting">
                <img src={loading} alt="Cargando..." />
            </div>)} */}
        </>
    )
}

export { AppError, AppMessage, AppWaiting };
