/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FIND_PERSON } from '../persons/graphql-queries';

export const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = useState(null);

  const showPerson = name => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h2>Person</h2>
        <p>{person.name}</p>
        <p>{person.phone}</p>
        <p>{person.address.street}</p>
        <p>{person.address.city}</p>
        <button onClick={() => setPerson(null)}>Close</button>
      </div>
    );
  }
  if (persons === null) return null;
  
  return (
    <ul>
      <h2>Persons</h2>
      {persons.map((person) => (
        <li
          key={person.id}
          onClick={() => {
            showPerson(person.name);
          }}
        >
          {person.name} {person.phone}
        </li>
      ))}
    </ul>
  );
};