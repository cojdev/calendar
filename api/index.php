<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Slim\App as App;
use \Task as Task;

require_once 'vendor/autoload.php';

session_start();

// Environment Variables in .env file
$dotenv = Dotenv\Dotenv::create(__DIR__);
$dotenv->load();

// Configuration
$config = [
  'db' => [
    'host'   => getenv('DB_HOST'),
    'user'   => getenv('DB_USER'),
    'pass'   => getenv('DB_PASS'),
    'dbname' => getenv('DB_NAME'),
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
    echo 'Caught PDOException: ';
    die($e->getMessage());
  }

  return $pdo;
};

$app->options('/{routes:.+}', function ($request, $response, $args) {
  return $response;
});

$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
          ->withHeader('Access-Control-Allow-Origin', '*')
          ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
          ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get('/', function (Request $request, Response $response, array $args) {
  $data = [
    'foo' => 'bar',
    'fizz' => 'buzz',
    'args' => $args,
  ];

  return $response->withJson($data);
});

// get tasks
$app->get('/task', function ($request, $response, $args) {
  $model = new Task($this->db);
  $params = $request->getQueryParams();

  $ret = $model->getAll($params);

  if (!$ret['success']) {
    $ret = [
      "code" => $ret['code'],
      "message" => $ret['message'],
    ];
  }

  return $response->withJson($ret, $ret['code'] ?: 200);
});

// get single task
$app->get('/task/{id}', function ($request, $response, $args) {
  $model = new Task($this->db);
  $ret = $model->get($args['id']);

  // get all tasks
  if (!$ret['success']) {
    $ret = [
      "code" => $ret['code'],
      "message" => $ret['message'],
    ];
  }

  return $response->withJson($ret, $ret['code'] ?: 200);
});

// add task
$app->post('/task', function ($request, $response, $args) {
  $body = $request->getParsedBody();
  
  // convert to sql datetime
  $body['due'] = strtotime($body['due']);
  $body['due'] = date('Y-m-d H:i:s', $body['due']);

  $model = new Task($this->db);
  $ret = $model->add($body);

  return $response->withJson($ret, $ret['code'] ?: 200);
});

// edit task
$app->patch('/task/{id}', function ($request, $response, $args) {
  $body = $request->getParsedBody();
  // die(print_r($body, true));

  // convert to sql datetime
  if ($body['due']) {
    $body['due'] = strtotime($body['due']);
    $body['due'] = date('Y-m-d H:i:s', $body['due']);
  }

  if ($body['completed'] && $body['completed'] !== null) {
    $body['completed'] = strtotime($body['completed']);
    $body['completed'] = date('Y-m-d H:i:s', $body['completed']);
  }
  // die(print_r($body, true));

  $model = new Task($this->db);
  $ret = $model->edit($args['id'], $body);

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
