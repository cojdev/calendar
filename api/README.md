## Todo API

## Endpoints

### Response


### GET `/task` - Get all tasks
**Response**
```json
{
  "success": "Boolean of response success",
  "data": "Returned data",
  "code": "HTTP response code",
  "message": "Response message"
}
```
### GET `/task/{id}` - Get a single task by id
**Response**
```json
{
  "success": "Boolean of response success",
  "data": "Returned data",
  "code": "HTTP response code",
  "message": "Response message"
}
```

### POST `/task/add` - Add a task
**Request**
```json
{
  "description": "task description",
  "starred": "highlighted task",
  "due": "due date"
}
```

**Response**
```json
{
  "success": "Boolean of response success",
  "message": "Response message"
}
```

### DELETE `/task/{id}`
```
```

### PATCH `/task/{id}`
```
```

## Model

### Task

**Database schema**
```json
{
  "id": "unique identifier",
  "description": "task description",
  "completed": "date completed. NULL if not completed",
  "starred": "Int. highlighted tasks",
  "created": "date created",
  "modified": "date edited",
  "due": "due date"
}
```