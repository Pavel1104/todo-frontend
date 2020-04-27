import React, { useEffect, useState, Fragment } from 'react'
import { projectsService } from '../../API/index'
import { useApp } from '../App'
import Tasks from '../Tasks'
import classes from './index.module.scss'

const Projects = () => {
  const { projects, setProjects } = useApp()
  const [editableIDs, setEditable] = useState([])
  const [showForm, setShowForm] = useState(false)
  const initialValues = {
    name:'',
  }
  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    const loadProjects = async () => {
      const projects = await projectsService.load()
      setProjects(projects)
    }

    loadProjects()
  }, [])

  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const onAddProject = async (e) => {
    e.preventDefault()
    const result = await projectsService.create(values)
    setProjects((prev) => [...prev, result])
    setValues(initialValues)
    setShowForm(false)
  }

  const onSubmit = (e, id) => {
    e.preventDefault()
    setEditable((prev) => prev.filter((v) => v !== id))
    projectsService.update(
      id,
      projects.find((v) => v.id === id),
    )
  }

  const onEdit = (id) => {
    setEditable((prev) => [...prev, id])
  }

  const onEditValue = (id, name, value) => {
    setProjects((prev) => {
      prev.find((v) => v.id === id)[name] = value
      return [...prev]
    })
  }

  const removeProject = (id) => {
    projectsService.remove(id)
    setProjects((prev) => prev.filter((v) => v.id !== id))
  }


  return (
    <>
      {projects.map((item) => {
        const { id, name } = item
        const editable = editableIDs.indexOf(id) !== -1
        return (
          <Fragment key={id}>
            <div key={id} className={classes.container}>
              <form
                className={classes.project}
                onSubmit={(e) => onSubmit(e, id)}
              >
                <div className={classes.logo} />
                <input
                  className={classes.title}
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => onEditValue(id, 'name', e.target.value)}
                  required={true}
                  placeholder="Project name"
                  readOnly={!editable}
                />
                <div className={classes.buttonsCont}>
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
                    onClick={(e) => removeProject(id)}
                  >
                    Delete
                  </button>
                </div>
              </form>
              <Tasks projectID={id} />
            </div>
          </Fragment>
        )
      })}

      <div className={classes.container}>
        <form
          className={[
            classes.project,
            showForm ? classes.visible : classes.hidden,
          ].join(' ')}
          onSubmit={(e) => onAddProject(e)}
        >
          <div className={classes.logo} />
          <input
            className={classes.title}
            type="text"
            name="name"
            value={values.name}
            onChange={(e) => setFieldValue('name', e.target.value)}
            required={true}
            placeholder="Project name"
          />
          <div className={classes.buttonsCont}>
            <button className={classes.submit} type="submit">
              Submit
            </button>
            <button
              className={classes.cancel}
              type="cancel"
              onClick={() => {
                setValues(initialValues)
                setShowForm(false)
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        <button
          className={[
            classes.addButton,
            !showForm ? classes.visible : classes.hidden,
          ].join(' ')}
          type="button"
          onClick={() => setShowForm(true)}
        >
          Add TODO List
        </button>
      </div>
    </>
  )
}

export default Projects
