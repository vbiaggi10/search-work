import React from 'react';

interface Props {
  handleChange: any;
  arr: Array<Object>;
  title: string;
}

const Select: React.FC<Props> = ({ handleChange, arr, title }) => {
  return (
    <div className="filter-container">
      <label htmlFor="">{title}</label>
      <select name="" id="" onChange={handleChange}>
      <option value="">Todos</option>
      {arr.length !== 0 &&
        arr.map((res: any, index: number) => (
          <option key={index} value={res.id}>
            {res.name}
          </option>
        ))}
    </select>
    </div>
    
  );
};

export default Select;
