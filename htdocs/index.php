<html lang="en">
    <head>
        <title>Home Page</title>
        <link rel="stylesheet" href="styles/style.css">
        <meta charset="utf-8">
    </head>
    <body>
        <?php session_start();
        if (isset($_POST["registersubmit"])) {
            $fname = $_POST["fname"];
            $lname = $_POST["lname"];
            $uname = $_POST["uname"];
            $pwd = $_POST["pwd"];
            $confirmpwd = $_POST["confirmpwd"];
            $display = $_POST["display"];
            
            require_once 'includes/database.inc.php';
            require_once 'includes/functions.inc.php';

            if (emptySignup($fname, $lname, $uname, $pwd, $confirmpwd) !== false) {
                header("location: register.php?error=emptyinput");
                exit();
            }
            if (passwordMatch($pwd, $confirmpwd) !== false) {
                header("location: register.php?error=passwordsdonotmatch");
                exit();
            }
            if (invalidUsername($uname) !== false) {
                header("location: register.php?error=invalidusername");
                exit();
            }
            if (userExists($conn, $uname) !== false) {
                header("location: register.php?error=usernameexists");
                exit();
            }
            createUser($conn, $uname, $fname, $lname, $pwd, $display);
        }
        ?>
        <ul class="navbar">
			<li style="float:left"><a href="index.php" name="home">Home</a></li>
			<li><a href="tetris.php" name="tetris">Play Tetris</a></li>
			<li><a href="leaderboard.php" name="leaderboard">Leaderboard</a></li>						
		</ul>
        <div class="main">
            <?php if (isset($_SESSION['User'])) : ?>
                <div class="box">
                    <h1>Welcome to Tetris</h1><br>
                    <button onclick="window.location.href='tetris.php';"><h2>Click here to play</h2></button>
                </div>
            <?php else :?>
                <div class="box">
                    <form action="includes/login.inc.php" method="post">
                    <label for="uname">Username:</label>
                    <input type="text" name="uname" id="uname"><br>
                    <label for="pwd">Password:</label>
                    <input type="password" name="pwd" id="pwd"><br>
                    <input type="submit" name="loginsubmit">
                    </form>
                    <p>Don't have a user account?<br><a href="register.php">Register now</a></p>
                </div>
            <?php endif; ?>
        </div>
    </body>
</html>