import React, { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';

import { formatPrice } from '../../util/format';
import getValidationErrors from '../../util/getValidationErrors';
import initialData from './data';

import Input from '../../components/Input';

import { Container, Payment, Order, Button } from './styles';

export default function Checkout() {
  const formRef = useRef(null);
  const [card, setCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    focus: '',
    id: '',
  });

  const total = useSelector(state =>
    formatPrice(
      state.cart.products.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
      }, 0)
    )
  );

  function handleChangeInputPayment(e) {
    const name = e.target.id.split('.')[1].replace(/card_/, '');
    const { value } = e.target;

    setCard({
      ...card,
      [name]: value,
      id: '',
    });
  }

  function handleInputFocus(e) {
    if (!e.target.id) return;

    const name = e.target.id.split('.')[1].replace(/card_/, '');
    setCard({
      ...card,
      focus: name,
    });
  }

  const handleSubmit = useCallback(async data => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        customer: Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string().required('E-mail é obrigatório'),
          cpf: Yup.string().required('CPF é obrigatório'),
          rg: Yup.string().required('RG é obrigatório'),
          phone: Yup.string().required('Telefone é obrigatório'),
        }),
        address: Yup.object().shape({
          zipcode: Yup.string().required('CEP é obrigatório'),
          street: Yup.string().required('Rua é obrigatório'),
          street_number: Yup.string().required('Número é obrigatório'),
          neighborhood: Yup.string().required('Bairro é obrigatório'),
          city: Yup.string().required('Cidade é obrigatório'),
          state: Yup.string().required('Estado é obrigatório'),
        }),
        card: Yup.object().shape({
          card_number: Yup.string().required('Número do cartão é obrigatório'),
          card_name: Yup.string().required('Nome do cliente é obrigatório'),
          card_expiry: Yup.string().required('Data de expiração é obrigatória'),
          card_cvc: Yup.string().required(
            'Código de verificação é obrigatório'
          ),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Form
        initialData={initialData}
        onFocus={handleInputFocus}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <h3>Informações pessoais</h3>
        <Scope path="customer">
          <Input name="name" placeholder="Nome completo" />
          <Input name="email" type="email" placeholder="Informe um e-mail" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridColumnGap: 10,
            }}
          >
            <Input
              name="cpf"
              placeholder="Informe seu CPF"
              mask="999.999.999-99"
            />
            <Input name="rg" placeholder="Informe seu RG" mask="99.999.999-9" />
            <Input
              name="phone"
              placeholder="+55 84 99999-9999"
              mask="+99 99 99999-9999"
            />
          </div>
        </Scope>

        <h3>Endereço</h3>
        <Scope path="address">
          <Input name="zipcode" placeholder="CEP:" mask="99999-999" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '3fr 1fr',
              gridColumnGap: 10,
            }}
          >
            <Input name="street" placeholder="Logradouro:" />
            <Input name="street_number" placeholder="Número:" />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridColumnGap: 10,
            }}
          >
            <Input name="neighborhood" placeholder="Bairro:" />
            <Input name="city" placeholder="Cidade:" />
            <Input name="state" placeholder="Estado:" />
          </div>
        </Scope>

        <Payment>
          <div className="card-form">
            <h3>Informações de pagamento</h3>
            <Scope path="card">
              <Input
                name="card_number"
                placeholder="Número do cartão"
                onChange={handleChangeInputPayment}
              />
              <Input
                name="card_name"
                placeholder="Nome no cartão"
                autoComplete="off"
                onChange={handleChangeInputPayment}
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridColumnGap: 10,
                }}
              >
                <Input
                  name="card_expiry"
                  placeholder="Data de expiração"
                  onChange={handleChangeInputPayment}
                  mask="99/99"
                />
                <Input
                  name="card_cvc"
                  type="password"
                  placeholder="Código de segurança"
                  onChange={handleChangeInputPayment}
                />
              </div>
            </Scope>
          </div>
          <div className="card">
            <Cards
              name={card.name}
              number={card.number}
              expiry={card.expiry}
              cvc={card.cvc}
              focused={card.focus}
            />
          </div>
        </Payment>
        <Button type="submit">Finalizar pagamento</Button>
      </Form>
      <Order>
        <div>
          <span>Subtotal</span>
          <strong>{total}</strong>
        </div>
        <div>
          <span>Frete</span>
          <strong>{total}</strong>
        </div>
        <hr />
        <div>
          <span>Total</span>
          <strong>{total}</strong>
        </div>
      </Order>
    </Container>
  );
}
