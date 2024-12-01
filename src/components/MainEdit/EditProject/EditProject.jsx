import { useDispatch, useSelector } from 'react-redux';
import './editProject.scss';
import { useCallback, useEffect, useState } from 'react';
import ProjectDetails from './ProjectDetails/ProjectDetails';
import DeleteBtn from './DeleteBtn/DeleteBtn';
import Inputs from '../../ReusableComponents/Inputs/Inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../ReusableComponents/ErrorMessage/ErrorMessage';
import FilterTasks from './FilterTasks/FilterTasks';
import {
  startFilterTasks,
  stopFilterTasks,
} from '../../Store/filterTasksSlice';
const EditProject = () => {
  const editProjectID = useSelector(
    (state) => state.editProject.isOpenEditProject
  );

  const toFilter = useSelector((state) => state.filterTasks.toFilter);
  const [project, setProject] = useState([]);
  const [task, setTask] = useState('');
  const [errorTaskMessage, setErrorTaskMessage] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const disptach = useDispatch();
  useEffect(() => {
    async function getProject() {
      try {
        const response = await fetch(
          `http://localhost:3000/projects?id=${editProjectID}`
        );
        const result = await response.json();
        setProject(result);
      } catch (e) {
        console.error(e);
      }
    }
    if (editProjectID) {
      getProject();
    }
  }, [editProjectID]);

  useEffect(() => {
    async function getAllTasks() {
      try {
        const response = await fetch(
          `http://localhost:3000/tasks?projectID=${editProjectID}`
        );
        const result = await response.json();
        console.log(result);

        if (result.length === 0) {
          setAllTasks([]);
          disptach(stopFilterTasks());
          return;
        }
        setAllTasks(result);
        disptach(stopFilterTasks());
      } catch (e) {
        console.error(e);
      }
    }
    if (toFilter) getAllTasks();
  }, [editProjectID, toFilter, disptach]);

  const handleInputTask = useCallback((e) => {
    setTask(e.target.value);
  }, []);

  const handleSendBtn = useCallback(() => {
    if (!task) {
      setErrorTaskMessage('Please fill the task field.');
      return;
    }
    async function createTask() {
      try {
        await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectID: project[0].id,
            taskComment: task,
          }),
        });
        disptach(startFilterTasks());
        setErrorTaskMessage('');
        setTask('');
      } catch (e) {
        console.error(e);
      }
    }
    createTask();
  }, [task, project, disptach]);
  return (
    <section className="edit-project">
      <DeleteBtn id={editProjectID} />
      <ProjectDetails project={project} />
      <div className="edit-project__input-container">
        <Inputs
          name="Task"
          placeholder="Enter your task"
          id="task"
          onChange={handleInputTask}
          value={task}
          inputStyle="inputs-container"
        />

        <FontAwesomeIcon
          icon={faCircleArrowRight}
          className={`edit-project__send-btn ${task && 'green-color'}`}
          onClick={handleSendBtn}
        />
      </div>

      {errorTaskMessage && (
        <ErrorMessage
          message={errorTaskMessage}
          messageStyle="error-task-message"
        />
      )}
      <FilterTasks allTasks={allTasks} />
    </section>
  );
};

export default EditProject;
