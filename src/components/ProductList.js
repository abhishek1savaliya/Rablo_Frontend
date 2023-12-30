// src/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');
    const [isChecked, setIsChecked] = useState(false);
    const [rating, setRating] = useState(0);
    const [amount, setAmount] = useState();

    const BASE_URL = 'https://rablo-backend-3rrt.onrender.com';

    const headers = {
        'token': token,
        'Content-Type': 'application/json'
    };

    const fetchData = async (endpoint) => {
        try {
            const response = await axios.get(`${BASE_URL}/${endpoint}`, { headers });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchData('api/products');
        }
    }, [token]);

    const handleToggleChange = () => {
        setIsChecked(prevChecked => !prevChecked);
    };

    useEffect(() => {
        fetchData(`api/product/feature?value=${isChecked}`);
    }, [isChecked]);

    useEffect(() => {
        fetchData(`api/product/price/${amount}`);
    }, [amount]);

    useEffect(() => {
        fetchData(`api/product/rating/${rating}`);
    }, [rating]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/product/${id}`, { headers });
            fetchData('api/products');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEdit = (product) => {
        navigate('/edit', { state: product });
    };

    return (
        <div className="container mx-auto p-4">
            <div className='container mx-auto flex items-center justify-between'>
                <h2 className="text-3xl font-bold mb-4 text-pink-600">Product List</h2>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                        <span class="mr-2 text-xl text-green-600">Rating:</span>
                        <select id="ratingSelect" class="p-2 border rounded-md" onchange="setRating(this.value)">
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>

                        <label htmlFor="numberInput" className="block text-xl font-medium text-blue-600 mb-1">Amount:</label>
                        <input
                            type="number"
                            id="numberInput"
                            name="numberInput"
                            placeholder="Enter the amount..."
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <div className="flex items-center">
                            <span className="text-xl font-medium mr-2 text-red-600">Featured</span>
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
                    <div key={product.productId} className="relative bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 rounded p-4 shadow-md transition duration-300 hover:bg-gray-100 hover:shadow-lg">
                        <button
                            onClick={() => handleDelete(product._id)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-300 rounded-full p-2 bg-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>


                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3 text-purple-800">{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h3>

                            <p className="text-lg text-gray-800"> Rs.{product.price}</p>


                            <div className="mt-3 flex items-center space-x-3">
                                <span className={`px-3 py-1 rounded-full text-sm ${product.featured ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                    {product.featured ? 'Featured: Yes' : 'Featured: No'}
                                </span>

                                <span className={`px-3 py-1 rounded-full text-sm ${product.rating >= 4 ? 'bg-green-500 text-white' : product.rating < 2 ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
                                    Rating: {product.rating}
                                </span>

                            </div>


                            <div className="mt-3 flex justify-between text-sm text-gray-600">
                                <p>Company: {product.company}</p>
                                <p>Created At: {moment(product.createdAt).fromNow()}</p>
                                <p>Updated At: {moment(product.updatedAt).fromNow()}</p>
                            </div>


                            <div className="mt-4 flex justify-end">
                                <button
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded"
                                    onClick={() => handleEdit(product)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ProductList;
