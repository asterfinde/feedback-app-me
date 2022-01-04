import PropTypes from "prop-types";

// return <div className={`card ${reverse && 'reverse'}`}>{children}</div>
const Card = ({ children, reverse }) => (
  <div className="card"
       style={
         {
          backgroundColor: reverse ? "rgba(0,0,0,0.4)" : "#fff",
          color: reverse ? "#fff" : "#000"
        }
      }
  >
    {children}
  </div>
);

Card.defaultProps = {
  reverse: false
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool
};

export default Card;
