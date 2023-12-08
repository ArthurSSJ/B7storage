import { FiSearch } from 'react-icons/fi';
import backgroundImage from '../public/sistema.png';
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
        <>
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');`}
            </style>
            <div className="h-screen flex justify-center items-center flex-col bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="flex flex-col items-center gap-24">
                    <div className="p-3 relative flex flex-col items-center justify-center">
                        <div className="absolute bg-gradient-to-r from-indigo-950/40 via-slate-950/80 to-indigo-950/70 blur-lg  w-full h-full rounded-full "></div>
                        <h1 className="relative z-10 text-6xl font-semibold text bg-clip-text text-transparent bg-gradient-to-r drop-shadow-2xl from-sky-400 via-purple-500 to-pink-600" style={{ fontFamily: " 'Audiowide', sans-serif" }}>Buscar CEP</h1>
                    </div>


                    <div className="relative border-2 border-sky-400/20 shadow-md shadow-black/40 z-10 backdrop-filter backdrop-blur-lg p-3 flex items-center gap-2 rounded-2xl">
                        <input className='font-semibold text-white bg-transparent text-lg'
                            type="text"
                            placeholder="Digite seu cep..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button className="" onClick={handleSearch}>
                            <FiSearch size={25} color='#fff' />
                        </button>
                    </div>

                    {Object.keys(cep).length > 0 && (
                        <div className="relative group">
                            <div className="absolute inset w-full h-full bg-sky-400 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
                            </div>
                            <main className='relative z-10 bg-slate-950/90 rounded-2xl w-full p-6 flex flex-col gap-2 text-white font-semibold max-w-max'>
                                <h2> CEP: {cep.cep} </h2>
                                <span>{cep.logradouro} </span>
                                <span>Complemento: {cep.complemento}</span>
                                <span> {cep.bairro}  </span>
                                <span> {cep.localidade} - {cep.uf}</span>
                            </main>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
