import React, { useState } from "react";
import { HTMLAttributes } from "react";

type Props = {
  array: (string | number)[];
  tag: string;
  limit?: number;
} & HTMLAttributes<HTMLElement> &
  React.PropsWithChildren<any>;

const ListArray: React.FC<Props> = ({
  array,
  tag,
  limit = array.length,
  ...rest
}) => {
  const [showMore, setShowMore] = useState(false);
  const Tag = tag;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <React.Fragment>
      {array.slice(0, limit).map((item: string | number, index: number) => (
        <Tag key={index} {...rest}>
          {item}
        </Tag>
      ))}
      {array.length > limit && (
        <button onClick={toggleShowMore}>{showMore ? "Moins" : "Plus"}</button>
      )}
      {showMore &&
        array.slice(limit).map((item: string | number, index: number) => (
          <Tag key={index + limit} {...rest}>
            {item}
          </Tag>
        ))}
    </React.Fragment>
  );
};

export default ListArray;
