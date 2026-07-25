function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold mb-3">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Modern fitness tracking for teams and solo athletes</h1>
              <p className="lead text-muted mb-4">
                This multi-tier app now includes a React 19 frontend, an Express + TypeScript API,
                and MongoDB-ready data access via Mongoose.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary">React 19 + Vite</span>
                <span className="badge bg-success">Express + TypeScript</span>
                <span className="badge bg-secondary">MongoDB + Mongoose</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
