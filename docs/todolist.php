<?php

require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try {
    $DB = new PDO(DB_DSN, DB_USER, DB_PASS);
}
catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

$query = $DB->prepare(
    "SELECT * from todolist");
$query->execute();

$output = [];

$row = $query->fetchAll();

$output = json_encode($row);

print_r($output);

?>