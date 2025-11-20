<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация</title>
    <link rel="stylesheet" href="./css/styleHead.css?<?echo time();?>">
    <link rel="stylesheet" href="./css/styleRegistration.css?<?echo time();?>">
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

    <div class="LogIn">
    <form action="checkRegistration.php" method="post">
        <div class="title"><p>Регистрация</p></div>
        <input type="text" name="name" id="name" class="input name" placeholder="Имя Фамилия" maxlength="100" value = <?php echo isset($_SESSION['name'])?$_SESSION['name']:""; ?>>
        <input type="text" name="login" id="login" class="input login" placeholder="Логин" minlength="2" maxlength="40" value = <?php echo isset($_SESSION['login'])?$_SESSION['login']:""; ?>>
        <input type="password" name="password" id="password" class="input password" placeholder="Пароль" minlength="6" maxlength="100" value = <?php echo isset($_SESSION['password'])?$_SESSION['password']:""; ?>>  
        <input type="password" name="password2" id="password2" class="input password2" placeholder="Повторите пароль" minlength="6" maxlength="100" value = <?php echo isset($_SESSION['password2'])?$_SESSION['password2']:""; ?>>
        <div class="warning" style="<?php echo isset($_SESSION['warning'])?"display: block;":"display: none;"; ?>"><?php echo isset($_SESSION['warning'])?$_SESSION['warning']:""; ?></div>
        <input type="submit" value="Зарегистрироваться" class="submit" id="reg">
    </form>
</div>


</div>





</body>
</html>