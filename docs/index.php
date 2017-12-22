<?php 

//require_once '../app/init.php';

?>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="Charles Ojukwu">
<meta name="description" content="An MVC Calendar Todo App">
<meta name="keywords" content="">
<title>TVF Digital - Calendar Todo App</title>
<link href="https://fonts.googleapis.com/css?family=Hind:300,400,500,600" rel="stylesheet">
<!-- <link rel="stylesheet" href="css/main.css"> -->
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
<div class="wrap">
    <!-- Vue App -->
    <div id="app" class="app">
        <!-- Toolbar -->
        <div class="toolbar">
            <h1>Calendar Todo App</h1>
            <button @click="toggleState">Toggle</button>
        </div>
        <!-- View -->
        <div class="container">
            <!-- Split Screen -->
                <div :class="{calendar: isState('split'), 'calendar-full': isState('full')}">
                    <div class="calendar-head">
                        {{ monthNames[activeMonth] }} {{ activeYear }}
                        <button class="arrow-button" @click="prevYear()">
                            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                        </button>
                        <button class="arrow-button" @click="prevMonth()">
                            <i class="fa fa-angle-left" aria-hidden="true"></i>
                        </button>
                        <button class="arrow-button" @click="nextMonth()">
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </button>
                        <button class="arrow-button" @click="nextYear()">
                            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                        </button>
                    </div>

                    <table class="calendar-table" v-cloak>
                        <thead>
                            <tr class="calendar-weekdays">
                                <td v-for="weekday in weekdayNames">{{ weekday }}</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="week in getWeeks">
                                <td v-for="day in week" :class="{today: isToday(day.day), selected: isSelected(day.day)}" @click="selectDay(day.day)">
                                    {{ day.day }}
                                    <template v-if="day.day">
                                        <ul :class="{'calendar-dots': isState('split'), 'calendar-list': isState('full')}" v-if="day.todos.length > 0 && day.day">
                                            <li v-for="task in day.todos">
                                                <template v-if="isState('full')">
                                                    {{ task.text }}
                                                </template>
                                                
                                            </li>
                                        </ul>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div :class="{todo: isState('split'), 'full-todo': isState('full')}">
                    <div class="todo-date">{{ formatDate(selected) }}</div>
                    <label for=""></label>
                    <input type="text" placeholder="Add a new task">
                    <template v-if="currentList.length !== 0">
                        <ul>
                            <li v-for="task in currentList">
                                <input type="checkbox" name="checked" id="checked">
                                {{ task.text }}
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <p>You have no tasks</p>
                    </template>
                </div>
            </template>
        </div>
        

    </div>
</div>


<script src="js/vue.js"></script>
<script src="js/main.js"></script>
</body>

</html>