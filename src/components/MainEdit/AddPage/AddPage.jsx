import Inputs from '../../ReusableComponents/Inputs/Inputs';
import './addPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import notepad from '/src/assets/notepad.png';
import Textarea from '../../ReusableComponents/Textarea/Textarea';
import { useCallback, useState } from 'react';
import ErrorMessage from '../../ReusableComponents/ErrorMessage/ErrorMessage';
import { useDispatch } from 'react-redux';
import { openHome } from '../../Store/homeSlice';
import { closeAddProject } from '../../Store/addProjectSlice';
import { filter } from '../../Store/filterResultsSlice';
const AddPage = () => {
  const [inputs, setInputs] = useState({
    title: '',
    date: '',
    description: '',
  });
  const [errorTitle, setErrorTitle] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const dispatch = useDispatch();
  const handleChangeInput = useCallback((e, inputType) => {
    const inputValue = e.target.value;
    setInputs((prevValue) => {
      return {
        ...prevValue,
        [inputType]: inputValue,
      };
    });
  }, []);
  const handleErrorTitle = useCallback(() => {
    if (!inputs.title) {
      setErrorTitle('Please fill the title field.');
      return;
    }
    setErrorTitle('');
  }, [inputs.title]);

  const handleErrorDate = useCallback(() => {
    if (!inputs.date) {
      setErrorDate('Please fill the date field.');
      return;
    }
    setErrorDate('');
  }, [inputs.date]);

  const handleErrorDescription = useCallback(() => {
    if (!inputs.description) {
      setErrorDescription('Please fill the description field.');
      return;
    }
    setErrorDescription('');
  }, [inputs.description]);

  const handleAddButton = useCallback(() => {
    if (!(inputs.title && inputs.date && inputs.description)) return;
    async function addProject() {
      try {
        await fetch('http://localhost:3000/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: inputs.title,
            date: inputs.date,
            description: inputs.description,
          }),
        });
        dispatch(openHome());
        dispatch(closeAddProject());
        dispatch(filter());
      } catch (e) {
        console.error(e);
      }
    }
    addProject();
  }, [inputs, dispatch]);

  const handleExitBtn = useCallback(() => {
    dispatch(openHome());
    dispatch(closeAddProject());
  }, [dispatch]);
  return (
    <section className="add-page">
      <img src={notepad} alt="notepad image" className="add-page__img" />
      <Inputs
        type="text"
        id="title"
        placeholder="Enter a title"
        name="Title"
        onChange={(e) => handleChangeInput(e, 'title')}
        value={inputs.title}
        onBlur={handleErrorTitle}
        inputStyle="inputs-container"
      />
      {errorTitle ? (
        <ErrorMessage message={errorTitle} messageStyle="add-inputs" />
      ) : (
        ''
      )}
      <Inputs
        type="date"
        id="date"
        placeholder="Enter a date"
        name="Date"
        onChange={(e) => handleChangeInput(e, 'date')}
        value={inputs.date}
        onBlur={handleErrorDate}
        inputStyle="inputs-container"
      />
      {errorDate ? (
        <ErrorMessage message={errorDate} messageStyle="add-inputs" />
      ) : (
        ''
      )}
      <Textarea
        placeholder="Enter a description"
        name="Description"
        id="description"
        onChange={(e) => handleChangeInput(e, 'description')}
        value={inputs.description}
        onBlur={handleErrorDescription}
      />
      {errorDescription ? (
        <ErrorMessage message={errorDescription} messageStyle="add-inputs" />
      ) : (
        ''
      )}
      <FontAwesomeIcon
        icon={faPlus}
        className="add-page__add-btn"
        onClick={handleAddButton}
      />
      <FontAwesomeIcon
        icon={faXmark}
        className="add-page__exit-btn"
        onClick={handleExitBtn}
      />
    </section>
  );
};

export default AddPage;
