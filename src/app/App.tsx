import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../home/Home';
import Cadastro from '../cadastrar/Cadastro';
import Deletar  from '../deletar/Deletar';
import Atualizar from '../atualizar/Atualizar';
import Listar from '../listar/Listar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <nav className="navbar">
          <Link to="/"><button>Home</button></Link>
          <Link to="/cadastro"><button>Cadastro</button></Link>
          <Link to="/atualizar"><button>Atualizar</button></Link>
          <Link to="/deletar"><button>Deletar</button></Link>
          <Link to="/listar"><button>Listar</button></Link>
          
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/deletar" element={<Deletar />} />
          <Route path="/atualizar" element={<Atualizar />} />
          <Route path="/listar" element={<Listar />} />
          {/* Adicione outras rotas aqui */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
