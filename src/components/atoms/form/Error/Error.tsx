type ErrorProps = {
  variant?: string;
  errorMessage?: string;
};

const Error: React.FC<ErrorProps> = ({ variant = "text", errorMessage }) => {
  return (
    <>
      <p
        className={`text_warning`}
        data-variant={variant}
        style={{ minHeight: "2rem" }}
      >
        {errorMessage}
      </p>
    </>
  );
};

export default Error;
