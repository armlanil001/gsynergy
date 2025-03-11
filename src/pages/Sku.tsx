import React, { useState } from "react";
import { skuData } from "../constants/skuData";

interface SKU {
  id: string;
  label: string;
  price: number;
  cost: number;
}

const SKU: React.FC = () => {
  const [skus, setSkus] = useState<SKU[]>(skuData);

  const [newSKU, setNewSKU] = useState<SKU>({ id: "", label: "", price: 0, cost: 0 });
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editingSku, setEditingSku] = useState<SKU | null>(null);

  // DELETE: Remove SKU
  const deleteSKU = (id: string) => {
    setSkus(skus.filter((sku) => sku.id !== id));
  };

  // EDIT: Set SKU for editing
  const editSku = (sku: SKU): void => {
    setEditingSku(sku);
    setShowEditForm(true);
  };

  // Handle edit form changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!editingSku) return;

    const { name, value } = e.target;
    setEditingSku({
      ...editingSku,
      [name]: name === "price" || name === "cost" ? parseFloat(value) : value
    });
  };

  // Save edited SKU
  const saveEditedSku = (): void => {
    if (!editingSku) return;

    if (!editingSku.id || !editingSku.label || editingSku.price <= 0 || editingSku.cost < 0) {
      alert("Please fill in all fields correctly!");
      return;
    }

    setSkus(skus.map(sku =>
      sku.id === editingSku.id ? editingSku : sku
    ));

    setEditingSku(null);
    setShowEditForm(false);
  };

  // ADD: New SKU
  const addSKU = () => {
    if (!newSKU.id || !newSKU.label || newSKU.price <= 0 || newSKU.cost < 0) {
      alert("Please fill in all fields correctly!");
      return;
    }
    setSkus([...skus, newSKU]);
    setNewSKU({ id: "", label: "", price: 0, cost: 0 }); // Reset form
    setShowAddForm(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">

        {/* Table Header */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-3 text-left font-medium text-gray-600 w-10"></th>
              <th className="p-3 text-left font-medium text-gray-600">SKU</th>
              <th className="p-3 text-left font-medium text-gray-600">Price</th>
              <th className="p-3 text-left font-medium text-gray-600">Cost</th>
              <th className="p-3 text-left font-medium text-gray-600 w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skus.map((sku) => (
              <tr key={sku.id} className="border-b">
                <td className="p-2">
                  <button onClick={() => deleteSKU(sku.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                  </button>
                </td>
                <td className="p-2 border-r">{sku.label}</td>
                <td className="p-3 border-r">${sku.price.toFixed(2)}</td>
                <td className="p-3 border-r">${sku.cost.toFixed(2)}</td>
                <td className="p-3">
                  <button onClick={() => editSku(sku)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    title="Edit Sku">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add SKU Form */}
        {showAddForm && <div className="mt-4 flex justify-start">
          <button onClick={() => setShowAddForm(false)} className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg shadow">
            Cancel
          </button>
        </div>}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New SKU</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                  <input
                    type="text"
                    name="id"
                    value={newSKU.id}
                    onChange={(e) => setNewSKU({ ...newSKU, id: e.target.value })}
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Enter SKU ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    name="label"
                    value={newSKU.label}
                    onChange={(e) => setNewSKU({ ...newSKU, label: e.target.value })}
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Enter SKU Label"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newSKU.price}
                    onChange={(e) => setNewSKU({ ...newSKU, price: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Enter SKU Price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                  <input
                    type="number"
                    name="cost"
                    value={newSKU.cost}
                    onChange={(e) => setNewSKU({ ...newSKU, cost: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Enter SKU Cost"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addSKU}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Add SKU
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit SKU Form */}
        {showEditForm && editingSku && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit SKU</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                  <input
                    type="text"
                    name="id"
                    value={editingSku.id}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    name="label"
                    value={editingSku.label}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editingSku.price}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                  <input
                    type="number"
                    name="cost"
                    value={editingSku.cost}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setEditingSku(null);
                      setShowEditForm(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEditedSku}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New SKU Button */}
        {!showAddForm && <div className="mt-4 flex justify-start">
          <button onClick={() => setShowAddForm(true)} className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg shadow">
            NEW SKU
          </button>
        </div>}

    </div>
  );
};

export default SKU;