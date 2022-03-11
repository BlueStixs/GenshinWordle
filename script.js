var wordleList;
var wordleWord;
var wordCount = 0;
var currIndex = -1;

document.addEventListener("keydown", getKeyInput);

function homePage() {
    document.location.reload();
}

function createWordle(){
    wordleWord = getRandomWord();
    console.log(wordleWord);
    wordleList = [
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"],
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"],
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"],
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"],
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"],
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"]
    ]

    printWords(wordleList);
    makeKeyboard();
    //console.log(document.all)
}

function getRandomWord(){
    word = Math.floor(Math.random() * (genshinWords.length - 1));
    return genshinWords[word];
}

//letter is from if you use keyboard
function getKeyInput(e, letter){
    var keyInput = e.key;
    var keyCode = e.keyCode;
    
    //using onscreen keyboard
    if (letter != null){
        if (letter == "enter"){
            keyInput = "Enter";
            keyCode = 13;
        } else if (letter == "back"){
            keyInput = "Backspace";
            keyCode = 8;
        }
        else {
            keyInput = letter.id;
            keyCode = (letter.id).toUpperCase().charCodeAt(0);
        }
    }
    
    if (lettersOnly(keyCode) && wordCount < 6){
        // console.log("words: " + wordCount)
        // 13 is enter and 8 is backspace
        if (keyCode == 13){
            var currWord = wordleList[wordCount].join("");
            // console.log(currWord);
            if (currIndex >= 5 && checkWord(currWord.toLowerCase()) && wordCount < 6){
                //console.log(currWord)
                // enters word and checks it
                currIndex = -1;
                wordCount++;
                console.log(wordCount);
            } 
        } else if (keyCode == 8){
            if (wordCount < 6){
                if (currIndex > 0 && currIndex < 6){
                    wordleList[wordCount][currIndex] = "&nbsp";
                    currIndex--;
                } else if (currIndex <= 0) {
                    wordleList[wordCount][0] = "&nbsp";
                    currIndex = -1;
                }  else if (currIndex >= 5){
                    wordleList[wordCount][5] = "&nbsp";
                    currIndex = 4;
                }
            }
        }
        else {
            if (currIndex < 5){
                currIndex+=1;
                wordleList[wordCount][currIndex] = keyInput;
            } 
        }
        print(wordleList);

        // LOSE
        if (wordCount == 6){
            if (wordleList[wordCount-1].join("") == wordleWord){
                endGame(true);
            } else {
                endGame(false);
            } 
        }
    } else {
        // console.log("OMEGALUL");
    }
}

function printWords(theList){
    if (wordCount < 6){
        for (var i = 0; i < 6; i++){
            var word = "word" + (i+1);
            document.getElementById(word).innerHTML = "<button id='" + i + "-0" + "'>" +  theList[i][0] + "</button>  " + "<button id='" + i + "-1" + "'>" + theList[i][1] + "</button> " + "<button id='" + i + "-2" + "'>" + theList[i][2] 
                                    + "</button> " + "<button id='" + i + "-3" + "'>" + theList[i][3] + "</button> " + "<button id='" + i + "-4" + "'>" + theList[i][4] + "</button> " + "<button id='" + i + "-5" + "'>" + theList[i][5] + "</button>";
        }
    }
}

function print(theList){
    if (wordCount < 6){
            var word = "word" + (wordCount+1);
            document.getElementById(word).innerHTML = "<button id='" + wordCount + "-0" + "'>" +  theList[wordCount][0] + "</button>  " + "<button id='" + wordCount + "-1" + "'>" + theList[wordCount][1] + "</button> " + "<button id='" + wordCount + "-2" + "'>" + theList[wordCount][2] 
                                    + "</button> " + "<button id='" + wordCount + "-3" + "'>" + theList[wordCount][3] + "</button> " + "<button id='" + wordCount + "-4" + "'>" + theList[wordCount][4] + "</button> " + "<button id='" + wordCount + "-5" + "'>" + theList[wordCount][5] + "</button>";
    }
}

function checkWord(word){
    // console.log(genshinWords.includes(word.toLowerCase()));
    if (genshinWords.includes(word.toLowerCase())){
        changeWordColor(word);
        if (word == wordleWord){
            endGame(true);            
        }
        return true;
    } else {
        return false;
    }
}

