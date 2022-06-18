import logo from './logo.svg';
import './App.css';
import { Persons } from './components/Persons';
import { PersonForm } from './components/PersonForm';
import { UsePersons } from './persons/custom-hooks';
import React, { useState } from 'react';
import { Notify } from './components/Notify';
import { PhoneForm } from './components/PhoneForm';

function App() {
    const { data, loading, error } = UsePersons();

    const [errorMessage, setErrorMessage] = useState(null);

    if (error) return <span style={{ color: 'red' }}>{error}</span>;

    const notifyError = (message) => {
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(null), 5000);
    };

    return (
        <div className="App">
            <Notify errorMessage={errorMessage} />
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
                <PhoneForm notifyError={notifyError} />
                <PersonForm notifyError={notifyError} />
            </header>
        </div>
    );
}

export default App;
