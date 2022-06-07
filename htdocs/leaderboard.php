<html lang="en">
    <head>
        <title>Leaderboard</title>
        <link rel="stylesheet" href="styles/style.css">
        <meta charset="utf-8">
        <script>function refresh() {window.location.href = "leaderboard.php"}</script>
    </head>
    <body>
        <?php session_start();
        if (isset($_GET["num"])) {
    
            $uname = $_SESSION['User'];
            $score = $_GET["num"];

            require_once 'includes/database.inc.php';
            require_once 'includes/functions.inc.php';   

            enterScore($conn, $uname, $score);
        }
        ?>
        <ul class="navbar">
			<li style="float:left"><a href="index.php" name="home">Home</a></li>
			<li><a href="tetris.php" name="tetris">Play Tetris</a></li>
			<li><a href="leaderboard.php" name="leaderboard">Leaderboard</a></li>						
		</ul>
        <div class="main">
            <div id="submitcontainer">
                <button onclick="refresh()"><h4>Show Results</h4></button>
            </div>
            <div class="box" style="height:350px">
                <table id="myTable">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        require_once 'includes/database.inc.php';
                        require_once 'includes/functions.inc.php';

                        addData($conn);
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </body>
</html>