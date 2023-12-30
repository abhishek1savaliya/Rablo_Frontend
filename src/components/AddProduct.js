import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [productInfo, setProductInfo] = useState({
        productId: '',
        name: '',
        price: 0,
        featured: false,
        rating: 0.0,
        company: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductInfo((prevInfo) => ({
            ...prevInfo,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login")
        }

        try {
            const response = await axios.post(
                'https://rablo-backend-3rrt.onrender.com/api/products',
                productInfo,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                    },
                }
            );

            if (response.data) {
                navigate("/")
            }
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Product ID:
                    <input
                        type="text"
                        name="productId"
                        value={productInfo.productId}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={productInfo.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={productInfo.price}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Featured:
                    <input
                        type="checkbox"
                        name="featured"
                        checked={productInfo.featured}
                        onChange={handleChange}
                        className="mr-2 leading-tight"
                    />
                    <span className="text-sm">Is Featured</span>
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Rating (Give Rating from 1 to 5):
                    <input
                        type="number"
                        name="rating"
                        value={productInfo.rating}
                        onChange={handleChange}
                        step="0.1"
                        min="1"
                        max="5"
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Company:
                    <input
                        type="text"
                        name="company"
                        value={productInfo.company}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </label>
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Add Product
            </button>
        </form>
    );
};

export default AddProduct;
