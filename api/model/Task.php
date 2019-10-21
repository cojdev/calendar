<?php

class Post
{

  private $db;

  function __construct($connection)
  {
    $this->db = $connection;
  }

  function getAll($limit = 9)
  {
    try {
      $query = $this->db->query(
        "SELECT
                    Post.id AS id,
                    Post.title AS title,
                    Post.body AS body,
                    Post.created AS created,
                    User.name AS author
                FROM
                    Post
                INNER JOIN
                    User ON Post.author = User.id
                ORDER BY
                    Post.created DESC
                LIMIT
                    $limit"
      );

      $result = $query->fetchAll();

      foreach ($result as $key => $value) {
        $result[$key]['date'] = date('jS M y', strtotime($result[$key]['created']));
      }

      // Utility::pre_dump($result);
      return $result;
    } catch (PDOException $e) {
      die($e->getMessage());
    } catch (Exception $e) {
      die($e->getMessage());
    }
  }

  function get($id)
  {
    try {
      $query = $this->db->query(
        "SELECT
                    Post.id AS id,
                    Post.title AS title,
                    Post.body AS body,
                    Post.created AS created,
                    User.name AS author
                FROM
                    Post
                INNER JOIN
                    User ON Post.author = User.id
                WHERE
                    Post.id={$id}"
      );

      $result = $query ? $query->fetch() : false;

      $result['date'] = date('jSF, Y', strtotime($result['created']));

      if ($result) {
        // die($result);
        return $result;
      }

      return [
        'success' => false,
        "code" => 404,
        'message' => "Post not found"
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

  function add($data)
  {
    // Utility::pre_dump($data);
    // die($this->db);
    try {
      $query = $this->db->prepare(
        "INSERT INTO
                    Post (
                        title,
                        author,
                        body,
                        created,
                        modified
                    )
                VALUES
                    (
                        ?,
                        ?,
                        ?,
                        NOW(),
                        NOW()
                    )"
      );

      $result = $query->execute([
        $data['title'],
        $data['author'],
        $data['body'],
      ]);

      if ($result === true) {
        return [
          'success' => true,
          'message' => 'Post added'
        ];
      }

      return [
        'success' => false,
        "code" => 400,
        'message' => "Bad Request",
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

  function edit($id, $data)
  {
    //
    // Utility::pre_dump($id);
    $sql = "UPDATE
                    Post
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
          'message' => 'Post modifed'
        ];
      }

      return [
        'success' => false,
        "code" => 404,
        'message' => "Post not found"
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

  function delete($id)
  {
    // Utility::pre_dump($id);
    $sql = "DELETE FROM
                    Post
                WHERE
                    id={$id}";
    // die($sql);
    try {
      $result = $this->db->query($sql);

      // Utility::pre_dump($result);
      if ($result !== false) {
        return [
          'success' => true,
          'message' => 'Post deleted'
        ];
      }

      return [
        'success' => false,
        'message' => 'Unknown Error [1]'
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
}
