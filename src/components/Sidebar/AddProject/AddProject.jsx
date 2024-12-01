import './addProject.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { closeHome } from '../../Store/homeSlice';
import { openAddProject } from '../../Store/addProjectSlice';
import { closeEditProject } from '../../Store/editProjectSlice';
const AddProject = ({ setBurgerMenuOpen }) => {
  const dispatch = useDispatch();
  const handleAddProject = useCallback(() => {
    dispatch(closeHome());
    dispatch(openAddProject());
    dispatch(closeEditProject());
    setBurgerMenuOpen(false);
  }, [dispatch, setBurgerMenuOpen]);
  return (
    <section className="add-project" onClick={handleAddProject}>
      <FontAwesomeIcon icon={faPlus} className="add-project__plus-icon" />
      Add Project
    </section>
  );
};

export default AddProject;
