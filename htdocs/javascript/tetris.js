let gameBoard = new Array(20);
for (var i = 0; i < 20; i++) {
    gameBoard[i] = new Array(10); 
}
var gamePieces = {
    L : [[1,1],[1,2],[1,3],[2,3]],
    Z : [[1,1],[2,1],[2,2],[2,3]],
    S : [[1,2],[2,1],[2,2],[3,1]],
    T : [[1,1],[2,1],[2,2],[3,1]],
    O : [[1,1],[1,2],[2,1],[2,2]],
    I : [[1,1],[1,2],[1,3],[1,4]]
};
let currentBlock = {
    id: '',
    shape: [[,],[,],[,],[,]],
    x_pos: 0,
    y_pos: 0,
}
var blockId;
var data;
var down;
var color; 
var counter = document.getElementById("score");
var score;
var pixelsDown;
var pixelsRight;

function startGame(){
    var button = document.getElementById("startGame");
    button.style.display = "none";
    score = 0;
    blockID = 0;
    generateBlock();
}

function generateBlock(){
    var gamePieces = {
        L : [[1,1],[1,2],[1,3],[2,3]],
        Z : [[1,1],[2,1],[2,2],[2,3]],
        S : [[1,2],[2,1],[2,2],[3,1]],
        T : [[1,1],[2,1],[2,2],[3,1]],
        O : [[1,1],[1,2],[2,1],[2,2]],
        I : [[1,1],[1,2],[1,3],[1,4]]
        };

    switch(Math.floor(Math.random() * 6)){
        case 0:
            currentBlock = {
                id: 'L' + ++blockID,
                shape: gamePieces.L,
                x_pos: [5,5,5,6],
                y_pos: [0,1,2,2],
                color: "orange"
            };
            break;
        case 1:
            currentBlock = {
                id: 'Z'+ ++blockID,
                shape: gamePieces.Z,
                x_pos: [5,6,6,6],
                y_pos: [0,0,1,2],
                color: "red"
            };
            break;
        case 2:
            currentBlock = {
                id: 'S' + ++blockID,
                shape: gamePieces.S,
                x_pos: [5,6,6,7],
                y_pos: [1,0,1,0],
                color: "green"
            };
            break;
        case 3:
            currentBlock = {
                id: 'T' + ++blockID,
                shape: gamePieces.T,
                x_pos: [5,6,6,7],
                y_pos: [0,0,1,0],
                color: "purple"
            };
            break;
        case 4:
            currentBlock = {
                id: 'O' + ++blockID,
                shape: gamePieces.O,
                x_pos: [5,5,6,6],
                y_pos: [0,1,0,1],
                color: "yellow"
            };
            break;
        case 5:
            currentBlock = {
                id: 'I' + ++blockID,
                shape: gamePieces.I,
                x_pos: [5,5,5,5],
                y_pos: [0,1,2,3],
                color: "blue"
            };
            break;
    }
    if(gameOver()==true){
        clearInterval(down);
        xmlRequest();
    } else{
        pixelsDown = 1;
        pixelsRight = 0;
        createPiece();
        down = setInterval(moveDown,1000);
    }  
}

function createPiece(){
    var piece = document.createElement("div");
    piece.id = currentBlock.id;
    document.getElementById("tetris-bg").appendChild(piece);
    for (i = 0; i<4; i++){
        coordinate = (currentBlock.shape)[i];
        var block = document.createElement("div");
        block.style.width = "30px";
        block.style.height = "30px";
        block.style.position = "absolute";
        block.style.background = currentBlock.color;
        block.style.left = 90+((coordinate[0])*30);;
        block.style.top = ((coordinate[1]-1))*30;
        block.style.transform = "translate("+(pixelsRight*30)+"px,"+(pixelsDown*30)+"px)";
        block.id = currentBlock.id;
        block.className = "block";
        document.getElementById(currentBlock.id).appendChild(block);
    }
}

function refreshScreen(){
    for(y = 0;y<20;y++){
        for(x = 1;x<11;x++){
            if(gameBoard[y][x]!=null){
                var id = gameBoard[y][x];
                if((document.getElementById(id))==null){
                    var block = document.createElement("div");
                    block.style.width = "30px";
                    block.style.height = "30px";
                    block.style.position = "absolute";
                    block.style.top = 30*y;
                    block.style.left = 30*(x-1);
                    color = id.slice(id.indexOf(":")+1);
                    block.id = x+"/"+y+":"+color;
                    block.style.background = color;
                    document.getElementById("tetris-bg").appendChild(block);
                }
            } else{
                var colors = ["orange","red","green","purple","yellow","blue"];
                for(c=0;c<6;c++){
                    var block = document.getElementById(x+"/"+y+":"+colors[c]);
                    if(block != null){
                        block.remove();
                    }

                }
            }
        }
    }
}

