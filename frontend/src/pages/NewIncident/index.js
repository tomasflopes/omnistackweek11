import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push('/profile');
    } catch {
      alert('Error when reporting new incident');
    }
  }

  return (
    <>
      <div className="new-incident-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />

            <h1>Report Incident</h1>
            <p>Describe the case as detailed as possible to find the Hero that will help to sort it out.</p>

            <Link className="back-link" to="/profile">
              <FiArrowLeft size={16} color={"#e02041"} />
                Go Back To Home
            </Link>
          </section>

          <form onSubmit={handleNewIncident}>
            <input type="text"
              placeholder="Incident Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <input type="text"
              placeholder="Value"
              value={value}
              onChange={e => setValue(e.target.value)}
            />

            <button className="button" type="submit">Report New Incident</button>
          </form>
        </div>
      </div>
    </>
  )
}