function changeButtonColor(btnId, color){
    document.getElementById(wordCount + "-" + btnId).style.backgroundColor = color;
    document.getElementById(wordCount + "-" + btnId).style.color = "white";
    scaleUp(btnId);
}

function changeKeyboardColor(btnId, color){
    var currColor = document.getElementById(btnId).style.backgroundColor;
    if (currColor != "rgb(105, 169, 100)" || currColor == "rgb(120, 124, 126)"){
        document.getElementById(btnId).style.backgroundColor = color;
        document.getElementById(btnId).style.color = "white";        
    } else if (color == "rgb(105, 169, 100)"){
            document.getElementById(btnId).style.backgroundColor = color;
            document.getElementById(btnId).style.color = "white";        
    }
}

function changeWordColor(word){
    var lettersUsed = [0, 0, 0, 0, 0, 0];
    var uncertain = [];
    var uncertainBtn = [];

    for(var i = 0; i < word.length; i++){
        var currChar = word.substring(i,i+1);
        var btnNum = i;

        if (wordleWord.includes(currChar)){
            //green
            if (currChar == wordleWord.substring(i,i+1)){
                lettersUsed[i]+=1;
                changeButtonColor(btnNum, "rgb(105, 169, 100)")
                changeKeyboardColor(currChar, "rgb(105, 169, 100)")
            } else {
                // for loop checks green first. then we go see yellow
                uncertain.push(currChar);
                uncertainBtn.push(btnNum);
            }
        } else {    //gray
            changeButtonColor(btnNum, "rgb(120, 124, 126)")
            changeKeyboardColor(currChar, "rgb(120, 124, 126)")        
        }        
        // console.log(lettersUsed);
    }
    for (var i = 0; i < uncertain.length; i++){
        var currChar = uncertain[i];
        var btnNum = uncertainBtn[i];

        var wordleWordCurrChar = wordleWord.indexOf(currChar);
        
            // console.log(lettersUsed[wordleWordCurrChar]);
            // console.log(wordleWord.split(currChar).length-1);

            //yellow
            if (lettersUsed[wordleWordCurrChar] < wordleWord.split(currChar).length-1){
                lettersUsed[wordleWordCurrChar]+=1;
                changeButtonColor(btnNum, "rgb(200, 179, 87)")
                changeKeyboardColor(currChar, "rgb(200, 179, 87)") 
            } else {    //gray
                changeButtonColor(btnNum, "rgb(120, 124, 126)")
                changeKeyboardColor(currChar, "rgb(120, 124, 126)") 
            }
    }
}

function lettersOnly(input){
    if ((input > 64 && input < 91) || (input > 96 && input < 123) || input == 8 || input == 13){
        return true;
    } else {
        return false;
    }
}

function endGame(bool){
    setTimeout(function(){
        wordCount = 6;
        currIndex = 6;
        if (bool){
            document.getElementById("winOrLose").innerHTML = "YOU WON!";
        } else {
            document.getElementById("winOrLose").innerHTML = "YOU LOST!";
        }
        document.getElementById("theWord").innerHTML = "The word was: " + wordleWord.toUpperCase();
        
        document.getElementById("endScreen").style.display = "block";        
        setTimeout(function(){
            document.getElementById("endScreen").style.opacity = "1";
            document.getElementById("wordle").style.opacity = "0.5";
        }, 200);
    }, 800);
}

function makeKeyboard(){
    const keyboard = "qwertyuiopasdfghjklzxcvbnm"
    for (var letter of keyboard){
        if (letter=="z"){
            enter = "enter";
            document.getElementById("keyboard").innerHTML += "<button id='enter' onclick='getKeyInput(e," + enter + ")'>↩</button>";            
        }
        document.getElementById("keyboard").innerHTML += "<button id='" + letter + "' onclick='getKeyInput(e," + letter + ")'>" + letter + "</button>";

        if (letter=="m"){
            back = "back";
            document.getElementById("keyboard").innerHTML += "<button id='back' onclick='getKeyInput(e," + back + ")'>↩</button>";            
        }

        if (letter =="p" || letter=="l"){
            document.getElementById("keyboard").innerHTML+="<br>";
        }
    }

}
function scaleUp(btnId){
    document.getElementById(wordCount + "-" + btnId).style.transform = "scale(1.1)";
}