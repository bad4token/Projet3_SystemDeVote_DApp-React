// Import ASSETS
import logo from './../logo_vote.jpg';

function Intro() {
  return (
    <div className="Intro">
      <br />
      <h3>
        <em>"La droite est nulle, la gauche est nulle, je vote match nul !"</em>,  <code>Coluche</code>
      </h3>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default Intro;