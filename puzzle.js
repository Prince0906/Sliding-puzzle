const imgPos = [
    'top left',
    'top center',
    'top right',
    'center left',
    'center center',
    'center right',
    'bottom left',
    'bottom center',
]
let grid = [
    0,1,2,
    3,4,5,
    6,7,8
]




const randomGame = () => {
    let seq = [0,1,2,3,4,5,6,7,8];
    for (let i = seq.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [seq[i], seq[j]] = [seq[j], seq[i]];
    }
    grid = seq;
}


const arrayShift = (idx) => {
    if (idx % 3 !== 0 && grid[idx - 1] === 8) {
        grid[idx - 1] = grid[idx];
        grid[idx] = 8;
    }
    else if (idx % 3 !== 2 && grid[idx + 1] === 8) {
        grid[idx + 1] = grid[idx];
        grid[idx] = 8;
    } else if (grid[idx+3] == 8) {
        grid[idx+3]=grid[idx];
        grid[idx] =8;
    }else if (grid[idx-3] == 8) {
        grid[idx-3]=grid[idx];
        grid[idx] =8;
    }
    display();
}

const checkWin = () => {
    for (let i=0;i<9;i++) {
        if (grid[i]!=i) {
            return false;
        }
    }
    return true;
}

const display = () => {
    let gridDiv = document.querySelector('.grid');
    gridDiv.innerHTML = '';
    for (let i=0;i<9;i++) {
        const cell = document.createElement('div')
        cell.classList.add('.cell');
        if (grid[i]!=8) {
            cell.style.backgroundPosition = imgPos[grid[i]];
            cell.style.backgroundImage = 'url("https://i.imgur.com/CmFuOpx.png")';
            cell.style.cursor = 'pointer';
            cell.addEventListener('click', ()=>{
                arrayShift(i);
                cell.classList.add('cell-animation');
                setTimeout(() => {
                    cell.classList.remove('cell-animation');
                },300);
            });
        }
        gridDiv.appendChild(cell);
    }
    document.querySelector('.grid').replaceWith(gridDiv);
    setTimeout(() => {
        if (checkWin()) {
            alert("Congratulations! You solved the puzzle! Click on New Game to continue playing !!");
        }
    }, 10);
}
randomGame();
display();


document.querySelector('button').addEventListener('click', ()=>{
    randomGame();
    display();
})