function gameOver(){
    for (i = 0; i < 4; i++){
        if((gameBoard[currentBlock.y_pos[i]][currentBlock.x_pos[i]]!= null)){
            return true;
        }
    }
    return false;
}

function checkCollisionDown(){
    for (i = 0; i < 4; i++){
        if(currentBlock.y_pos[i]+1 > 19 || (gameBoard[currentBlock.y_pos[i]+1][currentBlock.x_pos[i]]!= null)){
            return true;
        }
    }
    return false;
}

function checkCollisionRight(){
    for (i = 0; i < 4; i++){
        if(currentBlock.x_pos[i]+1 > 10 || (gameBoard[currentBlock.y_pos[i]][currentBlock.x_pos[i]+1]!= null)){
            return true;
        }
    }
    return false;
}

function checkCollisionLeft(){
    for (i = 0; i < 4; i++){
        if(currentBlock.x_pos[i]-1 < 1 || (gameBoard[currentBlock.y_pos[i]][currentBlock.x_pos[i]-1]!= null)){
            return true;
        }
    }
    return false;
}


function moveDown(){
    console.log(currentBlock.x_pos+"/"+currentBlock.y_pos)
    if(checkCollisionDown() == true){
        for (i = 0;i<4;i++){
            gameBoard[currentBlock.y_pos[i]][currentBlock.x_pos[i]] = currentBlock.x_pos[i]+"/"+currentBlock.y_pos[i]+":"+currentBlock.color;
        }
        var piece = document.getElementById(currentBlock.id);
        piece.remove();
        refreshScreen();
        removeRows();
        clearInterval(down);
        console.log(gameBoard)
        refreshScreen();
        generateBlock();
        score++
        counter.innerHTML=score;
    } else {
        var piece = document.getElementById(currentBlock.id);
        var blocks = piece.getElementsByTagName("div");
        for(i=0;i<4;i++){
            currentBlock.y_pos[i] += 1;
            blocks[i].style.transform = "translate("+(pixelsRight*30)+"px,"+(pixelsDown*30)+"px)";
        }
        ++pixelsDown;
    }
}

function removeRows(){
    for(removeY = 19;removeY > 2;removeY--){
        while(CheckRow(gameBoard[removeY])){
            gameBoard[removeY] = new Array(10);
            shiftDown(removeY);
        }
    }
    refreshScreen();
}

function CheckRow(row){
    for(i=1;i<11;i++){
        if(row[i]==null){
            return false;
        }
    }
    return true;
}

function shiftDown(removeY){
    for(shiftY = removeY;shiftY > 0;shiftY--){
        gameBoard[shiftY] = gameBoard[shiftY-1];
    }
}

function checkRotation(){
    for(i=0;i<4;i++){
        var tempX = currentBlock.x_pos[i];
        var tempY = currentBlock.y_pos[i];
        switch(currentBlock.shape[i][0]+"|"+currentBlock.shape[i][1]){
            case "1|1":
                tempX = currentBlock.x_pos[i] + 2;
                break;
            case "3|1":
                tempY = currentBlock.y_pos[i] + 2;
                break;
            case "3|3":
                tempX = currentBlock.x_pos[i] - 2;
                break;
            case "1|3":
                tempY = currentBlock.y_pos[i] - 2;
                break;
            case "2|1":
                tempX = currentBlock.x_pos[i] + 1;
                tempY = currentBlock.y_pos[i] + 1;
                break;
            case "3|2":
                tempX = currentBlock.x_pos[i] - 1;
                tempY = currentBlock.y_pos[i] + 1;
                break;
            case "2|3":
                tempX = currentBlock.x_pos[i] - 1;
                tempY = currentBlock.y_pos[i] - 1;
                break;
            case "1|2":
                tempX = currentBlock.x_pos[i] + 1;
                tempY = currentBlock.y_pos[i] - 1;
                break;
            case "1|4":
                tempX = currentBlock.x_pos[i] + 3;
                tempY = currentBlock.y_pos[i] - 3;
                break;
            case "4|1":
                tempX = currentBlock.x_pos[i] - 1;
                tempY = currentBlock.y_pos[i] + 3;
                break;
            case "3|4":
                tempX = currentBlock.x_pos[i] +1;
                tempY = currentBlock.y_pos[i] -1;
                break;
            case "4|3":
                tempX = currentBlock.x_pos[i] - 3;
                tempY = currentBlock.y_pos[i] + 1;
                break    
        }
        if((tempX>10)||(tempX<1)||(tempY>19)||(gameBoard[tempY][tempX]!=null)){
            return true;
        }
    }
    return false;
}

