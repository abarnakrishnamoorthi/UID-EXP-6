import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ItemForm = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedItems = [...items];
      updatedItems[editIndex] = formData;
      setItems(updatedItems);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setItems([...items, formData]);
    }
    setFormData({ name: '', description: '', quantity: '' });
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleEdit = (index) => {
    const itemToEdit = items[index];
    setFormData(itemToEdit);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="form-container">
      <h2 className="title">Inventory Management</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">{isEditing ? 'Update' : 'Add Item'}</button>
      </form>

      <h3 className="items-title">Items List</h3>
      <ul className="items-list">
        {items.map((item, index) => (
          <li key={index} className="item-card">
            <div className="item-content">
              <strong>{item.name}</strong> - {item.description} (Quantity: {item.quantity})
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(index)} className="edit-btn">
                <FaEdit /> Update
              </button>
              <button onClick={() => handleRemove(index)} className="remove-btn">
                <FaTrash /> Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemForm;
