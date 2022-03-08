var wordleList;
var wordCount = 0;
var currIndex = -1;

document.addEventListener("keydown", getKeyInput);

function createWordle(){
    wordleList = [
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"],
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"],
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"],
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"],
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"],
        ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"]
    ]

    print(wordleList);
}

function getKeyInput(e){
    
    var keyInput = e.key;
    var keyCode = e.keyCode;
    if (lettersOnly(keyCode) && wordCount < 6){
        // console.log("words: " + wordCount)
        // console.log(checkWord(wordleList[wordCount][currIndex]))
        // 13 is enter and 8 is backspace
        if (keyCode == 13){
            if (currIndex >= 5 && checkWord(wordleList[wordCount][currIndex]) && wordCount <= 6){
                console.log("monka")
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
    } else {
        console.log("OMEGALUL");
    }
}

function print(theList){
    if (wordCount < 6){
        console.log("test")
        for (var i = 0; i < 6; i++){
            var word = "word" + (i+1);
            console.log(word)
            document.getElementById(word).innerHTML = "<button>" +  theList[i][0] + "</button>  " + "<button>" + theList[i][1] + "</button> " + "<button>" + theList[i][2] 
                                    + "</button> " + "<button>" + theList[i][3] + "</button> " + "<button>" + theList[i][4] + "</button> " + "<button>" + theList[i][5] + "</button>";
        }
    }
}

function checkWord(word){
    return true;
}

//yoink my code now https://tinyurl.com/mua3uphf
function lettersOnly(input){
    if ((input > 64 && input < 91) || (input > 96 && input < 123) || input == 8 || input == 13){
        console.log("HMMM");
        return true;
    } else {
        return false;
    }
}
