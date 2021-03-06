import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.currentPrice.toFixed(2)}</strong>$</p>
    {controls.map((control) => (
      <BuildControl 
        key={control.label} 
        label={control.label}
        disabled={props.disabled[control.type]}
        added={() => props.ingredientAdded(control.type)} 
        removed={() => props.ingredientRemoved(control.type)}/>
    ))}
    <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
      >{props.isAuth ? 'ORDER NOW' : 'SING UP TO ORDER'}</button>
  </div>
);

export default buildControls;
