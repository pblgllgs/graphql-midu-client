import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import { Persons } from './components/Persons';

const ALL_PERSONS = gql`
  query {
    allPersons {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(ALL_PERSONS);
  console.log(data);

  if (error) return <span style="color :  red">{error}</span>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React + GraphQl!</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Persons persons={data.allPersons} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
