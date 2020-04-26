import React from 'react';

interface Props {
  data: any
}

const List: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {
        data.map((res: any, index: number) => {
          return (<div key={index} className="list-container">
            <p>{res.title}</p>
            <p>{res.company.name}</p>
            {res.countries.length !== 0 && <p>{res.countries[0].name}</p>}
            <p>{res.postedAt}</p>
          </div>)
        })
      }
    </div>
  );
};

export default List;
