document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.querySelector(".gameContainer");
  const ball = document.querySelector(".ball");
  const paddle = document.querySelector(".paddle");

  //ブロックを格納する配列を宣言
  const arrBlock = [];

  // ブロックの行数
  const blockLine = 4;
  // １行あたりのブロック数
  const numBlocks = 8;
  // １行ごとのブロックカラー
  const blockColor = ["yellow", "pink", "red", "blue"];

  for (let i = 0; i < blockLine * numBlocks; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    gameContainer.appendChild(block);
    // 32個のdivタグを追加した

    const row = Math.floor(i / numBlocks);
    const col = i % numBlocks;
    const colorIndex = row % blockColor.length;

    block.style.position = "absolute";
    block.style.top = row * 30 + "px";
    block.style.left = col * 75 + "px";
    block.style.backgroundColor = blockColor[colorIndex];
    arrBlock.push(block);
  }

  let ballX = 300;
  let ballY = 200;
  let ballSpeedX = 2;
  let ballSpeedY = 2;

  start();

  function start() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //ボールは白枠を基準とした上から202px、左から302pxからスタートする
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    let allBlocksCleared = true;

    // 衝突検出（左右）
    if (ballX < 0 || ballX + 20 > 600) {
      ballSpeedX = -ballSpeedX;
    }
    // 衝突検出（上）
    if (ballY < -50) {
      ballSpeedY = -ballSpeedY;
    }
    // 衝突検出（下）
    if (ballY + 20 > 400) {
      gameOver();
      return;
    }
    // 衝突検出（パドル）
    if (
      ballX + 20 > paddle.offsetLeft &&
      ballX - 20 < paddle.offsetLeft + paddle.offsetWidth &&
      ballY + 20 > paddle.offsetTop &&
      ballY - 20 < paddle.offsetTop + paddle.offsetHeight
    ) {
      ballSpeedY = -ballSpeedY;
    }
    // 衝突検出（ブロック）
    arrBlock.forEach((block) => {
      if (block.style.display !== "none") {
        allBlocksCleared = false;
        if (
          ballX + 20 > block.offsetLeft &&
          ballX - 20 < block.offsetLeft + block.offsetWidth &&
          ballY + 20 > block.offsetTop &&
          ballY - 20 < block.offsetTop + block.offsetHeight
        ) {
          ballSpeedY = -ballSpeedY;
          block.style.display = "none";
        }
      }
    });

    if (allBlocksCleared) {
      gameClear();
      return;
    }
    requestAnimationFrame(start);
  }

  document.addEventListener("mousemove", function (event) {
    const mouseX = event.clientX - gameContainer.getBoundingClientRect().left;
    const paddleX = mouseX - paddle.offsetWidth / 2;

    if (paddleX < 0) {
      paddle.style.left = "0px";
    } else if (paddleX + paddle.offsetWidth > gameContainer.offsetWidth) {
      paddle.style.left = gameContainer.offsetWidth - paddle.offsetWidth + "px";
    } else {
      paddle.style.left = paddleX + "px";
    }
  });

  function gameClear() {
    alert("ゲームクリア！新たにゲームを開始しますか？");
    resetGame();
  }

  function gameOver() {
    const isRestart = confirm("ゲームオーバー もう一度プレイしますか？");
    if (isRestart) {
      resetGame();
    }
  }

  function resetGame() {
    ballX = 300;
    ballY = 200;
    ballSpeedX = 2;
    ballSpeedY = 2;

    paddle.style.left = "250px";

    arrBlock.forEach(function (block) {
      block.style.display = "block";
    });
  }
});
