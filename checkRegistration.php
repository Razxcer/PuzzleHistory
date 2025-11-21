<?php
    session_start();




    $_SESSION['login'] = $_POST['login'];
    $_SESSION['password'] = $_POST['password'];
    $_SESSION['password2'] = $_POST['password2'];
    $_SESSION['name'] = $_POST['name'];
    $_SESSION['warning'] = null;




    
    if($_POST['password'] == "" || $_POST['password2'] == "" || $_POST['login']=="")
    {
        $_SESSION['warning'] = "Введите ВСЕ данные!";
        header("Location: ./registration.php");
        exit;
    }
    else if($_POST['password'] != $_POST['password2'])
    {
        $_SESSION['warning'] = "Введёные пароли не совпадают!";
        header("Location: ./registration.php");
        exit;
    }
    else{

        try {
            $users = new PDO('mysql:host=MySQL-8.4;port=3306;dbname=puzzleHistory', "root");
        }
        catch (PDOException $e){
            echo "<script>console.log('Не робит ни чё');</script>", $e;
        }

        $inputLogin = $_POST['login'];
        $inputPassword = $_POST['password'];
        $inputName = $_POST['name'];


        $thisUser = "SELECT * FROM users WHERE login = '$inputLogin'";

        $result = $users->query($thisUser);
        $num_rows = $result->rowCount();

        $result = null;
        $thisUser = null;

        if($num_rows==0){

            $newStr = $users->query("INSERT INTO users (login, password, name) VALUES ('$inputLogin', '$inputPassword', '$inputName');");
            
            $_SESSION['account'] = $inputLogin;
            $users = null;
            $inputLogin = null;
            $inputPassword = null;
            $inputName = null;
            $_SESSION['warning'] = null;
            header("Location: ./index.php");
            exit;
            
        }
        else{
            $users = null;
            $inputLogin = null;
            $inputPassword = null;
            $inputEmail = null;

            $_SESSION['warning'] = "Такой аккаунт уже существует, выполните вход";
            header("Location: ./logIn.php");
            exit;
        }   

    }



?>