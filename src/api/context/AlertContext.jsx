import React, { createContext, useContext, useState } from "react";
import '../../assets/style/Notification.css';
import { RiAddCircleFill  } from "react-icons/ri";
import settings from "../../assets/data/settings.json";


const AlertContext = createContext();

export const AlertProvider = ({children}) => {
    const [alerts, setAlerts] = useState([]);
    const [popup, setPopup] = useState({enabled: false, win: false, attempts: 0, maxAttempts: 6});

    const addAlert = (message, type="info", duration=1400) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, {id, message, type}]);
        
        setTimeout(() => {
            setAlerts((prev) => prev.filter((alert) => alert.id !== id));
        }, duration);
    };

    const addPopup = (message, win, attempts, maxAttempts) => {
        setPopup({enabled: true, win: win, message: message, attempts: attempts, maxAttempts: maxAttempts})
    }

    const getScore = () => {
        const gameover = settings.texts.gameover;
        const rating = gameover.rating[Math.floor((popup.attempts - 1)*gameover.rating.length/popup.maxAttempts)];
        let comment = rating.comment;

        if(popup.win && popup.attempts === 1){
            comment = gameover.perfectGameComment;
        }
        else if(!popup.win){
            comment = gameover.loseGameComment;
        }
        const td = [];
        for(let i = 0 ; i < popup.maxAttempts ; i++){
            td.push(
                <div style={{background: `${i < popup.attempts ? rating.colour: '#ddd'}`}} className="score"/>
            )
        }
        return  <div>
                    <div className="submessage">
                        <div className="score">
                            {`${popup.attempts}/${popup.maxAttempts} attempts`}
                        </div>
                    </div>
                    <div className="stats">
                        {td}
                    </div>
                    <div className="submessage">
                        <div className="comment">
                            {comment}
                        </div>
                    </div>
                </div>
    }

    return (
        <AlertContext.Provider value={{addAlert, addPopup}}>
            <div className="box-container">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className="box-child"
                    >
                        {alert.message}
                    </div>
                ))}
            </div>
            {popup.enabled &&
                <div className="game-over-container">
                    <div className="game-over-box">
                        <div 
                            onClick={() => {setPopup({enabled: false, message: undefined, submessage: undefined})}} 
                            className="close"
                        >
                            <RiAddCircleFill />
                        </div>
                        <div className="details">
                            <div className="message">
                                {popup.message}
                            </div>
                            {getScore()}
                        </div>
                    </div>
                </div> 
            }
            <div style={{opacity: popup.enabled ? '0.1' : '1.0'}}>
                {children}
            </div>
        </AlertContext.Provider>
    )
};

export const useAlert = () => useContext(AlertContext);