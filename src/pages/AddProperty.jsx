import { useState } from 'react';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    propertyTitle: '',
    propertyLocation: '',
    propertyImage: '',
    priceRange: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <form className="container mx-auto p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <input name="propertyTitle" placeholder="Property Title" className="input input-bordered w-full mb-4" onChange={handleChange} required />
      <input name="propertyLocation" placeholder="Property Location" className="input input-bordered w-full mb-4" onChange={handleChange} required />
      <input name="propertyImage" placeholder="Property Image URL" className="input input-bordered w-full mb-4" onChange={handleChange} required />
      <input name="priceRange" placeholder="Price Range" className="input input-bordered w-full mb-4" onChange={handleChange} required />
      <button type="submit" className="btn btn-primary">Add Property</button>
    </form>
  );
};

export default AddProperty;
