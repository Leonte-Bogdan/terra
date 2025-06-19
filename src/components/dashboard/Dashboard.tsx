import "./Dashboard.scss";
import { Routes, Route, Link } from "react-router";
import { useState } from "react";
import GardenModal from "./modals/GardenModal";

const Dashboard = ({ children }) => {
  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <nav>
          <Link to="/garden">
            <button
              onClick={() => setIsGardenModalOpen(true)}
              className="garden-btn"
            >
              Garden
            </button>
            <GardenModal
              isOpen={isGardenModalOpen}
              onClose={() => setIsGardenModalOpen(false)}
            />
          </Link>
          <Link to="/terrarium">
            <button className="terrarium-btn">Terrarium</button>
          </Link>
          <Link to="/about">
            <button className="about-btn">About</button>
          </Link>
          <Link to="/mastery">
            <button className="mastery-btn">Mastery</button>
          </Link>
        </nav>

        <Routes>
          <Route path="/garden" element={<div>Garden Content</div>} />
          <Route path="/terrarium" element={<div>Terrarium Content</div>} />
          <Route path="/about" element={<div>About Content</div>} />
          <Route path="/mastery" element={<div>Mastery Content</div>} />
          <Route path="/" element={children} />
        </Routes>
      </div>
      <div className="dashboard-signup">
        <button className="login-btn">Log in</button>
        <button className="signup-btn">Sign up</button>
      </div>
    </div>
  );
};

export default Dashboard;
