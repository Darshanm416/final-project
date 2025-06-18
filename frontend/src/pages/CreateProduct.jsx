import React, { useState } from 'react';

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('image', form.image);

    // Upload image
    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: data,
    });

    const { imagePath } = await uploadRes.json();

    // Create product with uploaded image path
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, image: imagePath }),
    });

    alert('Product Created!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <input name="name" placeholder="Name" className="input" onChange={handleChange} required />
      <input name="description" placeholder="Description" className="input" onChange={handleChange} required />
      <input name="price" placeholder="Price" type="number" className="input" onChange={handleChange} required />
      <input name="image" type="file" accept="image/*" className="input" onChange={handleChange} required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Create Product</button>
    </form>
  );
};

export default CreateProduct;
