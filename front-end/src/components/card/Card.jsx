import logo from "../../assets/logo_trans.png";
import "./Card.css";

const Card = ({ name, surname, accountNumber }) => {
  return (
    <div className="container-card">
      <div className="card">
        <div className="logo">
          <div className="visa_logo">
            <img
              src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
              alt="Visa Logo"
            />
          </div>
          <div className="visa_logo">
            <img style={{ width: 100 }} src={logo} alt="Visa Logo" />
          </div>
        </div>
        <div className="visa_info">
          <img
            src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
            alt="Chip"
          />
        </div>
        <p className="iban">{accountNumber}</p>
        <div className="visa_info">
          <p>
            {name} {surname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
