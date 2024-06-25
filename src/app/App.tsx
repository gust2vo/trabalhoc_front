import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../home/Home';
import Cadastro from '../cadastrar/Cadastro';
import Deletar from '../deletar/Deletar';
import Atualizar from '../atualizar/Atualizar';
import AtualizarPatch from '../atualizar/AtualizarPatch';
import Listar from '../listar/Listar';
import ListarNome from '../listar/ListarNome';
import ListarQtd from '../listar/ListarQtd';
import VisitCounter from '../VisitCounter'; // Importe o componente VisitCounter
import './App.css';

const App = () => {
  const [visitCount, setVisitCount] = useState<number>(0);

  const incrementVisit = () => {
    setVisitCount(prevCount => prevCount + 1);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" onClick={incrementVisit}><button>Home</button></Link>
          <Link to="/cadastro"><button>Cadastro</button></Link>
          <Link to="/atualizar"><button>Atualizar</button></Link>
          <Link to="/deletar"><button>Deletar</button></Link>
          <Link to="/listar"><button>Listar</button></Link>
          <Link to="/listarNome"><button>Procurar Nome</button></Link>
          <Link to="/listarQtd"><button>Procurar Quantidade</button></Link>
          <Link to="/AtualizarPatch"><button>Atualizar Nome</button></Link>
        </nav>
        <VisitCounter visitCount={visitCount} /> {/* Renderize o componente VisitCounter aqui */}
        <Routes>
          <Route path="/" element={<Home incrementVisit={incrementVisit} />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/deletar" element={<Deletar />} />
          <Route path="/atualizar" element={<Atualizar />} />
          <Route path="/listar" element={<Listar />} />
          <Route path="/listarNome" element={<ListarNome />} />
          <Route path="/listarQtd" element={<ListarQtd />} />
          <Route path="/atualizarPatch" element={<AtualizarPatch />} />
          {/* Adicione outras rotas aqui */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
