<?php
/**
 * Database Connection
 */

// Replace with your database details
define('DB_NAME', 'tvf_todo');
define('DB_DSN', 'mysql:host=localhost;dbname=' . DB_NAME);
define('DB_USER', 'root');
define('DB_PASS', '');

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
        $query = $DB->prepare('INSERT INTO todolist (text, checked, starred, date) VALUES (:text, :checked, :starred, :date)');
        $query->execute(array(
            ':text' => $data->text,
            ':checked' => $data->checked,
            ':starred' => $data->starred,
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