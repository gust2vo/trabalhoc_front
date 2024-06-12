import React, { useState, useEffect } from 'react';
import './Atualizar.css';

interface Product  {
  id: string;
  nameProduct: string;
  price: number;
  amount: number;
};

const Atualizar: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [updatedProduct, setUpdatedProduct] = useState<Product>({
    id: '',
    nameProduct: '',
    price: 0,
    amount: 0
  });

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
    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
      setUpdatedProduct(selectedProduct);
      setSelectedProductId(productId);
    }
  };

  const handleFieldChange = (fieldName: keyof Product, value: string | number) => {
    setUpdatedProduct(prevProduct => ({
      ...prevProduct,
      [fieldName]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5121/putProduct?id=${selectedProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
  
      if (response.ok) {
        alert('Produto atualizado com sucesso!');
        // You may want to refresh the product list or update the specific product in the list.
      } else {
        const errorMessage = await response.text();
        throw new Error(`Erro ao atualizar produto: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Erro: ${error}`);
    }
  };

  return (
    <div className='contatt'>
    <div className="divatt">
      <form className= "formatt"onSubmit={handleSubmit}>
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
          <input type="text" value={updatedProduct.nameProduct} onChange={(e) => handleFieldChange('nameProduct', e.target.value)} required />
        </label>
        <label>
          Novo Preço:
          <input type="number" value={updatedProduct.price} onChange={(e) => handleFieldChange('price', parseFloat(e.target.value))} required min="0" step="0.01" />
        </label>
        <label>
          Nova Quantidade:
          <input type="number" value={updatedProduct.amount}  onChange={(e) => handleFieldChange('amount', parseInt(e.target.value))} required min="0"/>
        </label>
        <button className= "bttatt" type="submit">Atualizar</button>
      </form>
    </div>
    </div>
  );
};

export default Atualizar;
