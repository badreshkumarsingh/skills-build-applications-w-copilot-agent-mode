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

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }
        const payload = await response.json();
        setEntries(extractItems(payload));
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Leaderboard</h2>
        <span className="text-muted">{entries.length} entries</span>
      </div>

      {loading && <div className="alert alert-light">Loading leaderboard…</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && entries.length === 0 && <div className="alert alert-light">No leaderboard entries found.</div>}

      {!loading && !error && entries.length > 0 && (
        <div className="row g-3">
          {entries.map((entry) => (
            <div className="col-md-6" key={entry._id || entry.userId || entry.userName}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 mb-2">{entry.userName || 'Unknown user'}</h3>
                  <p className="mb-1"><strong>Score:</strong> {entry.score || 0}</p>
                  <p className="mb-0"><strong>Streak:</strong> {entry.streak || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
