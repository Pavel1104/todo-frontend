This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


# Task manager

## Software Requirements
* ruby '2.5.3'
* rails '6.0.2'
* Node.js
* Yarn

## For run app follow this instructions

### Installation
```bash
git clone https://github.com/Pavel1104/rubyGarage.git
cd rubyGarage
bundle install
rake db:create
rake db:migrate
rake db:seed
yarn install
```

 ### Start the App
 Excute the following command:
```bash
rails s
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
