import React, { useContext } from 'react';
import { AppContext } from "../context/AppContext";
import '../css/AppStatus.css'
import loading from "../puff.svg";


const AppError = () => {

    const { error, setError } = useContext(AppContext);

    return (
        <>
            {error && (<div className="error">
                <div className="start"></div>
                <div className="content">{error}</div>
                <div className="closebtn"
                    onClick={() => setError(null)}>x</div>
            </div>)}
        </>
    )
}

const AppMessage = () => {

    const { message, setMessage } = useContext(AppContext);

    return (
        <>
            {message && (<div className="success">
                <div className="start"></div>
                <div className="content">{message}</div>
                <div className="closebtn"
                    onClick={() => setMessage(null)}>x</div>
            </div>)}
        </>
    )
}

const AppWaiting = () => {

    const { waiting } = useContext(AppContext);

    return (
        <>
            {waiting && (<div className="waiting">
                <img src={loading} alt="Cargando..." />
            </div>)}
        </>
    )
}

export { AppError, AppMessage, AppWaiting }