document.addEventListener('keyup', (e) => {
    var div = document.getElementById(blockID);
    switch (e.key) {
        case 'ArrowLeft':
            if(checkCollisionLeft() == false){
                var piece = document.getElementById(currentBlock.id);
                var blocks = piece.getElementsByTagName("div");
                --pixelsRight;
                for(i=0;i<4;i++){
                    currentBlock.x_pos[i] -= 1;
                    blocks[i].style.transform = "translate("+(pixelsRight*30)+"px,"+(pixelsDown*30)+"px)";
                }
            }
            break;
        case 'ArrowRight':
            if(checkCollisionRight() == false){
                var piece = document.getElementById(currentBlock.id);
                var blocks = piece.getElementsByTagName("div");
                for(i=0;i<4;i++){
                    currentBlock.x_pos[i] += 1;
                    blocks[i].style.transform = "translate("+(pixelsRight*30)+"px,"+(pixelsDown*30)+"px)";
                }
                ++pixelsRight;
            }
            break;
        case 'ArrowDown':
            if(checkCollisionDown()==false){
                var piece = document.getElementById(currentBlock.id);
                var blocks = piece.getElementsByTagName("div");
            for(i=0;i<4;i++){
                currentBlock.y_pos[i] += 1;
                blocks[i].style.transform = "translate("+(pixelsRight*30)+"px,"+(pixelsDown*30)+"px)";
            }
            ++pixelsDown;
            }
            break;
        case 'ArrowUp':
            console.log("rotate");
            if(checkRotation()==false){
                console.log(currentBlock.x_pos+"/"+currentBlock.y_pos)
                var piece = document.getElementById(currentBlock.id);
                piece.remove();
                for(i=0;i<4;i++){
                    switch(currentBlock.shape[i][0]+"|"+currentBlock.shape[i][1]){
                        case "1|1":
                            currentBlock.x_pos[i] += 2;
                            currentBlock.shape[i] = [3,1];
                            break;
                        case "3|1":
                            currentBlock.y_pos[i] += 2;
                            currentBlock.shape[i] = [3,3];
                            break;
                        case "3|3":
                            currentBlock.shape[i] = [1,3];
                            currentBlock.x_pos[i] -= 2;
                            break;
                        case "1|3":
                            currentBlock.shape[i] = [1,1];
                            currentBlock.y_pos[i] -= 2;
                            break;
                        case "2|1":
                            currentBlock.shape[i] = [3,2];
                            currentBlock.x_pos[i] += 1;
                            currentBlock.y_pos[i] += 1;
                            break;
                        case "3|2":
                            currentBlock.shape[i] = [2,3];
                            currentBlock.x_pos[i] -= 1;
                            currentBlock.y_pos[i] += 1;
                            break;
                        case "2|3":
                            currentBlock.shape[i] = [1,2];
                            currentBlock.x_pos[i] -= 1;
                            currentBlock.y_pos[i] -= 1;
                            break;
                        case "1|2":
                            currentBlock.shape[i] = [2,1];
                            currentBlock.x_pos[i] += 1;
                            currentBlock.y_pos[i] -= 1;
                            break;
                        case "1|4":
                            currentBlock.shape[i] = [4,1];
                            currentBlock.x_pos[i] += 3;
                            currentBlock.y_pos[i] -= 3;
                            break;
                        case "4|1":
                            currentBlock.shape[i] = [3,4];
                            currentBlock.x_pos[i] -= 1;
                            currentBlock.y_pos[i] += 3;
                            break;
                        case "3|4":
                            currentBlock.shape[i] = [4,3];
                            currentBlock.x_pos[i] +=1;
                            currentBlock.y_pos[i] -=1;
                            break;
                        case "4|3":
                            currentBlock.shape[i] = [1,4];
                            currentBlock.x_pos[i] -= 3;
                            currentBlock.y_pos[i] += 1;
                            break;
                    }
                }
                createPiece();
                console.log(currentBlock.x_pos+"/"+currentBlock.y_pos)
            }
        break;       
    }
})

function xmlRequest(){
    let xhr = new XMLHttpRequest();
        xhr.open("POST","../leaderboard.php", true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                window.location.href = "../leaderboard.php?num="+score;
                console.log(score);
            }
        };
        xhr.send("num="+score);
}

