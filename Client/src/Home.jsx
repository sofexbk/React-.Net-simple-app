import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBrands } from './actions/brandActions';

const Home = () => {
  const brands = useSelector(state => state.brandReducer.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Brands</h2>
      {brands.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-hover" style={{ margin: 'auto' }}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Active</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <th scope="row">{brand.id}</th>
                <td>{brand.name}</td>
                <td>{brand.category}</td>
                <td>{brand.isActive ? 'Yes' : 'No'}</td>
                <td>
                  <button type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>Primary</button>
                  <button type="button" className="btn btn-danger">Danger</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
