import { Header } from "@/organisms/index";

type TemplateProps = {
  children?: React.ReactNode;
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
