<?php
    if (isset($_POST["loginsubmit"])) {

        $uname = $_POST["uname"];
        $pwd = $_POST["pwd"];

        require_once 'database.inc.php';
        require_once 'functions.inc.php';

        if (emptyLogin($uname, $pwd) !== false) {
            header("location: ../index.php?error=emptyinput");
            exit();
        }
        
        loginUser($conn, $uname, $pwd);
    }
?>