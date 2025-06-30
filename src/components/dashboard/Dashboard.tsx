import "./Dashboard.scss";
import { Routes, Route, Link } from "react-router";
import { useState } from "react";
import GardenModal from "./modals/GardenModal";
import AboutModal from "./modals/AboutModal";

const Dashboard = ({ children }) => {
  const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <nav>
          <Link to="/garden">
            <button
              onClick={() => setIsGardenModalOpen(true)}
              className="nature-btn sun small"
            >
              Garden
            </button>
            <GardenModal
              isOpen={isGardenModalOpen}
              onClose={() => setIsGardenModalOpen(false)}
            />
          </Link>
          <Link to="/terrarium">
            <button className="nature-btn leaf small">Terrarium</button>
          </Link>
          <Link to="/about">
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="nature-btn flower small"
            >
              About
            </button>
            <AboutModal
              isOpen={isAboutModalOpen}
              onClose={() => setIsAboutModalOpen(false)}
            />
          </Link>
          <Link to="/mastery">
            <button className="nature-btn garden small">Mastery</button>
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
        <button className="login-btn nature-btn small">Log in</button>
        <button className="signup-btn nature-btn small">Sign up</button>
      </div>
    </div>
  );
};

export default Dashboard;
