import WordleAPI from "../api/wordleAPI";
import { useState, useEffect} from "react";
import Keyboard from "./Keyboard";
import '../assets/style/Wordle.css';
import { useAlert } from "../api/context/AlertContext";
import settings from '../assets/data/settings.json';


const Wordle = ({correctWord, attempts, dictionary}) => {
    
    const [mounted, setMounted] = useState(false);
    const [wordleHandler] = useState(new WordleAPI(correctWord, attempts, dictionary));
    const [regex] = useState(/^[a-zA-z]{1,1}$/);
    const [attempt, setAttempt] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [guessesResult, setGuessesResult] = useState([]);
    const [charIndex, setCharIndex] = useState(0);

    const [hasWon, setHasWon] = useState(false);

    const [keys, setKeys] = useState({});

    const [colours] = useState({'+': settings.colourMap[0], '_': settings.colourMap[1], '-': settings.colourMap[2]})
    const [animationOn, setAnimationOn] = useState(false);
    const {addAlert, addPopup} = useAlert();


    useEffect(() => {
        const initGame = () => {
            const guessTmp = [];
            for(let i = 0 ; i < attempts ; i++){
                const guess = Array(correctWord.length).fill(null);
                guessTmp.push(guess);
            }
            setGuesses(guessTmp);
            setGuessesResult(guessTmp);
        };
        initGame();
        setMounted(true);
    }, []);


    useEffect(() => {
        if(hasWon){
            addPopup(settings.texts.gameover.win, true, attempt, attempts);
            return;
        }
        else if(attempt === attempts && !hasWon){
            addAlert(correctWord.toUpperCase(), 'game-end');
            addPopup(`${correctWord.toUpperCase()}`, false, attempt, attempts);
            return;
        }
        setCharIndex(0);
    }, [attempt])


    const handleSubmit = () => {
        try{
            const result = wordleHandler.guess(guesses[attempt].join(""));
            const results = [...guessesResult];
            results[attempt] = result.data.result;
            const keysTmp = {...keys};
            
            for(let i = 0 ; i < correctWord.length ; i++){
                if(keysTmp[guesses[attempt][i]] != colours['+']){ //ith character of current guess
                    keysTmp[guesses[attempt][i]] = colours[result.data.result[i]];
                }
            }

            setKeys(keysTmp);
            setHasWon(result.data.correct);
            setGuessesResult(results);
            setAnimationOn(true);
        }
        catch(err){
            if(err === 'INVALID_WORD'){
                addAlert('Not a word', 'error');
            }
            return;
        }
    };

    const handleBackspace = () => {
        if(charIndex > 0){
            const guessesTmp = [...guesses];
            guessesTmp[attempt][charIndex - 1] = null;
            setGuesses(guessesTmp);
            setCharIndex((charIndex) => charIndex - 1);
        }
    }

    const handleEnterKey = (key, code) => {
        const handleNewChar = (key) => {
            if(!isGameComplete() && charIndex < correctWord.length && regex.test(key)){
                const guessesTmp = [...guesses];
                guessesTmp[attempt][charIndex] = key;
                setCharIndex((charIndex) => charIndex + 1);
                setGuesses(guessesTmp);
            }
        };
        
        const ENTER = 13;
        const BACKSPACE = 8;
        switch(code){
            case BACKSPACE:
                handleBackspace();
                break;
            case ENTER:
                handleSubmit();
                break;
            default:
                handleNewChar(key)
        }
    }

    const isGameComplete = () => {
        return hasWon || attempt === attempts;
    }


    useEffect(() => {
        const eventListener = onkeydown = (e) => {
            if(isGameComplete() || animationOn){
                return
            }
            else{
                handleEnterKey(e.key, e.keyCode);
            }
        }

        return () => {
            clearInterval(eventListener);
        }
    }, [charIndex, guesses, animationOn]);

    const handleKeyboardPress = (key) => {
        handleEnterKey(key.letter, key.keyCode);
    }

    const Word = ({row}) => {
        const Letter = ({index}) => {

            function textColour(){
                return row <= attempt ? 'white' : 'black';
            }

            function getLetter(){
                return guesses[row][index] ? guesses[row][index].toUpperCase() : "";
            }

            function handleOnAnimationEnd(){
                if(index === correctWord.length - 1){
                    setAnimationOn(false) ; 
                    setAttempt((attempt) => attempt + 1);
                }
            }

            return (
                <div
                    className={`letter-container ${(row === attempt) && animationOn ? 'guessed' : ''}`}
                    style={{animationDelay: `${0.1 * index}s`}}
                    onAnimationEnd={() => {handleOnAnimationEnd()}}
                >
                    <div class="flip-card-inner">
                        
                        <div className={`${row < attempt ? 'flip-card-back' : 'flip-card-front'}`}> 
                            <div className="letter">
                                {getLetter()}
                            </div>
                        </div>

                        <div className={`${row < attempt ? 'flip-card-front' : 'flip-card-back'}`} //swap sides post animation for change to persist
                            style={{
                                    background: colours[guessesResult[row][index]],
                                    color: textColour(),
                            }}
                        >
                            <div className="letter">
                                {getLetter()}
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        }

        const currentWord = guesses[row];
        return(
            <div className="guess-container" style={{gridTemplateColumns: `repeat(${correctWord.length}, 1fr)`}}>
                {currentWord.map((letter, i) => (
                    <Letter index={i}/>
                ))}
            </div>
        )
    }


    return (
        <div>
            <div className="header">
                {settings.texts.heading}
            </div>
            {mounted &&
                <div style={{paddingTop: "3%"}}>
            <br/>
            <div className="guesses-container">
                <div className="guesses-row" style={{gridTemplateRows: `repeat(${attempts}, 1fr)`}}>
                    {guesses.map((attempt, i) => <Word id={`word-${i}`} row={i}/>)}
                </div>
            </div>
            <div className="keyboard-container">
                <Keyboard used={keys} onKeyPress={handleKeyboardPress}/>
            </div>
        </div>
            }
        </div>
    )

};

export default Wordle;