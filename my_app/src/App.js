import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetails({ match }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(match.params.productId);
  }, [match.params.productId]);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(`http://20.244.56.144/test/companies/:companyname/categories/categoryname/products?top=n&minPri ce=p&maxPrice-q`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>Company: {product.company}</p>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Rating: {product.rating}</p>
        <p>Duration: {product.duration}</p>
        <p>Availability: {product.availability}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/products/:productId" component={ProductDetails} />
          <Route path="/" component={ProductList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
