import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './filterTasks.scss';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startFilterTasks } from '../../../Store/filterTasksSlice';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Inputs from '../../../ReusableComponents/Inputs/Inputs';
const FilterTasks = ({ allTasks }) => {
  const [isEditing, setIsEditing] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const dispatch = useDispatch();

  const handleDeleteTask = useCallback(
    (id) => {
      async function deleteTask() {
        try {
          await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
          });
          dispatch(startFilterTasks());
        } catch (e) {
          console.error(e);
        }
      }
      deleteTask();
    },
    [dispatch]
  );

  const handleEditBtn = useCallback((id) => {
    setIsEditing(id);
  }, []);

  const handleEditInputChange = useCallback((e) => {
    setEditInputValue(e.target.value);
  }, []);
  const handleCheckBtn = useCallback(
    (id) => {
      async function editTask() {
        try {
          await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              taskComment: editInputValue,
            }),
          });
          setIsEditing('');
          setEditInputValue('');
          dispatch(startFilterTasks());
        } catch (e) {
          console.error(e);
        }
      }
      if (editInputValue) {
        editTask();
      }
    },
    [editInputValue, dispatch]
  );
  return (
    <section className="tasks-container">
      {allTasks.length > 0 ? (
        allTasks.map((task) => (
          <article key={task.id} className="tasks-container__task">
            {!(isEditing == task.id) ? (
              <p className="tasks-container__text">{task.taskComment}</p>
            ) : (
              <Inputs
                defaultValue={task.taskComment}
                inputStyle="edit-input"
                placeholder="Change this task"
                onChange={handleEditInputChange}
              />
            )}
            <div className="tasks-container__actions">
              {!(isEditing == task.id) ? (
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="tasks-container__edit-icon"
                  onClick={() => handleEditBtn(task.id)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="tasks-container__check-icon"
                  onClick={() => handleCheckBtn(task.id)}
                />
              )}

              <FontAwesomeIcon
                icon={faTrashCan}
                className="tasks-container__delete-icon"
                onClick={() => handleDeleteTask(task.id)}
              />
            </div>
          </article>
        ))
      ) : (
        <p className="tasks-container__cover-text">
          No tasks yet, start adding your tasks!
        </p>
      )}
    </section>
  );
};

export default FilterTasks;
