import './errorMessage.scss';

const ErrorMessage = ({ message, messageStyle }) => {
  return <p className={messageStyle}>{message}</p>;
};

export default ErrorMessage;
