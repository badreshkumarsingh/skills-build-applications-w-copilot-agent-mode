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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }
        const payload = await response.json();
        setActivities(extractItems(payload));
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Activities</h2>
        <span className="text-muted">{activities.length} records</span>
      </div>

      {loading && <div className="alert alert-light">Loading activities…</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && activities.length === 0 && <div className="alert alert-light">No activities found.</div>}

      {!loading && !error && activities.length > 0 && (
        <div className="row g-3">
          {activities.map((activity) => (
            <div className="col-md-6" key={activity._id || activity.type || activity.userId}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 mb-2">{activity.type || 'Activity'}</h3>
                  <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes || '—'} min</p>
                  <p className="mb-1"><strong>Distance:</strong> {activity.distanceKm || '—'} km</p>
                  <p className="mb-0"><strong>User ID:</strong> {activity.userId || '—'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Activities;
