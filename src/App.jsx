import { useState } from 'react';
import { api } from './services/api';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

export function App() {
  const [inputCep, setinputCep] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //01001000/json/
    if (inputCep === '') {
      alert('Insira um CEP válido');
      return;
    }

    try {
      const response = await api.get(`${inputCep}/json`);
      setCep(response.data);
      setinputCep('');
    } catch {
      alert('Erro ao encontrar o CEP');
      setinputCep('');
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1>
      <div className="container-input">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={inputCep}
          onChange={(event) => setinputCep(event.target.value)}
        />
        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            Estado/UF: {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}
