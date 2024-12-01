import { useCallback } from 'react';
import './deleteBtn.scss';
import { useDispatch } from 'react-redux';
import { closeEditProject } from '../../../Store/editProjectSlice';
import { openHome } from '../../../Store/homeSlice';
import { filter } from '../../../Store/filterResultsSlice';

const DeleteBtn = ({ id }) => {
  const dispatch = useDispatch();

  const handleDeleteAllTasks = useCallback((id) => {
    async function deleteTask() {
      try {
        await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE',
        });
      } catch (e) {
        console.error(e);
      }
    }
    deleteTask();
  }, []);
  const handleDeleteBtn = useCallback(() => {
    async function deleteProject() {
      try {
        await fetch(`http://localhost:3000/projects/${id}`, {
          method: 'DELETE',
        });
        const allUserTasks = await fetch(
          `http://localhost:3000/tasks?projectID=${id}`
        );
        const resultAllTasks = await allUserTasks.json();
        resultAllTasks.forEach((task) => {
          handleDeleteAllTasks(task.id);
        });
        dispatch(closeEditProject());
        dispatch(filter());
        dispatch(openHome());
      } catch (e) {
        console.error(e);
      }
    }
    deleteProject();
  }, [dispatch, id, handleDeleteAllTasks]);
  return (
    <button className="project-delete-btn" onClick={handleDeleteBtn}>
      Delete
    </button>
  );
};

export default DeleteBtn;
