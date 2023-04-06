type SelectType = {
  arrow?: SVGElement;
  options: Array<
    {
      onChange?: () => void;
    } & React.OptionHTMLAttributes<HTMLOptionElement>
  >;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const DropList: React.FC<SelectType> = (
  { arrow, children, options },
  props
) => {
  console.log(props);
  console.log(options);

  const handleClick = (value: string) => {};
  return (
    <div>
      <span {...props}>{options[0].label}</span>
      {options.map((option, key) => {
        console.log(option);
        return (
          <ul key={key}>
            <li
              value={option.value}
              onClick={() => options.onChange && options.onChange()}
            >
              {option.label}
            </li>
          </ul>
        );
      })}
    </div>
  );
};
