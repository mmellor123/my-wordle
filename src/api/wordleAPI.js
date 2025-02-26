

export default class WordleAPI{
    constructor(word, attempts){
        this.word = word;
        this.length = word.length;
        this.attempts = attempts;
        this.attempt = 0;
        this.guessedWords = [];
        this.results = [];

        this.guesses = [];
        for(let i = 0 ; i < attempts ; i++){
            this.guesses.push(
                {guessed: false, data: {correct: false}}
            )
        }
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

    getGuessedWords(){
        return this.guessedWords;
    }

    getLength(){
        return this.length;
    }

    //Check if word is in dictionary
    isWord(word){
        return true;
    }

    isValidGuess(word){
        if(this.attempt < this.attempts && word.length === this.length && this.isWord(word) && !this.guessedWords.includes(word)){
            return true;
        }
        return false;
    }

    getGuess(index){
        if(index < this.guessedWords.length){
            return this.guessedWords[index]
        }
    }

    getResult(index){
        if(index < this.guessedWords.length){
            return this.results[index]
        }
    }
    

    guess(word){
        let res = {isValid: false, data: {}}
        let compare = ''
        if(this.isValidGuess(word)){
            this.guessedWords.push(word);
            res.isValid = true;
            let correct = true;
            for(let i = 0 ; i < this.length ; i++){
                if(word[i] === this.word[i]){
                    compare +='+'
                }
                else{
                    correct = false;
                    if(this.word.includes(word[i])){
                        compare += 'x'
                    }
                    else{
                        compare += '-'
                    }
                }
            }
            this.guesses[this.attempt].guessed = true
            this.guessed[this.attempt].data = {correct: correct, result: compare}
            this.attempt = this.attempt + 1;
            this.results.push(compare);
            res.data.compare = compare;
            res.data.result = correct;
        }
        return res;
    }




};





