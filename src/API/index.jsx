import React from 'react'
import axios from 'axios'
export const DebugData = (props) => {
  const { title, data } = props

  return (
    <div>
      <strong>{title}</strong>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const axiosInstance = axios.create({
  baseURL: 'https://mysterious-basin-40091.herokuapp.com',
})

export const projectsService = {
  load: async function getProjects() {
    try {
      const response = await axiosInstance.get('/projects.json')
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },
  create: async function createProject(params) {
    try {
      const response = await axiosInstance.post(`/projects.json`, params)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },
  update: async function updateProject(projectID, params) {
    try {
      const response = await axiosInstance.put(`/projects/${projectID}.json`, params)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },
  remove: async function removeProject(projectID) {
    try {
      const response = await axiosInstance.delete(`/projects/${projectID}.json`)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },
}

export const tasksService = {
  load: async function getTasks(projectID) {
    try {
      const response = await axiosInstance.get(`/projects/${projectID}/tasks.json`)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },
  create: async function createTask(projectID, params) {
    try {
      const response = await axiosInstance.post(
        `/projects/${projectID}/tasks.json`,
        params,
      )
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },
  update: async function updateTask(taskID, params) {
    try {
      const response = await axiosInstance.put(`/tasks/${taskID}.json`, params)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },
  remove: async function removeTask(taskID) {
    try {
      const response = await axiosInstance.delete(`/tasks/${taskID}.json`)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },
}
