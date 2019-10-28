<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Slim\App as App;
use \Task as Task;

require_once 'vendor/autoload.php';

session_start();

// Configuration
$config = [
  'db' => [
    'host'   => '192.168.99.100:3320',
    'user'   => 'user',
    'pass'   => 'pass',
    'dbname' => 'todoapp'
  ],
  'displayErrorDetails' => true,
];

$app = new App(['settings' => $config]);

$container = $app->getContainer();
$container['db'] = function ($c) {
  $db = $c['settings']['db'];
  try {
    $pdo = new PDO(
      'mysql:host=' . $db['host'] . ';dbname=' . $db['dbname'],
      $db['user'],
      $db['pass'],
      []
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch (PDOException $e) {
    die($e->getMessage());
  }

  return $pdo;
};

$app->get('/', function (Request $request, Response $response, array $args) {
  $data = [
    'foo' => 'bar',
    'fizz' => 'buzz',
    'args' => $args,
  ];

  return $response->withJson($data);
});

// get tasks
$app->get('/task[/[{id}]]', function ($request, $response, $args) {
  $model = new Task($this->db);

  // get single task by id
  if ($args['id']) {
    $ret = $model->get($args['id']);
  // get all tasks
  } else {
    $ret = $model->getAll();
  }

  if (!$ret['success']) {
    $ret = [
      "code" => $ret['code'],
      "message" => $ret['message'],
    ];
  }

  return $response->withJson($ret, $ret['code'] ?: 200);
});

// add task
$app->post('/task/add', function ($request, $response, $args) {
  $body = $request->getParsedBody();
  $body['due'] = strtotime($body['due']);
  $body['due'] = date('Y-m-d H:i:s', $body['due']);

  $model = new Task($this->db);
  $ret = $model->add($body);

  return $response->withJson($ret, $ret['code'] ?: 200);
});

// delete task
$app->delete('/task/{id}', function ($request, $response, $args) {
  $model = new Task($this->db);
  $ret = $model->delete($args['id']);

  return $response->withJson($ret, $ret['code'] ?: 200);
});


// run application
$app->run();
