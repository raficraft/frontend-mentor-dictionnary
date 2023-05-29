type ErrorProps = {
  errorMessage?: string;
};

const FieldError: React.FC<ErrorProps> = ({ errorMessage }) => {
  return (
    <>
      <p className={`text_warning`}>{errorMessage}</p>
    </>
  );
};

export default FieldError;
