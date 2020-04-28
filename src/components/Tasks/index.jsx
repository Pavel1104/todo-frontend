import React, { useEffect, useState } from 'react'
import { tasksService, projectsService } from '../../API/index'
import classes from './index.module.scss'
import { ReactSortable } from 'react-sortablejs'

const Tasks = (projectData) => {
  const [editableIDs, setEditable] = useState([])

  const { projectID, tasksOrder } = projectData
  const [tasks, setTasks] = useState([])
  const initialValues = {
    name: '',
    isDone: false,
    priority: 0,
    deadline: new Date(),
  }
  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await tasksService.load(projectID)

      const orderPattern = [].concat(
        tasksOrder ? tasksOrder.split(',').map((e) => parseInt(e)) : [],
        tasks.map((e) => {
          return e.id
        }),
      )

      setTasks(
        tasks.sort((a, b) => {
          return orderPattern.indexOf(a.id) - orderPattern.indexOf(b.id)
        }),
      )
    }
    loadTasks()
  }, [])

  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const onAddTask = async (e) => {
    e.preventDefault()
    const result = await tasksService.create(projectID, {
      project_id: projectID,
      ...values,
    })
    setTasks((prev) => [...prev, result])
    setValues(initialValues)
  }

  const onSubmit = (e, id) => {
    e.preventDefault()
    setEditable((prev) => prev.filter((v) => v !== id))
    tasksService.update(
      id,
      tasks.find((v) => v.id === id),
    )
  }

  const onIsDoneChange = (id, state) => {
    setTasks((prev) => {
      prev.find((v) => v.id === id).isDone = state
      tasksService.update(
        id,
        prev.find((v) => v.id === id),
      )
      return [...prev]
    })
  }

  const changePriority = (id, tasksOrder) => {
    projectsService.update(id, { project: { tasksOrder } })
  }

  const onEdit = (id) => {
    setEditable((prev) => [...prev, id])
  }

  const onEditValue = (id, name, value) => {
    setTasks((prev) => {
      prev.find((v) => v.id === id)[name] = value
      return [...prev]
    })
  }

  const removeTask = (id) => {
    tasksService.remove(id)
    setTasks((prev) => prev.filter((v) => v.id !== id))
  }

  return (
    <>
      <form className={classes.taskForm} onSubmit={(e) => onAddTask(e)}>
        <div className={classes.add} />
        <input
          className={classes.title}
          type="text"
          name="name"
          value={values.name}
          onChange={(e) => setFieldValue('name', e.target.value)}
          required={true}
          placeholder="Task name"
        />
        <div className={classes.buttonsCont}>
          <button className={classes.addTask} type="submit">
            Add Task
          </button>
        </div>
      </form>
      <ReactSortable
        list={tasks}
        setList={setTasks}
        animation={400}
        dataIdAttr="sort-id"
        emptyInsertThreshold={5000}
        easing="cubic-bezier(1, 0, 0, 1)"
        ghostClass={classes.sortableGhost} // Class name for the drop placeholder
        handle={'.' + classes.priority}
        store={{
          set: (sortable) => {
            changePriority(projectID, sortable.toArray().join(','))
          },
        }}
      >
        {tasks.map((item) => {
          const { id, name, isDone, deadline } = item
          const editable = editableIDs.indexOf(id) !== -1
          return (
            <form
              key={id}
              sort-id={item.id}
              className={classes.task}
              onSubmit={(e) => onSubmit(e, id)}
            >
              <input
                type="checkbox"
                name="isDone"
                checked={isDone}
                onChange={(e) => onIsDoneChange(id, e.target.checked)}
              />
              <input
                className={classes.name}
                type="text"
                name="name"
                value={name}
                onChange={(e) => onEditValue(id, 'name', e.target.value)}
                required={true}
                placeholder="Project name"
                readOnly={!editable}
              />
              <input
                className={classes.deadline}
                type="date"
                name="deadline"
                value={deadline}
                onChange={(e) => onEditValue(id, 'deadline', e.target.value)}
                placeholder="Deadline"
                readOnly={!editable}
              />
              <div className={classes.buttonsCont}>
                <div className={classes.priority} />
                <button
                  className={[
                    classes.submit,
                    editable ? classes.visible : classes.hidden,
                  ].join(' ')}
                  type="submit"
                  disabled={!editable}
                >
                  Submit
                </button>

                <button
                  className={[
                    classes.edit,
                    !editable ? classes.visible : classes.hidden,
                  ].join(' ')}
                  type="button"
                  onClick={() => onEdit(id)}
                  disabled={editable}
                >
                  Edit
                </button>

                <button
                  className={classes.delete}
                  type="button"
                  onClick={(e) => removeTask(id)}
                >
                  Delete
                </button>
              </div>
            </form>
          )
        })}
      </ReactSortable>
    </>
  )
}

export default Tasks
