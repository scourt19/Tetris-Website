<html lang="en">
    <head>
        <title>Tetris</title>
        <link rel="stylesheet" href="styles/style.css">
        <meta charset="utf-8">
    </head>
    <body>
        <ul class="navbar">
			<li style="float:left"><a href="index.php" name="home">Home</a></li>
			<li><a href="tetris.php" name="tetris">Play Tetris</a></li>
			<li><a href="leaderboard.php" name="leaderboard">Leaderboard</a></li>						
		</ul>
        <div class="main">
            <div id="tetris-bg">
            <button onclick="startGame()" id="startGame">start game</button>
            <div class="scorecontainer">
                <h3>Score:</h3>
                <h2 id="score"></h2>
            </div>
            <script src="javascript/tetris.js"></script>
        </div>
    </body>
</html>