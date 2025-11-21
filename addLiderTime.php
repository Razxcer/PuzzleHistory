<?php
try {
    $liders = new PDO('mysql:host=MySQL-8.4;port=3306;dbname=puzzleHistory', "root");
}
catch (PDOException $e){
    echo "<script>console.log('Не робит ни чё checkLogIn');</script>", $e;
}


isset($_POST['login'])?$inputLogin = $_POST['login']:$inputLogin = "anonimus";
isset($_POST['level'])?$inputLevel = $_POST['level']:$inputLevel = "anonimus";
isset($_POST['name'])?$inputName = $_POST['name']:$inputName = "anonimus";
isset($_POST['time'])?$inputTime = intval($_POST['time']):$inputTime = 0;

    $result = $liders->query("SELECT * FROM Liderboard WHERE login = '$inputLogin' AND level = '$inputLevel';");
    $num_rows = $result->rowCount();
    
    if($num_rows>0)
    {
        if(intval($result->fetch()['time']) > $inputTime)
        {
            $liders->query("UPDATE Liderboard SET time = '$inputTime' WHERE login = '$inputLogin' AND level = '$inputLevel';");
        }
        header("Location:./liderBoard.php");
        exit;
    }
    else{
        $liders->query("INSERT INTO Liderboard (login, level, name, time) VALUES ('$inputLogin', '$inputLevel', '$inputName', $inputTime);");
        header("Location:./liderBoard.php");
        exit;
    }
?>