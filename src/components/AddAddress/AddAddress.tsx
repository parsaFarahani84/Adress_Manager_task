import { useState, useEffect } from 'react';
import axios from 'axios';
import ShowAddress from '../ShowAddress/ShowAddress';

interface Address {
    id: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface FormData {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
}

const API_BASE_URL = 'http://localhost:3000';

const AddAddress: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: ''
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async (): Promise<void> => {
        try {
            const response = await axios.get<Address[]>(`${API_BASE_URL}/addresses`);
            setAddresses(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error fetching addresses:', error.message);
            } else {
                console.error('Error fetching addresses:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await axios.post<Address>(`${API_BASE_URL}/addresses`, formData);
            setAddresses(prev => [...prev, response.data]);
            setFormData({
                name: '',
                street: '',
                city: '',
                state: '',
                zip: ''
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error adding address:', error.message);
            } else {
                console.error('Error adding address:', error);
            }
        }
    };

    const handleDelete = async (id: number): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}/addresses/${id}`);
            setAddresses(prev => prev.filter(address => address.id !== id));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error deleting address:', error.message);
            } else {
                console.error('Error deleting address:', error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Address</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    placeholder="123 Main St"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="New York"
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="NY"
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                                        ZIP Code
                                    </label>
                                    <input
                                        type="text"
                                        id="zip"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        placeholder="10001"
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Add Address
                        </button>
                    </form>
                </div>

                {addresses.length === 0 ? <p className='text-gray-600 flex justify-center items-center font-normal text-xl'>No addresses found</p> : <ShowAddress addresses={addresses} onDelete={handleDelete} />}
            </div>
        </div>
    );
};

export default AddAddress;