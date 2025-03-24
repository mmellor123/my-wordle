export default class WordleAPI{
    constructor(word, attempts, dictionary){
        this.word = word;
        this.length = word.length;
        this.attempts = attempts;
        this.attempt = 0;
        this.dictionary= dictionary;
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
        if(this.dictionary[word]){
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

    letterDictionary(word){
        const dict = {}
        for(let i = 0 ; i < word.length ; i++){
            const letter = word[i]
            if(!(letter in dict)){
                dict[letter] = [i]
            }
            else{
                dict[letter].push(i);
            }
        }
        return dict;
    }

    getDifference(word){
        const difference = Array(word.length).fill('-');
        const wordDict = this.letterDictionary(word);
        const correctDict = this.letterDictionary(this.word);
        for(let letter in correctDict){
            if(!(letter in wordDict)){
                continue;
            }
            const positions = correctDict[letter];
            for(let i = 0 ; i < positions.length ; i++){
                if(wordDict[letter].includes(positions[i])){
                    difference[positions[i]] = '+'; 
                }
                else if(i < wordDict[letter].length){
                    difference[wordDict[letter][i]] = '_'
                }
            }
        }
        const correct = this.word.search(word) === 0 ? true : false;
        return {correct, difference}
    }

    getDifference2(word){
        const dict = {}
        for(let i = 0 ; i < this.length ; i++){
            if(!(this.word[i] in dict)){
                const len = (this.word.match(new RegExp(this.word[i], 'g')) || []).length;
                dict[this.word[i]] = (this.word.match(new RegExp(this.word[i], 'g')) || []).length;
            }
        }
        const difference = Array(word.length).fill('-');
        let correct = true;
        for(let i = 0 ; i < this.length ; i++){
            console.log(dict);
            if(word[i] === this.word[i]){
                difference[i] = '+';
                dict[word[i]] -= 1;
            }
            else{
                correct = false;
                if(this.word.includes(word[i]) && dict[word[i]] > 0){
                    dict[word[i]] -= 1;
                    difference[i] = '_';
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





