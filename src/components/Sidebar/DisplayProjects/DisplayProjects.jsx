import { useCallback, useEffect, useMemo, useState } from 'react';
import './displayProjects.scss';
import { useDispatch, useSelector } from 'react-redux';
import { stopFilter } from '../../Store/filterResultsSlice';
import { closeAddProject } from '../../Store/addProjectSlice';
import { closeHome } from '../../Store/homeSlice';
import { openEditProject } from '../../Store/editProjectSlice';
import { startFilterTasks } from '../../Store/filterTasksSlice';
const DisplayProjects = ({ setBurgerMenuOpen }) => {
  const [allProjects, setAllProjects] = useState([]);
  const isFiltered = useSelector((state) => state.filterResults.isFiltered);
  const dispatch = useDispatch();

  const handleTitleDisplay = useMemo(() => {
    return (title) => {
      if (title.length >= 20) {
        return `${title.slice(0, 20)}...`;
      }
      return title;
    };
  }, []);
  useEffect(() => {
    async function AllProjects() {
      try {
        const response = await fetch('http://localhost:3000/projects');
        const result = await response.json();
        if (result.length === 0) {
          setAllProjects([]);
          dispatch(stopFilter());
          return;
        }
        setAllProjects(result);
        dispatch(stopFilter());
      } catch (e) {
        console.error(e);
      }
    }
    if (isFiltered) {
      AllProjects();
    }
  }, [isFiltered, dispatch]);

  const handleProjectClick = useCallback(
    (e, id) => {
      dispatch(openEditProject(id));
      dispatch(closeAddProject());
      dispatch(closeHome());
      dispatch(startFilterTasks());
      setBurgerMenuOpen(false);
      const selectedProject = e.target;
      const parentEl = e.target
        .closest('.display-projects')
        .querySelectorAll('.display-projects__project');
      parentEl.forEach((project) => {
        if (project !== selectedProject)
          project.classList.remove('selected-project');
      });
      selectedProject.classList.add('selected-project');
    },
    [dispatch, setBurgerMenuOpen]
  );
  return (
    <section className="display-projects">
      {allProjects.length > 0
        ? allProjects.map((project) => {
            return (
              <p
                key={project.id}
                className="display-projects__project"
                onClick={(e) => handleProjectClick(e, project.id)}
              >
                {handleTitleDisplay(project.title)}
              </p>
            );
          })
        : ''}
    </section>
  );
};

export default DisplayProjects;
