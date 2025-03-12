import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { storesData } from '../constants/storesData';

// Define types for the store data
interface Store {
  seqNo: number;
  label: string;
  city: string;
  state: string;
}

interface NewStore {
  label: string;
  city: string;
  state: string;
}

const Stores: React.FC = () => {


  const [stores, setStores] = useState<Store[]>(storesData);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [newStore, setNewStore] = useState<NewStore>({
    label: '',
    city: '',
    state: ''
  });
  const [editingStore, setEditingStore] = useState<Store | null>(null);

  // CRUD Operations
  const addStore = (): void => {
    if (!newStore.label || !newStore.city || !newStore.state) {
      alert('Please fill in all fields');
      return;
    }

    const updatedStores: Store[] = [
      ...stores,
      {
        ...newStore,
        seqNo: stores.length + 1
      }
    ];

    setStores(updatedStores);
    setNewStore({ label: '', city: '', state: '' });
    setShowAddForm(false);
  };

  const deleteStore = (seqNo: number): void => {
    const filteredStores = stores.filter(store => store.seqNo !== seqNo);
    const updatedStores = filteredStores.map((store, index) => ({
      ...store,
      seqNo: index + 1
    }));
    setStores(updatedStores);
  };

  const editStore = (store: Store): void => {
    setEditingStore(store);
    setShowEditForm(true);
  };

  const saveEditedStore = (): void => {
    if (!editingStore) return;

    const updatedStores = stores.map(store =>
      store.seqNo === editingStore.seqNo ? editingStore : store
    );

    setStores(updatedStores);
    setEditingStore(null);
    setShowEditForm(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!editingStore) return;

    const { name, value } = e.target;
    setEditingStore({
      ...editingStore,
      [name]: value
    });
  };

  // Drag and Drop functionality
  const onDragEnd = (result: DropResult): void => {
    const { destination, source } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const newStores = Array.from(stores);
    const [movedItem] = newStores.splice(source.index, 1);
    newStores.splice(destination.index, 0, movedItem);

    const updatedStores = newStores.map((store, index) => ({
      ...store,
      seqNo: index + 1
    }));

    setStores(updatedStores);
  };

  // Handle form input changes for adding new store
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setNewStore({
      ...newStore,
      [name]: value
    });
  };

  return (
    <div className="p-0">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="storesList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="border border-gray-200 rounded"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-3 text-left font-medium text-gray-600 w-16">S.No</th>
                    <th className="p-3 text-left font-medium text-gray-600">Store</th>
                    <th className="p-3 text-left font-medium text-gray-600">City</th>
                    <th className="p-3 text-left font-medium text-gray-600">State</th>
                    <th className="p-3 text-left font-medium text-gray-600 w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store, index) => (
                    <Draggable
                      key={`store-${store.seqNo}`}
                      draggableId={`store-${store.seqNo}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`border-b hover:bg-gray-50 ${snapshot.isDragging ? 'bg-blue-50' : 'bg-white'
                            }`}
                        >
                          <td className="p-3 border-r">
                            <div className="flex items-center">
                              <button
                                onClick={() => deleteStore(store.seqNo)}
                                className="text-gray-500 hover:text-red-500 mr-3"
                                title="Delete Store"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                              </button>
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-move mr-2"
                                title="Drag to reorder"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm0 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm0 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm0 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11z" />
                                </svg>
                              </div>
                              {store.seqNo}
                            </div>
                          </td>
                          <td className="p-3 border-r">{store.label}</td>
                          <td className="p-3 border-r">{store.city}</td>
                          <td className="p-3 border-r">{store.state}</td>
                          <td className="p-3">
                            <button
                              onClick={() => editStore(store)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                              title="Edit Store"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Store</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <input
                  type="text"
                  name="label"
                  value={newStore.label}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter store name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={newStore.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={newStore.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter state (2-letter code)"
                  maxLength={2}
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
                  onClick={addStore}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Store
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditForm && editingStore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Store</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <input
                  type="text"
                  name="label"
                  value={editingStore.label}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={editingStore.city}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={editingStore.state}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  maxLength={2}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setEditingStore(null);
                    setShowEditForm(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedStore}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600"
        >
          NEW STORE
        </button>
      </div>
    </div>
  );
};

export default Stores;