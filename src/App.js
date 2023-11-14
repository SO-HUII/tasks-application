import './App.css';
import { Fragment, useEffect, useState } from 'react';
import NewTask from './components/New Tasks/NewTask';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (taskText) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://tasks-ae2cf-default-rtdb.firebaseio.com/'
      );

      if(!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const loadedTasks = [];

      for(const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((preTasks) => preTasks.concat(task));
  }

  return (
    <Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks 
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </Fragment>
  );
}

export default App;
