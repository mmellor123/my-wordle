import Wordle from "./Wordle"
import { useState, useEffect } from "react";
import settings from '../assets/data/settings.json';

const WordleInit = () => {

    const [word, setWord] = useState(null);
    const [dictionary, setDictionary] = useState(null);
    const [baseUrl, setBaseUrl] = useState(null);


    useEffect(() => {
        try {
            setBaseUrl(settings.api.baseUrl);
        }
        catch(e){
            console.error(e);
        };
    }, [])


    const getDictionary = async () => {
        const today = new Date()
        const url = `${baseUrl}/dictionary?date=${today.toISOString().split('T')[0]}`;
        const res = fetch(url, {headers: {'Content-Type': 'application/json'}})
            .then((res) => res.json())
            .then((res) => {
                if(res != null){
                    setDictionary(res);
                }
            },
            (error) => {
                console.error(`Error fetching dictionary: ${error}`);
            }
        )
    };

    useEffect(() => {
        if(baseUrl !== null){
            getWord();
            getDictionary();
        }
    }, [baseUrl]);

    const getWord = async () => {
        const today = new Date()
        const url = `${baseUrl}/word?date=${today.toISOString().split('T')[0]}`
        const res = fetch(url, {headers: {'Content-Type': 'application/json'}}).then((res) => res.json())
            .then((res) => {
                if(res.word !== null){
                    setWord(res.word.toLowerCase());
                }
            },
            (error) => {
                console.log(`Error fetching word: ${error}`);
            }
        )
    }   

    
    return (
        <div>
            {word && dictionary && 
                <Wordle correctWord={word} attempts={6} dictionary={dictionary}/>
            }
        </div>
    )
};

export default WordleInit;