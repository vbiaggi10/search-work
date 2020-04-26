import React, { ChangeEvent, useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import List from './List';
import { api } from '../services/api';
import { processData } from '../data/data';
import Select from './Select';

interface Options {
  jobs?: Array<Object>;
  sort?: string;
  filterByCountry?: string;
  filterByCompany?: string;
  search?: string;
}

const obj = {
  jobs: [],
  sort: 'desc',
  filterByCountry: '',
  filterByCompany: '',
  search: '',
};

interface Props { }

const Body: React.FC<Props> = ({ }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [countries, setCountries] = useState<any>([]);
  const [companies, setCompanies] = useState<any>([]);
  const [worksList, setWorksList] = useState<any>([]);
  const [options, setOptions] = useState<Options>(obj);

  const getCountries = async () => {
    const response = await api('countries');
    setCountries(response.data.countries);
  };

  const getCompanies = async () => {
    const response = await api('companies');
    setCompanies(response.data.companies);
  };

  const getJobs = async () => {
    const response = await api('jobs');
    setOptions({ ...options, jobs: response.data.jobs });
    setWorksList(response.data.jobs);
  };

  const setNewOptions = (newOptions: Options) => {
    setOptions(newOptions);
    const newArr = processData(newOptions);
    setWorksList(newArr);
  };

  const handleSort = () => {
    const newOptions = { ...options, sort: options.sort === 'desc' ? 'asc' : 'desc' };
    setNewOptions(newOptions);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    const newOptions = { ...options, search: value };
    setNewOptions(newOptions);
  };

  const handleChangeCountries = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const newOptions = { ...options, filterByCountry: value };
    setNewOptions(newOptions);
  };

  const handleChangeCompanies = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const newOptions = { ...options, filterByCompany: value };
    setNewOptions(newOptions);
  };

  useEffect(() => {
    getCountries();
    getCompanies();
    getJobs();
  }, []);

  return (
    <div className="body">
      <SearchBar value={searchText} handleChange={handleChange} />
      <div className="filters-container">
        <p>Filtrar por: </p>
        <div className="filters">
          <Select title="Pais" arr={countries} handleChange={handleChangeCountries} />
          <Select title="Compania" arr={companies} handleChange={handleChangeCompanies} />
        </div>
      </div>

      <div>
        <p>Ordenar por:</p>
        <div className="sort-container">
          <label htmlFor="">Fecha</label>
          <a href="#" onClick={handleSort}><i className={`fas  fa-${options.sort !== 'desc' ? 'sort-down' : 'sort-up'} sort-icon`} /></a>
        </div>
        
      </div>
      <List data={worksList} />
    </div>
  );
};

export default Body;
