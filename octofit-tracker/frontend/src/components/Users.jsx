import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

const extractItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }
        const payload = await response.json();
        setUsers(extractItems(payload));
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Users</h2>
        <span className="text-muted">{users.length} records</span>
      </div>

      {loading && <div className="alert alert-light">Loading users…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className="alert alert-light">No users found.</div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6" key={user._id || user.email || user.name}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 mb-2">{user.name || 'Unnamed user'}</h3>
                  <p className="mb-1"><strong>Email:</strong> {user.email || '—'}</p>
                  <p className="mb-1"><strong>Fitness level:</strong> {user.fitnessLevel || '—'}</p>
                  <p className="mb-0"><strong>Goals:</strong> {Array.isArray(user.goals) ? user.goals.join(', ') : user.goals || '—'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Users;
