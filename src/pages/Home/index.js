import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ContainerLoader, ProductList, AddProductButton } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const amountInCart = useSelector(state =>
    state.cart.products.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {})
  );
  const adding = useSelector(state => state.cart.adding);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setLoading(false);
      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return loading ? (
    <ContainerLoader>
      <Loader type="ThreeDots" color="#fff" height="100" width="100" />
    </ContainerLoader>
  ) : (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <AddProductButton
            type="button"
            onClick={() => handleAddProduct(product.id)}
            adding={adding.includes(product.id) ? 1 : 0}
          >
            {adding.includes(product.id) ? (
              <div>
                <FaSpinner size={16} color="fff" />
              </div>
            ) : (
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />{' '}
                {amountInCart[product.id] || 0}
              </div>
            )}
            <span>ADICIONAR AO CARRINHO</span>
          </AddProductButton>
        </li>
      ))}
    </ProductList>
  );
}
