import './projectDetails.scss';

const ProjectDetails = ({ project }) => {
  return (
    <>
      {project.map((item) => {
        return (
          <article className="edit-project__project-details" key={item.id}>
            <h2 className="edit-project__title">{item.title}</h2>
            <p className="edit-project__description">{item.description}</p>
            <p className="edit-project__date">
              Date of creation: <strong>{item.date}</strong>
            </p>
          </article>
        );
      })}
    </>
  );
};

export default ProjectDetails;
