<?php
function emptySignup($fname, $lname, $uname, $pwd, $confirmpwd) {
    $result = false;
    if (empty($fname) || empty($lname) || empty($uname) || empty($pwd) || empty($confirmpwd)){
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function passwordMatch($pwd, $confirmpwd) {
    $result = false;
    if ($pwd!== $confirmpwd) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function invalidUsername($uname) {
    $result = false;
    if (!preg_match("/^[a-zA-Z0-9]*$/", $uname)) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function userExists($conn, $uname) {
    $sql = "SELECT * FROM Users WHERE UserName = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../register.php?error=stmtfailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "s", $uname);
    mysqli_stmt_execute($stmt);
    $resultData = mysqli_stmt_get_result($stmt);
    if ($row = mysqli_fetch_assoc($resultData)) {
        return $row;
    }
    else {
        $result = false;
        return $result;
    }
    mysqli_stmt_close($stmt);
}

function createUser($conn, $uname, $fname, $lname, $pwd, $display) {
    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
    $sql = "INSERT INTO Users VALUES ('$uname', '$fname', '$lname', '$hashedPwd', $display)";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
}

function emptyLogin($uname, $pwd) {
    $result = false;
    if (empty($uname) || empty($pwd)) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}


function loginUser($conn, $uname, $pwd) {
    $userExists = userExists($conn, $uname);

    if ($userExists === false) {
        header("location: ../login.php?error=wronglogin");
    }
    $pwdHashed = $userExists["Password"];
    $checkPwd = password_verify($pwd, $pwdHashed);

    if ($checkPwd === false) {
        header("location: ../index.php?error=wronglogin");
        exit();
    }
    else if ($checkPwd === true) {
        session_start();
        $_SESSION["User"] = $userExists["UserName"];
        header("location: ../index.php");
    }
}

function enterScore($conn, $uname, $score) {
    $sql = "INSERT INTO Scores (Username, Score) VALUES ('$uname', $score)";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
}

function checkDisplay($conn, $uname) {
    $result = false;
    $sqlDisplay = "SELECT UserName, Display FROM Users";
    $resultDisplay = mysqli_query($conn, $sqlDisplay);
    if(mysqli_num_rows($resultDisplay)>0) {
        while($rowDisplay = mysqli_fetch_assoc($resultDisplay)) {
            $name=$rowDisplay['UserName'];
            $display=$rowDisplay['Display'];
            if($name==$uname) {
                if ($display==1) {
                    $result = true;
                }
            }
        }
    }
    else {
        $result = false;
    }
    return $result;
}
function addData($conn) {
    $sqlScore = "SELECT * FROM Scores ORDER BY Score DESC";
    $resultScore = mysqli_query($conn, $sqlScore);
    if(mysqli_num_rows($resultScore)>0) {
        while($rowScore = mysqli_fetch_assoc($resultScore)) {
            $name=$rowScore['Username'];
            $score=$rowScore['Score'];
            $checkDisplay = checkDisplay($conn, $name);
            if($checkDisplay === true) {
                echo 
                "<tr>
                    <td>$name</td>
                    <td>$score</td>
                </tr>";
            } else {
                continue;
            }
        }
    }
}
?>