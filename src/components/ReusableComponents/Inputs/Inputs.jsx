import './inputs.scss';

const Inputs = ({ inputStyle, name, id, ...props }) => {
  return (
    <>
      <section className={inputStyle}>
        <label htmlFor={id} className={`${inputStyle}__label`}>
          {name}
        </label>
        <input
          name={name}
          id={id}
          {...props}
          className={`${inputStyle}__input`}
          required
        />
      </section>
    </>
  );
};

export default Inputs;
