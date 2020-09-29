import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  /* Take your row sizing not from the pizzaStyles div, but from the  PizzaGridStyles grid */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza: { name, price, slug, toppings, image } }) {
  return (
    <PizzaStyles>
      <Link to={`/pizzas/${slug.current}`}>
        <h2 className="mark">
          {name} <span>{price}</span>
        </h2>
      </Link>
      <p>
        {toppings
          .map(
            ({ name: nameTop, vegetarian }) =>
              `${nameTop} ${vegetarian ? ' 🌱' : ''}`
          )
          .join(', ')}
      </p>
      <Img fluid={image.asset.fluid} alt={name} />
    </PizzaStyles>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={`single-pizza-${pizza.id}`} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}
