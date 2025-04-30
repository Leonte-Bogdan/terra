import "./Dashboard.scss";

const Dashboard = (children) => {
  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <div className="garden">
          <button className="garden-btn">Garden</button>
        </div>
        <div className="terrarium">
          <button className="terrarium-btn">Terrarium</button>
        </div>
        <div className="about">
          <button className="about-btn">About</button>
        </div>
        <div className="mastery">
          <button className="mastery-btn">Mastery</button>
        </div>
      </div>
      <div className="dashboard-signup">
        <button className="login-btn">Log in</button>
        <button className="signup-btn">Sign up</button>
      </div>
    </div>
  );
};
export default Dashboard;
