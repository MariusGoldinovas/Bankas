import card from "../../assets/card2.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="main d-flex justify-content-center mt-5">
        <img src={card} alt="Card" />
      </div>
    </div>
  );
};

export default Home;
