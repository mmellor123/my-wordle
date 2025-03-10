import {dictionary} from '../assets/data/words.js';

export default class WordleAPI{
    constructor(word, attempts){
        this.word = word;
        this.length = word.length;
        this.attempts = attempts;
        this.attempt = 0;
    }

    getWord(){
        return this.word;
    }

    getAttempt(){
        return this.attempt;
    }

    getRemainingAttempts(){
        return this.attempts - this.attempt;
    }

    getLength(){
        return this.length;
    }

    //Check if word is in dictionary
    validWord(word){
        if(dictionary[word]){
            return true;
        }
        return false;
    }

    validate(word){

        if(word.length !== this.length){
            return {valid: false, message: "INVALID_LENGTH"};
        }
        else if(!this.validWord(word)){
            return {valid: false, message: "INVALID_WORD"};
        }
        return {valid: true, message: "VALID_WORD"};
    }

    getDifference(word){
        const difference = Array(word.length).fill('-');
        let correct = true;
        for(let i = 0 ; i < this.length ; i++){
            if(word[i] === this.word[i]){
                difference[i] = '+'
            }
            else{
                correct = false;
                if(this.word.includes(word[i])){
                    difference[i] = '_'
                }
            }
        }
        return {correct, difference};
    }

    guess(word){
        const {valid, message} = this.validate(word);
        if(!valid){
            throw message;
        }
        const res = this.getDifference(word);
        return {valid: valid, data: {correct: res.correct, result: res.difference}};
    }




};





