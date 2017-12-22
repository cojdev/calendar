<?php

require_once 'config.php';

try {
    $DB = new PDO(DB_DSN, DB_USER, DB_PASS);
}
catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

if (isset($_POST['data'])) {

    $data = json_decode($_POST['data']);

    try {
        //insert into database
        $query = $DB->prepare('INSERT INTO todolist (text, checked, date) VALUES (:text, :checked, :date)');
        $query->execute(array(
            ':text' => $data->text,
            ':checked' => $data->checked,
            ':date' => $data->date
        ));
        echo "SUCCESS";
    }
    catch(PDOException $e) {
        echo "Entry NOT Added:" . $e->getMessage();
    }
}
else {
    echo "No data found.";
}

?>