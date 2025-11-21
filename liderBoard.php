<?php session_start();?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Таблица лидеров</title>
</head>
<body>
    
<?php

try {
    $liders = new PDO('mysql:host=MySQL-8.4;port=3306;dbname=puzzleHistory', "root");
}
catch (PDOException $e){
    echo "<script>console.log('Не робит ни чё checkLogIn');</script>", $e;
}

$inputLogin = $_POST['login'];
$inputLevel = $_POST['level'];
$inputName = $_POST['name'];
$inputTime = intval($_POST['time']);

$newStr = $liders->query("INSERT INTO Liderboard (login, level, name, time) VALUES ('$inputLogin', '$inputLevel', '$inputName', $inputTime);");
            



?>





</body>
</html>