import React, { useState, useEffect } from 'react';
import './Listar.css';

interface Product {
  id: string;
  nameProduct: string;
  price: number;
  amount: number;
}

const Listar: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5121/allProducts');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
 
  return (
    <div>
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

export default Listar;
