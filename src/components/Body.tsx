import React, { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import List from './List';
import { api } from '../services/api';
import { sortData, filterDataOneProperty, filterDataTwoProperty, filterDataThreeProperty } from '../data/data';

// const options = {
//   cohort: null,
//   cohortData: {
//     users: null,
//     progress: null,
//   },
//   orderBy: "sort-by",
//   orderDirection: "ASC",
//   search: " "
// };

interface Props {
}

const Body: React.FC<Props> = ({ }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [countries, setCountries] = useState<any>([]);
  const [companies, setCompanies] = useState<any>([]);
  const [worksList, setWorksList] = useState<any>([]);
  const [filteredWorksList, setFilteredWorksList] = useState<any>([]);
  const [direction, setDirection] = useState<boolean>(false);

  useEffect(() => {
    getCountries();
    getCompanies();
    getJobs();
  }, [])

  const getCountries = async () => {
    const response = await api("countries");
    setCountries(response.data.countries);
  };

  const getCompanies = async () => {
    const response = await api("companies");
    setCompanies(response.data.companies);
  };

  const getJobs = async () => {
    const response = await api("jobs");
    setWorksList(response.data.jobs);
    setFilteredWorksList(response.data.jobs);
  };

  const handleSort = () => {
    const newList = sortData(filteredWorksList, direction, 'postedAt')
    setDirection(!direction)
    setFilteredWorksList(newList)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    const newList = filterDataOneProperty(filteredWorksList, value, 'title')
    setFilteredWorksList(newList);
  };

  const handleChangeCountries = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let newList = [];
    if (value === "all") newList = worksList;
    else newList = filterDataThreeProperty(filteredWorksList, value, 'countries', 0, 'id');
    setFilteredWorksList(newList);
  };

  const handleChangeCompanies = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let newList = [];
    if (value === "all") newList = worksList;
    else newList = filterDataTwoProperty(filteredWorksList, value, 'company', 'id');
    setFilteredWorksList(newList);
  };

  return (
    <>
      <SearchBar value={searchText} handleChange={handleChange} />
      <select name="" id="" onChange={handleChangeCountries}>
        <option value="all">Todos</option>
        {
          countries.length !== 0 && countries.map((res: any, index: number) => (
            <option key={index} value={res.id}>{res.name}</option>
          ))
        }
      </select>
      <select name="" id="" onChange={handleChangeCompanies}>
        <option value="all">Todos</option>
        {
          companies.length !== 0 && companies.map((res: any, index: number) => (
            <option key={index} value={res.id}>{res.name}</option>
          ))
        }
      </select>
      <div>
        Ordenas por fecha <button onClick={handleSort}>{direction ? "Descendente" : "Ascendete"}</button>
      </div>
      <List data={filteredWorksList} />
    </>
  );
};

export default Body;
