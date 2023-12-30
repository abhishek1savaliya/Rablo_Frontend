// src/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import AddProduct from './AddProduct';

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');
    const [isChecked, setIsChecked] = useState(false);
    const [rating, setRating] = useState(0)
    const [amount, setAmount] = useState()

    console.log(amount)
    console.log(rating)


    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://rablo-backend-3rrt.onrender.com/api/products', {
                headers: {
                    'token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const featureData = async (value) => {
        try {
            const response = await axios.get(`https://rablo-backend-3rrt.onrender.com/api/product/feature?value=${value}`, {
                headers: {
                    'token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const amountData = async (val) => {
        try {
            const response = await axios.get(`https://rablo-backend-3rrt.onrender.com/api/product/price/${val}`, {
                headers: {
                    'token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const ratingData = async (rat) => {
        try {
            const response = await axios.get(`https://rablo-backend-3rrt.onrender.com/api/product/rating/${rat}`, {
                headers: {
                    'token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleToggleChange = async () => {
        setIsChecked(prevChecked => !prevChecked);
    };

    useEffect(() => {
        featureData(isChecked)
    }, [isChecked]);

    useEffect(() => {
        amountData(amount)
    }, [amount]);

    useEffect(() => {
        ratingData(rating)
    }, [rating])

    useEffect(() => {
        fetchData()
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://rablo-backend-3rrt.onrender.com/api/product/${id}`, {
                headers: {
                    'token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <div className="container mx-auto p-4">
            <div className='container mx-auto flex items-center justify-between'>
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Product List</h2>

                <div className="flex items-center space-x-4">


                    <div className="flex items-center">
                        <span class="mr-2">Rating :</span>
                        <select id="ratingSelect" className="p-2 border rounded-md" onChange={(e) => setRating(e.target.value)}>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                    </div>


                    <div class="max-w-md">
                        <label for="numberInput" class="block text-sm font-medium text-gray-700">Enter Amount:</label>
                        <input type="number" id="numberInput" name="numberInput" class="mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out" onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="flex items-center">
                        <span class="text-xl font-medium mr-2 text-gray-900 dark:text-gray-600">Featured</span>
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
                    <div key={product.productId} className="relative bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 rounded p-4 shadow-md transition duration-300 hover:bg-gray-100 hover:shadow-lg">

                        <button
                            onClick={() => handleDelete(product._id)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>


                        <h3 className="text-lg font-semibold mb-2 text-purple-800">{product.name}</h3>
                        <p className="text-gray-800">${product.price}</p>
                        <p className={`text-${product.featured ? 'green' : 'red'}-500`}>Featured: {product.featured ? 'Yes' : 'No'}</p>
                        <p className={`text-${product.rating >= 4 ? 'green' : 'orange'}-500`}>Rating: {product.rating}</p>
                        <p className="text-teal-500">Company: {product.company}</p>
                        <p className="text-gray-600">Created At: {moment(product.createdAt).fromNow()}</p>
                        <p className="text-gray-600">Updated At: {moment(product.updatedAt).fromNow()}</p>
                        <div class="mt-4 flex justify-end">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                             Edit
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>

    );
};

export default ProductList;
