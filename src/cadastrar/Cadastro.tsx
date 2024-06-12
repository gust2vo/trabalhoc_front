import React, { useState } from 'react';
import './Cadastro.css';

const Cadastro: React.FC = () => {
  const [nameProduct, setNameProduct] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = { nameProduct, price: parseFloat(price), amount: parseInt(amount) };

    try {
      const response = await fetch('http://localhost:5121/createProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert('Produto cadastrado com sucesso!');
        setNameProduct('');
        setPrice('');
        setAmount('');
      } else {
        const errorMessage = await response.text();
        throw new Error(`Erro ao cadastrar produto: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Erro: ${error}`);
    }
  };

return (
<div className="cadastro">
      <form className="formcad" onSubmit={handleSubmit}>
        <div className='divcad'>
        <label >
          Nome do Produto:
          <input type="text" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} required />
        </label>
        <label>
          Preço:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01"/>
        </label>
        <label>
          Quantidade:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0"/>
        </label>
        <button className="bttcad" type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
