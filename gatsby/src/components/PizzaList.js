import React from 'react';
import { Link } from 'gatsby';

function SinglePizza({ pizza: { id, name, price, slug, toppings, image } }) {
  return (
    <div>
      <Link to={`/pizzas/${slug.current}`}>
        <h2 className="mark">{name}</h2>

        <p>{price}</p>
        <p>{slug.current}</p>
        <ul>
          {toppings
            .map(
              ({ name: nameTop, vegetarian }) =>
                `${nameTop} ${vegetarian ? ' 🌱' : ''}`
            )
            .join(', ')}
        </ul>
        <img src={image.asset.fluid.base64} alt="" />
      </Link>
    </div>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((pizza) => (
        <SinglePizza key={`single-pizza-${pizza.id}`} pizza={pizza} />
      ))}
    </div>
  );
}
