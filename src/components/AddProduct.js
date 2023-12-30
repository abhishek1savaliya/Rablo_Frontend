import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem('token');

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

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductInfo((prevInfo) => ({
            ...prevInfo,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                    Product ID:
                    <input
                        type="text"
                        name="productId"
                        value={productInfo.productId}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </label>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={productInfo.name}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </label>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={productInfo.price}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </label>
            </div>

            <div className="mb-6 flex items-center">
                <label className="text-gray-700 text-lg font-semibold">
                    Featured:
                </label>
                <input
                    type="checkbox"
                    name="featured"
                    checked={productInfo.featured}
                    onChange={handleChange}
                    className="ml-4 form-checkbox h-6 w-6 text-blue-600"
                />
                <span className="ml-2 text-lg text-gray-700">Is Featured</span>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                    Rating (Give Rating from 1 to 5):
                    <input
                        type="number"
                        name="rating"
                        value={productInfo.rating}
                        onChange={handleChange}
                        step="0.1"
                        min="1"
                        max="5"
                        className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </label>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                    Company:
                    <input
                        type="text"
                        name="company"
                        value={productInfo.company}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </label>
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            >
                Add Product
            </button>
        </form>

    );
};

export default AddProduct;
