import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBrands, deleteBrand, createBrand,updateBrand } from './actions/brandActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Home = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [newBrand, setNewBrand] = useState({ name: '', category: '', isActive: false });
  const [updatedBrand, setUpdatedBrand] = useState({ id: null, name: '', category: '', isActive: false });
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const brands = useSelector(state => state.brandReducer.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteBrand(brandToDelete.id));
      await dispatch(fetchBrands());
    } catch (error) {
      console.error('Error deleting brand:', error);
      toast.error('An error occurred while deleting the brand.');
    } finally {
      setBrandToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleCreate = async () => {
    try {
      console.log('New brand:', newBrand);
      // Resetting newBrand state
      setNewBrand({ name: '', category: '', isActive: false });
      // Dispatching createBrand action with newBrand data
      await dispatch(createBrand(newBrand));
      // Fetching updated list of brands
      await dispatch(fetchBrands());
      // Closing the create modal
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating brand:', error);
      if (error.response) {
        toast.error('Failed to create brand: ' + error.response.data.message);
      } else {
        toast.error('An error occurred while creating the brand.');
      }
    }
  };
  
  const handleUpdate = async () => {
    try {
      console.log('Updated brand:', updatedBrand);
      await dispatch(updateBrand(updatedBrand.id, updatedBrand));
      await dispatch(fetchBrands());
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating brand:', error);
      if (error.response) {
        toast.error('Failed to update brand: ' + error.response.data.message);
      } else {
        toast.error('An error occurred while updating the brand.');
      }
    }
  };
  

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Brands</h2>
      <Button variant="info" onClick={() => setShowCreateModal(true)}>Create Brand</Button>
      {brands.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-hover" style={{ margin: 'auto' }}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Active</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.name}</td>
                <td>{brand.category}</td>
                <td>{brand.isActive ? 'Yes' : 'No'}</td>
                <td>
                  <button type="button" className="btn btn-primary" onClick={() => {setUpdatedBrand(brand); setShowUpdateModal(true); }} style={{ marginRight: '10px' }}>Edit</button>
                  <button type="button" className="btn btn-danger" onClick={() => { setBrandToDelete(brand); setShowDeleteModal(true); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {brandToDelete?.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBrandName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newBrand.name}
                onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBrandCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={newBrand.category}
                onChange={(e) => setNewBrand({ ...newBrand, category: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBrandIsActive">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={newBrand.isActive}
                onChange={(e) => setNewBrand({ ...newBrand, isActive: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBrandName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={updatedBrand.name}
                onChange={(e) => setUpdatedBrand({ ...updatedBrand, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBrandCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={updatedBrand.category}
                onChange={(e) => setUpdatedBrand({ ...updatedBrand, category: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBrandIsActive">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={updatedBrand.isActive}
                onChange={(e) => setUpdatedBrand({ ...updatedBrand, isActive: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Home;
