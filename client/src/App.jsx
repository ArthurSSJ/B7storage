import { FiSearch } from 'react-icons/fi';
import './styles.css';
import { useState } from 'react';
import api from './services/api';
function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch() {

    // 01310930/json/
    if (input === '') {
      alert("Preencha algum Cep!")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    } catch {
      alert("Ops erro ao buscar")
      setInput("")
    }



  }








  return (
    
    <div className="container-1 ">
      
      <h1 className="title bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-600">Buscador CEP</h1>

      <div className="containerInput">
        <input 
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>



      {Object.keys(cep).length > 0 && (
        <main className='main bg-sky-600/50  '>
          <h2> CEP: {cep.cep} </h2>
          <span>{cep.logradouro} </span>
          <span>Complemento: {cep.complemento}</span>
          <span> {cep.bairro}  </span>
          <span> {cep.localidade} - {cep.uf}</span>


        </main>
      )}





    </div>
  );
}

export default App;
