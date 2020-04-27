# Task manager

## Software Requirements
* Node.js
* Yarn

## For run app follow this instructions

### Installation
```bash
git clone https://github.com/Pavel1104/todo-frontend
cd todo-frontend
yarn install
```

 ### Start the App
 Excute the following command:
```bash
yarn start
```

### Follow the link [http://localhost:3000](http://localhost:3000) to view it in your browser.

___

## Requirements
I'​m a person who passionate about my own productivity. I want to manage my tasks and projects more effectively. I need a simple tool that supports me in controlling my task-flow
### Functional Requirements
- [x] I want to be able to create/​​update/​​delete projects
- [x] I want to be able to add tasks to my project
- [x] I want to be able to update/​​delete tasks
- [x] I want to be able to prioritize tasks into a project
- [x] I want to be able to choose deadline for my task
- [x] I want to be able to mark a task as 'done'

### Technical requirements
- [x] 01.​ It should be a WEB application
- [x] 02.​ For the client side must be used: HTML, CSS (any libs as Twitter Boorstrap, Blueprint ...), JavaScript (any libs as jQuery, Prototype ...)
- [x] 03.​ For a serverside any languageas Ruby,PHP,Python,JavaScript, C#, Java ...
- [x] 04.​ It should have a client side and server side validation
- [x] 05.​ It should look like on screens (see attached file “t​est-task-ruby-courses-view.png”).

### Additional requirements
- [x] It should work like one page WEB application and should use AJAX technology, load and submit data without reloading a page.
- [] It should have user authentication solution and a user should only have access to their own projects and tasks.
- [] It should have automated tests for the all functionality

---

## SQL task
Given tables:
* tasks (id, name, status, project_id)
* projects (id, name)
### Technical requirements
- [x] get all statuses, not repeating, alphabetically ordered
```
SELECT DISTINCT tasks.status
FROM tasks
ORDER BY tasks.status ASC
```
- [x] get the count of all tasks in each project, order by tasks count descending
```
SELECT projects.*, COUNT(project_id) AS task_count
FROM projects LEFT JOIN tasks ON projects.id = tasks.project_id
GROUP BY projects.id
ORDER BY task_count DESC
```
- [x] get the count of all tasks in each project, order by projects names
```
SELECT projects.*, COUNT(project_id) AS task_count
FROM projects LEFT JOIN tasks ON projects.id = tasks.project_id
GROUP BY projects.id
ORDER BY projects.name
```
- [x] get the tasks for all projects having the name beginning with "N" letter
```
SELECT tasks.name
FROM tasks
WHERE tasks.name LIKE 'N%'
ORDER by tasks.name
```
- [x] get the list of all projects containing the 'a' letter in the middle of the name, and show the tasks count near each project. Mention that there can exist projects without tasks and tasks with project_id = NULL
```
SELECT projects.*, COUNT(project_id) AS task_count
FROM projects LEFT JOIN tasks ON projects.id = tasks.project_id
WHERE projects.name LIKE '_%r%_'
GROUP BY projects.id
ORDER BY task_count DESC
```
- [x] get the list of tasks with duplicate names. Order alphabetically
```
SELECT tasks.name, COUNT(tasks.name) AS Name_count
FROM tasks
GROUP BY tasks.name
HAVING Name_count > 1
ORDER BY tasks.name ASC
```
or
```
SELECT a.*, Name_count
FROM tasks a
JOIN (SELECT tasks.name, COUNT(tasks.name) AS Name_count
FROM tasks
GROUP BY tasks.name
HAVING count(tasks.name) > 1 ) b
ON a.name = b.name
ORDER BY a.name
```
- [x] get list of tasks having several exact matches of both name and status, from the project 'Garage'. Order by matches count
```
SELECT tasks.name, COUNT(tasks.name) AS task_count
FROM tasks LEFT JOIN projects ON projects.id = tasks.project_id
WHERE projects.name = 'Garage'
GROUP BY tasks.name, tasks.status
HAVING task_count > 1
ORDER BY task_count ASC
```
or
```
SELECT a.*, task_count
FROM tasks a
JOIN (SELECT tasks.*, COUNT(tasks.name) AS task_count
FROM tasks LEFT JOIN projects ON projects.id = tasks.project_id
WHERE projects.name = 'Garage'
GROUP BY tasks.name, tasks.status
HAVING task_count > 1) b
ON a.name = b.name
AND a.status = b.status
and a.project_id = b.project_id
ORDER BY task_count ASC
```
- [x] get the list of project names having more than 10 tasks in status 'completed'. Order by project_id
```
SELECT projects.*, count(case tasks.status when 'completed' then 1 else null end) AS completed_tasks
FROM projects LEFT JOIN tasks ON projects.id = tasks.project_id
GROUP BY projects.id
HAVING completed_tasks > 10
ORDER BY projects.id ASC
```
