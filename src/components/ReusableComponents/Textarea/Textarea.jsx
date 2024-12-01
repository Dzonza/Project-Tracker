import './textarea.scss';

const Textarea = ({ id, name, ...props }) => {
  return (
    <section className="textarea-container">
      <label htmlFor={id} className="textarea-container__label">
        {name}
      </label>
      <textarea
        rows={5}
        id={id}
        {...props}
        className="textarea-container__textarea"
      ></textarea>
    </section>
  );
};

export default Textarea;
