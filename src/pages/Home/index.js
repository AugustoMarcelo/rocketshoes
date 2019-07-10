import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
    state = {
        products: [],
        loading: false,
    };

    async componentDidMount() {
        this.setState({ loading: true });
        const response = await api.get('/products');

        const data = response.data.map(product => ({
            ...product,
            priceFormatted: formatPrice(product.price),
        }));

        this.setState({ products: data, loading: false });
    }

    handleAddProduct = id => {
        const { addToCartRequest } = this.props;

        addToCartRequest(id);
    };

    render() {
        const { products, loading } = this.state;
        const { amountInCart } = this.props;

        return loading ? (
            <div style={{ position: 'absolute', top: 300, left: 610 }}>
                <Loader
                    type="ThreeDots"
                    color="#fff"
                    height="100"
                    width="100"
                />
            </div>
        ) : (
            <ProductList>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <strong>{product.title}</strong>
                        <span>{product.priceFormatted}</span>
                        <button
                            type="button"
                            onClick={() => this.handleAddProduct(product.id)}
                        >
                            <div>
                                <MdAddShoppingCart size={16} color="#FFF" />{' '}
                                {amountInCart[product.id] || 0}
                            </div>
                            <span>ADICIONAR AO CARRINHO</span>
                        </button>
                    </li>
                ))}
            </ProductList>
        );
    }
}

const mapStateToProps = state => ({
    amountInCart: state.cart.reduce((amountInCart, product) => {
        amountInCart[product.id] = product.amount;
        return amountInCart;
    }, {}),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
