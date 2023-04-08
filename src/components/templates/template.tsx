import { Header } from "../organisms/Header/Header";

type TemplateProps = {
  children?: React.ReactNode | React.ReactNodeArray;
};

const Template = ({ children }: TemplateProps) => {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
};

export default Template;
