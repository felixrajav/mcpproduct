import { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { isAdmin } = useAuth();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productAPI.getAll();
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await productAPI.delete(productId);
            setSuccessMessage('Product deleted successfully!');
            fetchProducts();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete product');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="product-list">
            <div className="page-header">
                <h1>Product Management</h1>
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <div className="products-grid">
                {products.length === 0 ? (
                    <div className="no-products">
                        <p>No products found. Products will be fetched from API in the future.</p>
                    </div>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <div className="product-header">
                                <h3>{product.name}</h3>
                                <span className="product-price">${product.price}</span>
                            </div>
                            <p className="product-description">{product.description}</p>
                            <div className="product-details">
                                <span className="product-category">{product.category}</span>
                                <span className="product-stock">Stock: {product.stock}</span>
                            </div>
                            {isAdmin && (
                                <div className="product-actions">
                                    <button
                                        className="btn-danger"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;
