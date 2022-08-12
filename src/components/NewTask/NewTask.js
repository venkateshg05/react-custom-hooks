import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, httpRequestHandler } = useHttp();

  const transformData = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = (taskText) => {
    httpRequestHandler(
      "https://react-http-f2c6c-default-rtdb.firebaseio.com/tasks.json",
      {
        method: "POST",
        body: JSON.stringify({ text: taskText }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
