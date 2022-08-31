import './App.css';
import { Component } from 'react';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
  };

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => 
      this.setState(() => { 
        return { monsters: users } 
      })
    ) 
  }

  onSearchChange = (event) => {
     const searchField = event.target.value.toLocaleLowerCase();
     this.setState(() => {
       return {searchField};
     })
  }
  
  render(){
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })

    return (
      <div className='App'>
        <h1>Monster Search</h1>

        <SearchBox className='monster-search-box' placeholder='Search Monster' onChangeHandler={onSearchChange}/>
        <CardList monsters={ filteredMonsters } />
      </div>
    )

  }

}

export default App;
