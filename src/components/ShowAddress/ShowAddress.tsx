interface Address {
    id: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface ShowAddressProps {
    addresses: Address[];
    onDelete: (id: number) => Promise<void>;
}

const ShowAddress: React.FC<ShowAddressProps> = ({ addresses = [], onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">

                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className="border border-gray-200 rounded-lg p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-100 transition-colors duration-200"
                    >
                        <div className="space-y-1">
                            <p className="font-semibold text-gray-900">{address.name}</p>
                            <p className="text-gray-600">{address.street}</p>
                            <p className="text-gray-600">
                                {address.city}, {address.state} {address.zip}
                            </p>
                        </div>
                        <button
                            onClick={() => onDelete(address.id)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        >
                            Remove
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ShowAddress;