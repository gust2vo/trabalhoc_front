import React, { useState, useEffect } from 'react';
import './Deletar.css';

interface Product  {
  id: string;
  nameProduct: string;
  price: number;
  amount: number;
};

const Deletar: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5121/allProducts');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5121/deleteProduct?id=${selectedProductId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert('Produto deletado com sucesso!');
        setProducts(products.filter(product => product.id !== selectedProductId));
        setSelectedProductId('');
      } else {
        const errorMessage = await response.text();
        throw new Error(`Erro ao deletar produto: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Erro: ${error}`);
    }
  };

  return (
    <div className="deletar">
      <form className="formdel" onSubmit={handleSubmit}>
        <div className='divdel'>
        <label>
          Nome do Produto:
          <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)} required>
            <option value="" disabled>Selecione um produto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nameProduct}
              </option>
            ))}
          </select>
        </label>
        <button className="bttdel" type="submit">Deletar</button>
        </div>
      </form>
    </div>
  );
};

export default Deletar;
