import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList, AddProductButton } from './styles';

function Home({ amountInCart, adding, addToCartRequest }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

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
        addToCartRequest(id);
    }

    return loading ? (
        <div style={{ position: 'absolute', top: 300, left: 610 }}>
            <Loader type="ThreeDots" color="#fff" height="100" width="100" />
        </div>
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

const mapStateToProps = state => ({
    amountInCart: state.cart.products.reduce((amountInCart, product) => {
        amountInCart[product.id] = product.amount;
        return amountInCart;
    }, {}),
    adding: state.cart.adding,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
