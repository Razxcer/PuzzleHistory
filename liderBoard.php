<?php session_start();?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Таблица лидеров</title>
    <link rel="stylesheet" href="./css/styleLiderBoard.css?<?echo time();?>">
    <link rel="stylesheet" href="./css/styleHead.css?<?echo time();?>">
</head>
<body>
    
<div class="wrapper">
    <div class="head">
        <a class="logo" href="./index.php">Puzzle History</a>

        <a class="liderboardLink" href="./liderBoard.php" data-title="Таблица лидеров">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
            </svg>
        </a>

        <a href="<?php echo isset($_SESSION['account'])?"":"./registration.php" ?>" class="account" data-title="<?php echo isset($_SESSION['account'])?$_SESSION['account']:"Создать аккаунт";?>">
                
            <?php 
            if(isset($_SESSION['account']))
            {
                    echo '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>';
                    
            }
            else{
                echo '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                    </svg>';
            }
        ?>  
        </a>
    </div>

    <div class="levels">
        <form action="" method="post">
            <input type="text" name="level" id="level1" value="Россия - обычно" style="display: none;">
            <button type="submit" class="level" style="<?php echo isset($_POST['level'])?$_POST['level']=="Россия - обычно"?"border: 4px solid var(--second-color);":"":"border: 4px solid var(--second-color);"?>">Россия - обычно</button>
        </form>
        <form action="" method="post">
            <input type="text" name="level" id="level2" value="Россия - сложно" style="display: none;">
            <button type="submit" class="level" style="<?php echo isset($_POST['level'])?$_POST['level']=="Россия - сложно"?"border: 4px solid var(--second-color);":"":""?>">Россия - сложно</button>
        </form>
    </div>

    <div class="mainTable">

    <table>
    <thead>
        <tr>
        <th>Место</th>
        <th>Время</th>
        <th>Игрок</th>
        <th>Имя Фамилия</th>
        </tr>
    </thead>
    <tbody>

        <?php  

            try {
                $liders = new PDO('mysql:host=MySQL-8.4;port=3306;dbname=puzzleHistory', "root");
            }
            catch (PDOException $e){
                echo "<script>console.log('Не робит ни чё checkLogIn');</script>", $e;
            }

            isset($_POST['level'])?$Level = $_POST['level']:$Level = "Россия - обычно";


            

            if($result = $liders->query("SELECT * FROM Liderboard WHERE level = '$Level' ORDER BY time;")){
                $plase = 1;

                foreach($result as $row){
                    echo "<tr> <td>";
                    echo $plase;
                    $plase+=1;
                    echo "</td> <td>";
                    if(floor(intval($row['time'])%60/10)==0)
                    {
                        echo strval(strval(intval(floor($row['time'])/60)) . ":0" . strval(intval($row['time'])%60));
                    }
                    else{
                        echo strval(strval(intval(floor($row['time'])/60)) . ":" . strval(intval($row['time'])%60));
                    }
                    echo "</td> <td>";
                    echo $row['login'];
                    echo "</td> <td>";
                    echo $row['name'];
                    echo "</td> </tr>";
                }
            }
        ?>
    </tbody>
    </table>

    
</div>
















</div>





















</body>
</html>