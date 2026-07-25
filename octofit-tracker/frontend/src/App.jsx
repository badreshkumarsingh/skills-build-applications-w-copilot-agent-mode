import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                  <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
                  <h1 className="display-6 fw-bold mb-2">Multi-tier fitness dashboard</h1>
                  <p className="text-muted mb-0">
                    Browse users, teams, activities, leaderboard entries, and workouts from the
                    Express + MongoDB backend.
                  </p>
                </div>
                <div className="text-start text-lg-end">
                  <div className="badge bg-primary-subtle text-primary-emphasis mb-2">React 19 + Vite</div>
                  <div className="small text-muted">
                    {codespaceName
                      ? `Codespaces URL: https://${codespaceName}-8000.app.github.dev`
                      : 'Set VITE_CODESPACE_NAME in .env.local for Codespaces URLs. Without it, the app falls back to localhost.'}
                  </div>
                </div>
              </div>

              <nav className="nav nav-pills flex-wrap mb-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-link me-2 mb-2 ${isActive ? 'active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
