import { Fragment, useEffect, useState } from 'react';
import NewTask from './components/New Tasks/NewTask';
import Tasks from './components/Tasks/Tasks';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = tasksObj => {
    const loadedTasks = [];

    for(const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }
    setTasks(loadedTasks);
  };

                            // 별칭 만들기
  const { isLoading, error, sendRequest: fetchTasks } = useHttp(
      {url: 'https://tasks-ae2cf-default-rtdb.firebaseio.com/tasks.json'}, 
      transformTasks
    );

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
