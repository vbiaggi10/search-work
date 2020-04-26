export const sortData = (arr : Array<Object>, direction : boolean, property : string) => (
  arr.sort((a: any, b: any) => {
    let temp = null;
    if (direction) temp = (+new Date(b[property]) - +new Date(a[property]));
    else temp = (+new Date(a[property]) - +new Date(b[property]));
    return temp;
  })
);

export const filterDataOneProperty = (arr : Array<Object>, filter : string, property : string) => {
  return arr.filter((res: any) => (res[property].toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1));
};

export const filterDataTwoProperty = (arr : Array<Object>, filter : string, property1 : string, property2 : string) => {
  return arr.filter((res: any) => (res[property1][property2].toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1));
};

export const filterDataThreeProperty = (arr : Array<Object>, filter : string, property1 : string, property2 : number, property3 : string) => {
  return arr.filter((res: any) => (res[property1].length !== 0 && res[property1][property2][property3].toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1));
};
