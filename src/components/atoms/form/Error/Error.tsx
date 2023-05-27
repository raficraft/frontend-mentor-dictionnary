type ErrorProps = {
  errorMessage?: string;
};

const Error: React.FC<ErrorProps> = ({ errorMessage }) => {
  return (
    <>
      <p className={`text_warning`}>{errorMessage}</p>
    </>
  );
};

export default Error;
