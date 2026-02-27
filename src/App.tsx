import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { TopBar } from './components/layout/TopBar'
import { DashboardGrid } from './components/dashboard/DashboardGrid'
import { DataTable } from './components/contracts/DataTable'
import { EntityGraph } from './components/graph/EntityGraph'
import { EntityLookup } from './components/entities/EntityLookup'
import { GeoMap } from './components/graph/GeoMap'
import { ReactFlowProvider } from '@xyflow/react'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [globalQuery, setGlobalQuery] = useState('');

  const handleLogin = (username: string) => {
    // In a real app we'd verify with backend.
    setIsAuthenticated(true);
    console.log(`User ${username} securely logged in.`);
  };

  const handleGlobalSearch = (query: string) => {
    setGlobalQuery(query);
    setCurrentView('subjekty');
    window.location.hash = '#subjekty';
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardGrid onSearch={handleGlobalSearch} />;
      case 'zmluvy': return <DataTable />;
      case 'subjekty': return <EntityLookup initialQuery={globalQuery} />;
      case 'analyza': return <ReactFlowProvider><EntityGraph /></ReactFlowProvider>;
      case 'mapa': return <GeoMap />;
      default: return <DashboardGrid onSearch={handleGlobalSearch} />;
    }
  };

  return (
    <div className="app-shell">
      {isAuthenticated ? (
        <div className="main-content">
          <TopBar currentView={currentView} onNavigate={setCurrentView} />
          <main className="content-area pt-no-padding">
            {renderContent()}
          </main>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--pt-color-bg-base)', height: '100%', width: '100%' }}>
          <header className="app-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ color: 'var(--pt-color-text-base)' }}>Secure System Entry</h1>
            <p style={{ color: 'var(--pt-color-text-muted)' }}>Please authenticate to continue (Mock data: Any input works)</p>
          </header>
          <LoginForm onSubmit={handleLogin} />
        </div>
      )}
    </div>
  )
}

export default App
