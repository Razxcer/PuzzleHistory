<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ваше имя</title>
    <link rel="stylesheet" href="./css/styleLogIn.css?<?echo time();?>">
</head>
<body>

    <div class="wrapper">


        <form action="<?php echo $_POST['game']?>" class="AreaForName" method="post">
            <div class="YourName">Как тебя зовут?</div>
            <input type="text" name="name" id="name" placeholder="Имя фамилия" minlength="3" maxlength="70" required >
            <button type="submit">Играть</button>
        </form>



    </div>
    
</body>
</html>