import WordleAPI from "../api/wordleAPI";
import { useState, useEffect} from "react";


const Wordle = ({word, attempts}) => {

    // const [guess, setGuess] = useState('');
    const [wordleHandler] = useState(new WordleAPI(word, attempts));
    const [regex] = useState(/^[a-zA-z]{1,1}$/);
    const [attempt, setAttempt] = useState(0);


    useEffect(() => {
        const handler = window.onkeydown((e) => {
            const key = e.key;
            const code = e.keyCode;
            console.log(`key: ${key}, code: ${code}`)
        })

        return () => {
            clearInterval(handler);
        }
    })


    return (
        <div>
            Hello world
        </div>
    )

};

export default Wordle;