<?php 

/**
 * Database Connection
 */
define('DB_NAME', 'testblog');
define('DB_DSN', 'mysql:host=localhost;dbname=' . DB_NAME);
define('DB_USER', 'testblog');
define('DB_PASS', 'password');

try {
    $DB = new PDO(DB_DSN, DB_USER, DB_PASS);
}
catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

define('WEBSITE_ROOT', '//localhost/php-blog/public/');

?>