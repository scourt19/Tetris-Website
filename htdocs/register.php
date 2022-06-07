<html lang="en">
    <head>
        <title>Registration Page</title>
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
            <div class="box">
                <form action="index.php" method="post">
                    <label for="fname">Firstname:</label>
                    <input type="text" name="fname" id="fname"><br>
                    <label for="lname">Lastname:</label>
                    <input type="text" name="lname" id="lname"><br>
                    <label for="uname">Username:</label>
                    <input type="text" name="uname" id="uname"><br>
                    <label for="pwd">Password:</label>
                    <input type="password" name="pwd" id="pwd" placeholder="password"><br>
                    <label for="confirmpwd">Confirm Password:</label>
                    <input type="password" name="confirmpwd" id="confirmpwd" placeholder="Confirm password"><br>
                    Display scores on the leaderboard?<br>
                    <label for="display">Yes:
                    <input type="radio" name="display" value=1 id="yes">
                    <label for="display">No:
                    <input type="radio" name="display" value=0 id="no">
                    <input type="submit" name="registersubmit">
                    <?php
                    if (isset($_GET["error"])) {
                        if ($_GET["error"] == "emptyinput") {
                            echo "<p>Fill in every field!</p>";
                        }
                        else if ($_GET["error"] == "passwordsdonotmatch") {
                            echo "<p>Make sure that the passwords match!</p>";
                        }
                        else if ($_GET["error"] == "invalidusername") {
                            echo "<p>Type a valid username!</p>";
                        }
                        else if ($_GET["error"] == "usernameexists") {
                            echo "<p>The username already exists!</p>";
                        }
                    }
                    ?>
                </form>
            </div>
        </div>
    </body>
</html>