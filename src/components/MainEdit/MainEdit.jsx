import { useSelector } from 'react-redux';
import AddPage from './AddPage/AddPage';
import Home from './HomePage/HomePage';
import './mainEdit.scss';
import EditProject from './EditProject/EditProject';

const MainEdit = () => {
  const home = useSelector((state) => state.home.isOpenHome);
  const addProject = useSelector((state) => state.addProject.isOpenAddProject);
  const editProject = useSelector(
    (state) => state.editProject.isOpenEditProject
  );
  return (
    <section className="mainEdit-container">
      {home && <Home />}
      {addProject && <AddPage />}
      {editProject && <EditProject />}
    </section>
  );
};

export default MainEdit;
