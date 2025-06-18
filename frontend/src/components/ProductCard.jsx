import React from 'react';

const ProductCard = ({ product }) => {
  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : `http://localhost:5000${product.image}`;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-56 object-cover transition-transform hover:scale-105 duration-300"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
        }}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-green-600 font-bold text-lg">₹{product.price}</span>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
