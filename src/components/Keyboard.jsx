import { useState, useEffect } from "react";
import '../assets/style/Keyboard.css';

//used data structure: {key: colour}
const Keyboard = ({used={}, onKeyPress}) => {

    const [keys] = useState([['q','w','e','r','t','y','u','i','o','p'],[
        'a','s','d','f','g','h','j','k','l'],
        ['enter', 'z','x','c','v','b','n','m', '<']
    ]);

    useEffect(() => {
        console.log("keyboard onMount");
    }, [])
    

    const keyMappings = [

        [
            { letter: "q", keyCode: 81 },
            { letter: "w", keyCode: 87 },
            { letter: "e", keyCode: 69 },
            { letter: "r", keyCode: 82 },
            { letter: "t", keyCode: 84 },
            { letter: "y", keyCode: 89 },
            { letter: "u", keyCode: 85 },
            { letter: "i", keyCode: 73 },
            { letter: "o", keyCode: 79 },
            { letter: "p", keyCode: 80 }
        ],
        [
            { letter: "a", keyCode: 65 },
            { letter: "s", keyCode: 83 },
            { letter: "d", keyCode: 68 },
            { letter: "f", keyCode: 70 },
            { letter: "g", keyCode: 71 },
            { letter: "h", keyCode: 72 },
            { letter: "j", keyCode: 74 },
            { letter: "k", keyCode: 75 },
            { letter: "l", keyCode: 76 }
        ],

        [
            { letter: "enter", keyCode: 13 },
            { letter: "z", keyCode: 90 },
            { letter: "x", keyCode: 88 },
            { letter: "c", keyCode: 67 },
            { letter: "v", keyCode: 86 },
            { letter: "b", keyCode: 66 },
            { letter: "n", keyCode: 78 },
            { letter: "m", keyCode: 77 },
            { letter: "<", keyCode: 8 }
        ]
    ];

    const Key = ({id}) => {

        const backgroundColour = () => {
            return used[id.letter] === undefined? "#818384" : used[id.letter] 
        }

        return (
            <div
                className={`key ${(id.letter === "enter" || id.letter === "<") ? 'enter-key' : ''}`}
                style={{
                    background: backgroundColour(), 
                }}
                onClick={() => onKeyPress(id)}
            >
                {id.letter.toUpperCase()}
            </div>
        )
    }

    return (
        <div style={{margin: "0px 5px"}}>
            <div style={{display: "grid", gridTemplateColumns: "repeat(10, 1fr)", marginBottom: "8px", gap: "8px"}}>
                {keyMappings[0].map((key) => (<Key id={key}/>))}
            </div>

            <div style={{display: "grid", gridTemplateColumns: "repeat(9, 1fr)", marginBottom: "8px", gap: "8px", marginLeft: "5%", marginRight: "5%"}}>
                {keyMappings[1].map((key) => (<Key id={key}/>))}
            </div>

            <div style={{display: "grid", gridTemplateColumns: "repeat(11, 1fr)", marginBottom: "8px", gap: "8px"}}>
                {keyMappings[2].map((key) => (<Key id={key}/>))}
            </div>
            
        </div>
    )
};

export default Keyboard;