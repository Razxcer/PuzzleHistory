<?php
session_start();

    $_SESSION['login'] = $_POST['login'];
    $_SESSION['password'] = $_POST['password'];
    $_SESSION['warning'] = null;

    if($_POST['login']=="" || $_POST['password'] == "")
    {
        $_SESSION['warning'] = "Введите ВСЕ данные!";
        header("Location: ./logIn.php");
        exit;
    }
    else{
        try {
            $users = new PDO('mysql:host=MySQL-8.4;port=3306;dbname=puzzleHistory', "root");
        }
        catch (PDOException $e){
            echo "<script>console.log('Не робит ни чё checkLogIn');</script>", $e;
        }

        $inputLogin = $_POST['login'];
        $inputPassword = $_POST['password'];


        
        $loginQue = "SELECT * FROM users WHERE login = '$inputLogin'";
        $LoginPasswordQue = "SELECT * FROM users WHERE login = '$inputLogin' AND password = '$inputPassword'";

        $result = $users->query($LoginPasswordQue);
        $num_rows = $result->rowCount();
        if($num_rows>0)
        {
            $_SESSION['account'] = $inputLogin;

            $users = null;
            $result = null;
            $LoginPasswordQue = null;
            $loginQue = null;

            header("Location: ./index.php");
            exit;
        }
        else if($num_rows == 0)
        {
            $result = $users->query($loginQue);
            $num_rows = $result->rowCount();
            if($num_rows>0)
            {
                $users = null;
                $result = null;
                $LoginPasswordQue = null;
                $loginQue = null;

                $_SESSION['warning'] = "Введён неверный пароль!";
                header("Location: ./logIn.php");
                exit;
            }
            else{
                $users = null;
                $result = null;
                $LoginPasswordQue = null;
                $loginQue = null;

                $_SESSION['warning'] = "Введён неверный логин или пароль!";
                header("Location: ./logIn.php");
                exit;
            }
        }


        $users = null;
        $result = null;
        $thisUser = null;

    }

?>