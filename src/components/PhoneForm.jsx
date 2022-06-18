import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_NUMBER } from '../persons/graphql-mutations';
import { useEffect } from 'react';

export const PhoneForm = ({ notifyError }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [changeNumber, result] = useMutation(EDIT_NUMBER);

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            console.log('person not found');
            notifyError('Person not found');
        }
    }, [result]);

    const handleSubmit = (e) => {
        e.preventDefault();
        changeNumber({ variables: { name, phone } });
        setName('');
        setPhone('');
    };

    return (
        <div>
            <h2>Edit form number</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                />
                <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(evt) => setPhone(evt.target.value)}
                />
                <button type="submit">Change phone</button>
            </form>
        </div>
    );
};
