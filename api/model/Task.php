<?php

class Task
{

  private $db;

  function __construct($connection) {
    $this->db = $connection;
  }

  function getAll($limit = 20)
  {
    try {
      $query = $this->db->query("SELECT * FROM Task ORDER BY Task.created DESC LIMIT $limit");
      $result = $query->fetchAll();

      if ($result) {
        return [
          'success' => true,
          'data' => $result,
        ];
      }

      return [
        'success' => false,
        "code" => 404,
        'message' => "No tasks not found"
      ];
    } catch (PDOException $e) {
      die($e->getMessage());
    } catch (Exception $e) {
      die($e->getMessage());
    }
  }

  function get($id) {
    try {
      $query = $this->db->query("SELECT * FROM Task WHERE Task.id={$id}");
      $result = $query ? $query->fetch() : false;
  
      if ($result) {
        return [
          'success' => true,
          'data' => $result,
        ];
      }

      return [
        'success' => false,
        "code" => 404,
        'message' => "Task not found"
      ];
    } catch (PDOException $e) {
      return [
        'success' => false,
        "code" => 500,
        'message' => $e->getMessage()
      ];
    } catch (Exception $e) {
      return [
        'success' => false,
        "code" => 500,
        'message' => $e->getMessage()
      ];
    }
  }

  function add($data) {
    try {
      // validation
      if ($data['description'] === '') {
        throw new Exception("No description provided.", 69);
      }
      if (strtotime($data['due']) < strtotime(date('Y-m-d h:i:s'))) {
        throw new Exception("Date due date cannot be before now.", 69);
        
      }

      $query = $this->db->prepare(
        "INSERT INTO
          Task (
            description,
            starred,
            due,
            created
          )
      VALUES
          (
            ?,
            ?,
            ?,
            NOW()
          )"
      );

      $result = $query->execute([
        $data['description'],
        $data['starred'],
        $data['due'],
      ]);

      if ($result) {
        return [
          'success' => true,
          'message' => 'Task added',
          'requestBody' => $data,
        ];
      }

      return [
        'success' => false,
        "code" => 400,
        'message' => "Bad Request",
        'requestBody' => $data,
      ];
    } catch (PDOException $e) {
      return [
        'success' => false,
        "code" => 500,
        'message' => $e->getMessage(),
        'requestBody' => $data,
      ];
    } catch (Exception $e) {
      if ($e->getCode() === 69) {
        return [
          'success' => false,
          "code" => 400,
          'message' => 'Validation Error: ' . $e->getMessage(),
          'requestBody' => $data,
        ];
      }
      return [
        'success' => false,
        "code" => 500,
        'message' => $e->getMessage(),
        'requestBody' => $data,
      ];
    }
  }

  function edit($id, $data)
  {
    //
    // Utility::pre_dump($id);
    $sql = "UPDATE
          Task
      SET
        title=?,
        author=?,
        body=?,
        modified=NOW()
      WHERE
        id=?";

    try {
      $result = $this->db->prepare($sql);
      $result->execute([
        $data['title'],
        $data['author'],
        $data['body'],
        $id,
      ]);

      // Utility::pre_dump($result);
      if ($result === true) {
        return [
          'success' => true,
          'message' => 'Task modifed'
        ];
      }

      return [
        'success' => false,
        "code" => 404,
        'message' => "Task not found"
      ];
    } catch (PDOException $e) {
      return [
        'success' => false,
        "code" => 500,
        'message' => $e->getMessage()
      ];
    } catch (Exception $e) {
      return [
        'success' => false,
        "code" => 500,
        'message' => $e->getMessage()
      ];
    }
  }

  function delete($id) {
    try {
      $query = $this->db->prepare("DELETE FROM Task WHERE id=?");
      $result = $query->execute([$id]);

      if ($result) {
        return [
          'success' => true,
          'message' => 'Task deleted'
        ];
      }

      return [
        'success' => false,
        'code' => 400,
        'message' => 'Bad request',
      ];
    } catch (PDOException $e) {
      return [
        'success' => false,
        "code" => 500,
        'message' => $e->getMessage(),
      ];
    } catch (Exception $e) {
      return [
        'success' => false,
        "code" => 500,
        'message' => $e->getMessage(),
      ];
    }
  }
}
