type ErrorProps = {
  variant?: string;
  errorMessage: string;
};

const Error: React.FC<ErrorProps> = ({ variant = "text", errorMessage }) => {
  return (
    <>
      <p className={`text_warning`} data-variant={variant}>
        {errorMessage}
      </p>
    </>
  );
};

export default Error;
