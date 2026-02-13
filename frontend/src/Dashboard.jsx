import { useEffect, useState } from 'react'
import API from './axios'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const fetchTasks = async () => {
    const res = await API.get('/task/tasks')
    setTasks(res.data)
  }

  const createTask = async () => {
    await API.post('/task/assign-task', { title })
    setTitle('')
    fetchTasks()
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div>
      <h2>Dashboard</h2>
      <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={createTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}
