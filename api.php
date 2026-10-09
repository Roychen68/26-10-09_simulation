<?php
session_start();
$pdo = new PDO ("mysql:host=localhost;charset=utf8;dbname=19a04","root","");


$action = $_POST['action'];
switch ($action) {
    case 'forecast_get':
        $stmt = $pdo->prepare("SELECT * FROM `forecast`");
        $stmt->execute();
        echo json_encode($stmt->fetchAll());
        break;
    case 'journal_get':
        $stmt = $pdo->prepare("SELECT * FROM `diaries`");
        $stmt->execute();
        echo json_encode($stmt->fetchAll());
        break;
    
    case 'bless':
        $stmt = $pdo->prepare("UPDATE `diaries` SET `bless` = `bless`+1  WHERE `id` = ?");
        $stmt->execute([$_POST['id']]);
        $stmt = $pdo->prepare("SELECT `bless` FROM `diaries` WHERE `id` = ?");
        $stmt->execute([$_POST['id']]);
        echo $stmt->fetchColumn();
        break;
    case 'journal_post':
        $path = "images/".$_FILES['file']['name'];
        move_uploaded_file($_FILES['file']['tmp_name'],$path);
        $stmt = $pdo->prepare("INSERT INTO `diaries`(`name`, `Email`, `location`, `date`, `rate`, `feedback`, `file`, `bless`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?)");
        $stmt->execute([
            $_POST['name'],
            $_POST['Email'],
            $_POST['location'],
            $_POST['date'],
            $_POST['rate'],
            $_POST['feedback'],
            $path,
            0,
            date("Y-m-d H:i:s"),
        ]);
        break;
    case 'del':
        $stmt = $pdo->prepare("DELETE FROM `diaries` WHERE `id` = ?");
        $stmt->execute([$_POST['id']]);
        $stmt = $pdo->prepare("UPDATE `deleted` SET `record` = `record`+1 WHERE 1");
        $stmt->execute();
        break;

    case 'record':
        $stmt = $pdo->prepare("SELECT `record` FROM `deleted` WHERE 1");
        $stmt->execute();
        echo $stmt->fetchColumn();
        break;
}
?>