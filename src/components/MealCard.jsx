import PropTypes from "prop-types";
import "../styles/MealCard.scss";

const MealCard = ({ meal, children}) => (
  <div className="meal-card">
    <div className="meal__cardBox">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="backdrop"></div>
      {children}
    </div>
    <div className="meal__desc">
      <h3>{meal.strMeal}</h3>
    </div>
  </div>
);

MealCard.propTypes = {
  meal: PropTypes.object.isRequired,
  children: PropTypes.node,
};


export default MealCard;
