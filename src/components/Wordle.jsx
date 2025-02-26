import WordleAPI from "../api/wordleAPI";
import { useState, useEffect} from "react";


const Wordle = ({word, attempts}) => {

    // const [guess, setGuess] = useState('');
    const [wordleHandler] = useState(new WordleAPI(word, attempts));
    const [regex] = useState(/^[a-zA-z]{1,1}$/);
    const [attempt, setAttempt] = useState(0);



    const WordAttempt = ({id, attempt}) => {
    
        const [active, setActive] = useState(false);
        const [result, setResult] = useState('');
        const [guess, setGuess] = useState('');
        const [guessed, setGuessed] = useState(false);
    
        useEffect(() => {
            if(attempt > id && attempt !== id){
                setGuess(wordleHandler.getGuess(id))
                setResult(wordleHandler.getResult(id))
                setGuessed(true);
            }
            else if(attempt === id){
                setActive(true);
            }
            else{
                setActive(false)
            }
            
        }, [])
    
        useEffect(() => {
            const eventListener = onkeydown = (event) => {
                handleKeyDown(event.key, event.keyCode);

            }
            if(!active){
                clearInterval(eventListener);
            }
            return(() => {
                clearInterval(eventListener);
            });
        }, [active, guess]);

        const handleKeyDown = (key, keyCode) => {
            const handleBackspace = () =>{
                setGuess((guess) => guess.substring(0, guess.length - 1));
            }
    
            const handleGuess = () => { //Assume it was successful
                const res = printWordle();
                setAttempt((attempt) => attempt + 1);
                setResult(res.compare);
            }
    
            const handleEnterKey = (key) => {
                if(guess.length < word.length && regex.test(key)){
                    setGuess((guess) => guess + key.toLowerCase());
                }
            }
            // console.log(`key: ${key}, keyCode: ${keyCode}`)
    
            switch(keyCode){
                case 13:
                    handleGuess();
                    break;
                case 8:
                    handleBackspace();
                    break;
                default:
                    handleEnterKey(key);
            }
        };

        const printWordle = () => {
            const res = wordleHandler.guess(guess);
            const a = wordleHandler.getAttempt();
            const data = res.data
            return data;
        };

        const squareColour = (index) => {
            if(guessed){
                switch(result[index]){
                    case '+':
                        return "#538D4E";
                    case 'x':
                        return '#B59F3B'
                    default:
                        return '#3A3A3C'
                }
            }
            return "#fff";
        }

        const fontColour = () => {
            if(guessed){
                return "#FFF"
            }
            return '#000'
        }

        const getSquares = () => {
            const td = []
            for(let i = 0 ; i < word.length ; i++){
                td.push(
                    <div style={{gridColumn: "span 1", height: "50px", width: "50px", backgroundColor: squareColour(i), color: fontColour(), border: "solid 1px #777", borderRadius: "5px"}}>
                        <div style={{textAlign: "center", justifyContent: "center", alignItems: "center", height: "100%", margin: "auto"}}>
                            {i < guess.length ? guess[i] : ""}
                        </div>
                    </div>
                )
            }
            return td;
        }

        return (
            <div style={{display: "grid", gridTemplateColumns: `repeat(${word.length}, 1fr)`, gap: "15px", marginBottom: "15px"}}>
                {getSquares()}
            </div>
        )

    };

    const getWordAttempts = () => {
        const td = []
        const attempt = wordleHandler.getAttempt()
        console.log(`attempt: ${attempt}`);
        for(let i = 0 ; i < attempts ; i++){
            td.push(<WordAttempt id={i} attempt={attempt}/>)
        }
        return td;

    }
    
    return (
        <div>
            {getWordAttempts()}
        </div>
    )
};

export default Wordle;