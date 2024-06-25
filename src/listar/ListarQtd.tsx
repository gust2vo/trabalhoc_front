import React, { useState, useEffect } from 'react';
import './Listar.css';

interface Product {
  id: string;
  nameProduct: string;
  price: number;
  amount: number;
}

const ListarQtd: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [minQuantity, setMinQuantity] = useState<number>(0);

  const fetchProductsByQuantity = async (quantity: number) => {
    try {
      const response = await fetch(`http://localhost:5121/productsQuantity?minQuantity=${quantity}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos por quantidade');
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
          type="number"
          value={minQuantity}
          onChange={(e) => setMinQuantity(parseInt(e.target.value))}
          placeholder="Quantidade mínima"
        />
        <button onClick={() => fetchProductsByQuantity(minQuantity)}>Buscar por quantidade</button>
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

export default ListarQtd;
