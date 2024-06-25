import React, { useState, useEffect } from 'react';
import './Listar.css';

interface Product {
  id: string;
  nameProduct: string;
  price: number;
  amount: number;
}

const ListarNome: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>('');

  const fetchProductsByName = async (name: string) => {
    try {
      const response = await fetch(`http://localhost:5121/nameProducts?inputName=${name}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos por nome');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do produto"
        />
        <button onClick={() => fetchProductsByName(name)}>Buscar por nome</button>
      </div>
      <div className="parent">
        {products.map(product => (
          <div key={product.id} className="box">
            <h2>{product.nameProduct}</h2>
            <p>Preço: {product.price}</p>
            <p>Quantidade: {product.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarNome;
