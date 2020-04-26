export const sortData = (arr: Array<Object>, direction: string, property: string) => {
  return arr.sort((a: any, b: any) => {
    const auxSort1 = new Date(a[property]).getTime();
    const auxSort2 = new Date(b[property]).getTime();
    const newDirection = direction === 'desc' ? -1 : 1;
    if (auxSort1 > auxSort2) {
      return 1 * newDirection;
    } else if (auxSort1 < auxSort2) {
      return -1 * newDirection;
    } else {
      return 0;
    }
  });
};

export const filterDataOneProperty = (arr: Array<Object>, filter: string, property: string) => {
  if (filter)
    return arr.filter((res: any) => res[property].toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1);
  else return arr;
};

export const filterDataTwoProperty = (arr: Array<Object>, filter: string, property1: string, property2: string) => {
  if (filter)
    return arr.filter(
      (res: any) => res[property1][property2].toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1,
    );
  else return arr;
};

export const filterDataThreeProperty = (
  arr: Array<Object>,
  filter: string,
  property1: string,
  property2: number,
  property3: string,
) => {
  if (filter)
    return arr.filter(
      (res: any) =>
        res[property1].length !== 0 &&
        res[property1][property2][property3].toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1,
    );
  else return arr;
};

export const processData = (options: any) => {
  const { jobs, sort, search, filterByCountry, filterByCompany } = options;
  const filteredByCountry = filterDataThreeProperty(jobs, filterByCountry, 'countries', 0, 'id');
  const filteredByCompany = filterDataTwoProperty(filteredByCountry, filterByCompany, 'company', 'id');
  const searched = filterDataOneProperty(filteredByCompany, search, 'title');
  const sorted = sortData(searched, sort, 'postedAt');
  return sorted;
};
