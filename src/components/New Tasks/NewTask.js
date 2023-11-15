import React, { useState } from 'react';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const enterTaskHandler = async (taskText) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                'https://tasks-ae2cf-default-rtdb.firebaseio.com/tasks.json',
                {
                    method: 'POST',
                    body: JSON.stringify({ text: taskText }),
                    headers: {
                        'Context-Type': 'application/json',
                    },
                }
            );
            
            if(!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            const generatedId = data.name;
            const createdTask = { id: generatedId, text: taskText };

            props.onAddTask(createdTask);
        } catch(err) {
            setError(err.message || 'Something went wrong');
        }
        setIsLoading(false);
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;