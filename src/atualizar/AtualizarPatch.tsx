import React, { useState, useEffect } from 'react';
import './Atualizar.css';

interface Product {
  id: string;
  nameProduct: string;
  price: number;
  amount: number;
}

const AtualizarPatch: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [response, setResponse] = useState<any>(null);

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

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5121/patch?id=${selectedProductId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newName),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  return (
    <div className='contatt'>
      <div className="divatt">
        <div className="formatt">
          <label>
            Nome do Produto:
            <select value={selectedProductId} onChange={(e) => handleProductChange(e.target.value)} required>
              <option value="" disabled>Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nameProduct}
                </option>
              ))}
            </select>
          </label>
          <label>
            Novo Nome:
            <input
              type="text"
              placeholder="New Product Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </label>
          <button className="bttatt" onClick={handleUpdate}>
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AtualizarPatch;
