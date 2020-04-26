import React from 'react';

interface Props {
  data: any;
}

const List: React.FC<Props> = ({ data }) => {


  const getFormatDate = (value: Date) => {
    const date = new Date(value);

    const day = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const hour = date.getHours() + ':' + ((date.getMinutes() + '').length === 1 ? '0' : '') + date.getMinutes()

    return day + ' ' + hour;
  }

  return (
    <div>
      {data.map((res: any, index: number) => {
        return (
          <div key={index} className="col-5 list-container">
            <header>
              <p className="list-date">{getFormatDate(res.postedAt)}</p>
              <p className="list-title">{res.title}</p>
            </header>
            <section>
              {res.countries.length !== 0 && <p><span>Country:  </span>{res.countries[0].name}</p>}
              <p><span>Company:  </span>{res.company.name}</p>
              <div className="list-btn-container">
                <a href={`mailto:${res.userEmail}`} target="_blank">Send request</a>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default List;
