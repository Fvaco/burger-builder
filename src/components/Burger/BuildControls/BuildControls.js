import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Tomato", type: "tomato" },
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]}
        key={control.label}
        label={control.label}
      />
    ))}
    <button
      disabled={!props.purchasable}
      className={classes.OrderButton}
      onClick={props.ordered}
    >
      ORDER NOW!
    </button>
  </div>
);

export default buildControls;
