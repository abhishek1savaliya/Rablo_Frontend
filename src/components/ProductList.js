// src/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const [isChecked, setIsChecked] = useState(false);

    const handleToggleChange = () => {
      setIsChecked((prevChecked) => !prevChecked);
      console.log(isChecked)
    };
    
        const fetchData = async () => {
            try {
                const response = await axios.get('https://rablo-backend-3rrt.onrender.com/api/products', {
                    headers: {
                        'token': localStorage.getItem('token'), // Replace with your actual token key
                        'Content-Type': 'application/json'
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className="container mx-auto p-4">
            <div className='container mx-auto flex items-center justify-between'>
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Product List</h2>
                <div className="flex items-center">
                <div className="flex items-center">
    <div className="ms-3 text-xl font-medium mr-5 text-gray-900 dark:text-gray-300">
        <span>Featured</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggleChange}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
</div>

                    <Link to="/add">
                        <button
                            type="button"
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                        >
                            Add Product
                        </button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {products.map((product) => (
                    <div key={product.productId} className="bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 rounded p-4 shadow-md transition duration-300 hover:bg-gray-100 hover:shadow-lg">
                        <h3 className="text-lg font-semibold mb-2 text-purple-800">{product.name}</h3>
                        <p className="text-gray-800">${product.price}</p>
                        <p className={`text-${product.featured ? 'green' : 'red'}-500`}>Featured: {product.featured ? 'Yes' : 'No'}</p>
                        <p className={`text-${product.rating >= 4 ? 'green' : 'orange'}-500`}>Rating: {product.rating}</p>
                        <p className="text-teal-500">Company: {product.company}</p>
                        <p className="text-gray-600">Created At: {new Date(product.createdAt).toLocaleString()}</p>
                        <p className="text-gray-600">Updated At: {new Date(product.updatedAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ProductList;
