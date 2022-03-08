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
    //console.log(document.all)
}

function getRandomWord(){
    word = Math.floor(Math.random() * (genshinWords.length - 1));
    return genshinWords[word];
}
function getKeyInput(e){
    var keyInput = e.key;
    var keyCode = e.keyCode;
    if (lettersOnly(keyCode) && wordCount < 6){
        // console.log("words: " + wordCount)
        // console.log(checkWord(wordleList[wordCount][currIndex]))
        // 13 is enter and 8 is backspace
        if (keyCode == 13){
            var currWord = wordleList[wordCount].join("");
            // console.log(currWord);
            if (currIndex >= 5 && checkWord(currWord) && wordCount < 6){
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
            document.getElementById(word).innerHTML = "<button>" +  theList[i][0] + "</button>  " + "<button>" + theList[i][1] + "</button> " + "<button>" + theList[i][2] 
                                    + "</button> " + "<button>" + theList[i][3] + "</button> " + "<button>" + theList[i][4] + "</button> " + "<button>" + theList[i][5] + "</button>";
        }
    }
}

function print(theList){
    if (wordCount < 6){
            var word = "word" + (wordCount+1);
            document.getElementById(word).innerHTML = "<button>" +  theList[wordCount][0] + "</button>  " + "<button>" + theList[wordCount][1] + "</button> " + "<button>" + theList[wordCount][2] 
                                    + "</button> " + "<button>" + theList[wordCount][3] + "</button> " + "<button>" + theList[wordCount][4] + "</button> " + "<button>" + theList[wordCount][5] + "</button>";
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

function changeButtonColor(btnNum, color){
    document.getElementsByTagName("button")[btnNum].style.backgroundColor = color;
    document.getElementsByTagName("button")[btnNum].style.color = "white";
    scaleUp(btnNum);
}

function changeWordColor(word){
    console.log("here");
    var lettersUsed = [0, 0, 0, 0, 0, 0];
    for(var i = 0; i < word.length; i++){
        var currChar = word.substring(i,i+1);
        var btnNum = (6*(wordCount+1))-(6-i);

        if (wordleWord.includes(currChar)){
            // console.log(currChar);
            // console.log(wordleWord.substring(i,i+1));
            if (currChar == wordleWord.substring(i,i+1)){
                lettersUsed[i]+=1;
                changeButtonColor(btnNum, "#69A964")
            } else {
                var wordleWordCurrChar = wordleWord.indexOf(currChar);
                // console.log(lettersUsed[wordleWordCurrChar]);
                // console.log(wordleWord.split(currChar).length-1);
                if (lettersUsed[wordleWordCurrChar] < wordleWord.split(currChar).length-1){
                    lettersUsed[wordleWordCurrChar]+=1;
                    changeButtonColor(btnNum, "#C8B357")
                } else {
                    changeButtonColor(btnNum, "#787C7E")
                }
            }
        } else {
            changeButtonColor(btnNum, "#787C7E")
        }        
        // console.log(lettersUsed);
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

function scaleUp(btnNum){
    document.getElementsByTagName("button")[btnNum].style.transform = "scale(1.05)";
}