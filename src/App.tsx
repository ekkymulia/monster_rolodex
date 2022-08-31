import './App.css';
import { useEffect, useState, ChangeEvent } from 'react';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

import { getData } from './utils/data.utils';

export type Monster = {
  id: string;
  name: string;
  email: string
}


const App = () => {

  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [searchField, setSearchField] = useState('');
  const [filteredMonsters, setFilteredMosters] = useState(monsters);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
      setMonsters(users);
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })

    setFilteredMosters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchField = event.target.value.toLocaleLowerCase();
    setSearchField(searchField);
   }

  return(
    <div className='App'>
      <h1>Monster Search</h1>

      <SearchBox className='monster-search-box' placeholder='Search Monster' onChangeHandler={onSearchChange}/>
      <CardList monsters={ filteredMonsters } />
    </div>
  )


  

}

export default App;
