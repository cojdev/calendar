#Calendar To-Do App

This is a fully responsive Calendar To-Do App that is supported on all modern browsers and IE10+. Tasks can be added to specific dates and can be deleted. Tasks cannot be added to past dates.

##Technologies Used

* Vue – Front End Framework
* SCSS – CSS Pre-processor
* Gulp – SCSS compilation, CSS minification and JS minification.
* Git – Source and Version Control
* PHP – Back End language

#Front End

There are 2 views, “Full” and “Split”. “Full” has the calendar filling most of the page and the task lists visible on individual days, whereas “Split” has the selected day’s task list is always visible. Local Storage is used to remember the last state used by the user.
Back End

The complete task list for all days can be saved to a MySQL database using the PHP PDO Class and prepared statement to prevent SQL injections. The Front End can communicate with the Back End using AJAX and dynamically generated JSON files.
The SQL commands to create the necessary table are in “init.sql”.

##Potential Additions

Given more time, I would look to implement following based on suggestions from others and my own ideas.

* When showing this app various people, a commonly suggested feature was the ability to shared task lists over email or social media.
* Another common suggestion was the ability to see more than one month at a time.
* The ability to group tasks and colour code them.
* The ability to edit tasks
* The ability to view all tasks at once.
