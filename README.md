# Calendar To-Do App

This is a fully responsive Calendar To-Do App that is supported on all modern browsers and IE10+. Tasks can be added to specific dates and can be deleted. Tasks cannot be added to past dates.

## Setup

### Frontend

Install dependencies
```sh
npm i
```

Run frontend app
```sh
npm start
```

The app will be accessible at http://localhost:8080

### Backend

Initialise and update api submodule
```sh
git submodule init
git submodule update
```

Start docker container
```sh
# enter api directory
cd api
# start docker container
docker-compose up --build
```

#### Access docker database and install backend dependencies
```sh
# get container id
docker ps
# access container
docker exec -it <container-id> /bin/bash
# install dependencies
cd /var/www/html
composer install
```

The api will be accessible at http://localhost:4001

## Technologies Used

* Vue – Front End Framework
* SCSS – CSS Pre-processor
* Gulp – SCSS compilation, CSS minification and JS minification.
* Git – Source and Version Control
* PHP – Back End language

## Front End

There are 2 views, “Full” and “Split”. “Full” has the calendar filling most of the page and the task lists visible on individual days, whereas “Split” has the selected day’s task list is always visible. Local Storage is used to remember the last state used by the user.

## Back End

### Task model

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
