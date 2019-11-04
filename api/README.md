# Todo API

## Endpoints

### Get all tasks `GET /task`
<details>
<summary>Response</summary>
<p>

```json
{
  "success": "Boolean of response success",
  "data": "Returned data",
  "code": "HTTP response code",
  "message": "Response message"
}
```

</p>
</details>

### Add task - `POST /task`
<details>
<summary>Request</summary>
<p>

```json
{
  "description": "task description",
  "starred": "highlighted task",
  "due": "due date"
}
```

</p>
</details>

<details>
<summary>Response</summary>
<p>

```json
{
  "success": "Boolean of response success",
  "message": "Response message"
}
```

</p>
</details>


### Get task by id - `GET /task/:id`
<details>
<summary>Response</summary>
<p>

```json
{
  "success": "Boolean of response success",
  "data": "Returned data",
  "code": "HTTP response code",
  "message": "Response message"
}
```

</p>
</details>

### Edit task by id - `PATCH /task/:id`
<details>
<summary>Response</summary>
<p>

```json
{
  "success": "Boolean of response success",
  "data": "Returned data",
  "code": "HTTP response code",
  "message": "Response message"
}
```

</p>
</details>

### Delete task by id - `DELETE /task/:id`
<details>
<summary>Response</summary>
<p>

```json
{
  "success": "Boolean of response success",
  "data": "Returned data",
  "code": "HTTP response code",
  "message": "Response message"
}
```

</p>
</details>

---

## Model

### Task
**Schema**
```json
{
  "id": "unique identifier",
  "description": "task description",
  "completed": "date completed. **NULL** if not completed",
  "starred": "Int. highlighted tasks",
  "created": "date created",
  "modified": "date edited",
  "due": "due date"
}
  ```