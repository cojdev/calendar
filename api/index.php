<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once 'vendor/autoload.php';

session_start();

// $loader = new \Twig\Loader\FilesystemLoader('../views');

$config['db'] = [
  'host'   => 'localhost',
  'user'   => 'todo',
  'pass'   => 'todo',
  'dbname' => 'todo'
];

$config['displayErrorDetails'] = true;

$app = new \Slim\App(['settings' => $config]);

$container = $app->getContainer();

// $container['view'] = new \Twig\Environment($loader);

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

// require_once './../routes/app.php';

$app->get('/', function (Request $request, Response $response, array $args) {
  // $name = $args['name'];
  $data = [
    'foo' => 'bar',
    'fizz' => 'buzz',
  ];
  // $response->getBody()->write("Hello, $name");

  return $response->withJson($data);
});

$app->get('/task[/[{id}]]', function ($request, $response, $args) {
  $model = new Task($this->db);

  // Single Task
  if ($args['id']) {
      $task = $model->get($args['id']);
      
      if ($task->success === false) {
          // Utility::pre_dump($task);
          // $this->response = 
          $html = $this->view->render('error.twig', [
              "code" => $task['code'],
              "message" => $task['message'],
          ]);
          
          return $response->withStatus($task['code'])->write($html);
      }

      // Utility::pre_dump($task);
  
      $html = $this->view->render('task.twig', $task);
  // Task list
  } else {
      $tasks = $model->getAll();
  
      $html = $this->view->render('index.twig', [
          'heading' => 'Tasks',
          'tasks' => $tasks,
      ]);
  }

  return $response->write($html);
});

$app->run();
