type ErrorProps = {
  variant?: string;
  message: string;
};

const Error: React.FC<ErrorProps> = ({ variant = "text", message }) => {
  return (
    <>
      <p className={`text_warning`} data-variant={variant}>
        {message}
      </p>
    </>
  );
};

export default Error;
