let grid = [];
  const GRID_SIZE = 4;

  function initializeGrid() {
    grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    addRandomTile();
    addRandomTile();
    p = 0

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] > p) {
          p = grid[i][j];
        }
      }
    }
    
    const highestElement = document.getElementById('highest');
    highestElement.textContent = `${p}`;
    updateGrid();
  }

  function addRandomTile() {
    const emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }
  let p = 0;
  function updateGrid() {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const tile = document.createElement('div');
        tile.className = `tile tile-${grid[i][j]}`;
        tile.textContent = grid[i][j] === 0 ? 'x' : grid[i][j];
        gridContainer.appendChild(tile);
      }
      const breakLine = document.createElement('br');
      gridContainer.appendChild(breakLine);
    }
    const highestElement = document.getElementById('highest');
    highestElement.textContent = `${p}`;
  }
  
  function resetGame() {
    initializeGrid();
  }
  
  function move(direction) {
    let moved = false;

    const shift = (arr) => {
      let shifted = false;
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === 0) {
          arr.splice(i, 1);
          arr.push(0);
          shifted = true;
        }
      }
      return shifted;
    };
    const merge = (arr) => {
      let merged = false;
      for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i] !== 0 && arr[i] === arr[i - 1]) {
          arr[i] *= 2;
          arr[i - 1] = 0;
          if(arr[i]>p){
            p = arr[i]
          }

        }
        
      }
      return merged;
    };

    
    const shiftAndMerge = (arr) => {
      return shift(arr) | merge(arr) | shift(arr);
    };
    

    const moveLeft = () => {
      let changed = false;
      for (let i = 0; i < GRID_SIZE; i++) {
        if (shiftAndMerge(grid[i])) {
          changed = true;
        }
      }
      return changed;
    };

    const moveRight = () => {
      let changed = false;
      for (let i = 0; i < GRID_SIZE; i++) {
        const row = grid[i].reverse();
        if (shiftAndMerge(row)) {
          changed = true;
        }
        grid[i] = row.reverse();
      }
      return changed;
    };

    const moveUp = () => {
      let changed = false;
      for (let j = 0; j < GRID_SIZE; j++) {
        const col = [];
        for (let i = 0; i < GRID_SIZE; i++) {
          col.push(grid[i][j]);
        }
        if (shiftAndMerge(col)) {
          changed = true;
        }
        for (let i = 0; i < GRID_SIZE; i++) {
          grid[i][j] = col[i];
        }
      }
      return changed;
    };

    const moveDown = () => {
      let changed = false;
      for (let j = 0; j < GRID_SIZE; j++) {
        const col = [];
        for (let i = GRID_SIZE - 1; i >= 0; i--) {
          col.push(grid[i][j]);
        }
        if (shiftAndMerge(col)) {
          changed = true;
        }
        for (let i = GRID_SIZE - 1; i >= 0; i--) {
          grid[i][j] = col[GRID_SIZE - 1 - i];
        }
      }
      return changed;
    };

    if (direction === 'left') {
      moved = moveLeft();
    } else if (direction === 'right') {
      moved = moveRight();
    } else if (direction === 'up') {
      moved = moveUp();
    } else if (direction === 'down') {
      moved = moveDown();
    }

    if (moved) {
      addRandomTile();
      updateGrid();
      if (checkGameOver()) {
        alert('Game Over!');
      }
    }
  }

  function checkGameOver() {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) {
          return false;
        }
        if (i !== GRID_SIZE - 1 && grid[i][j] === grid[i + 1][j]) {
          return false;
        }
        if (j !== GRID_SIZE - 1 && grid[i][j] === grid[i][j + 1]) {
          return false;
        }
      }
    }
    return true;
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
      move('up');
    } else if (event.key === 'ArrowDown') {
      move('down');
    } else if (event.key === 'ArrowLeft') {
      move('left');
    } else if (event.key === 'ArrowRight') {
      move('right');
    }
  });

  initializeGrid();