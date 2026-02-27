import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Sidebar } from './components/layout/Sidebar'
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

  const handleLogin = (username: string) => {
    // In a real app we'd verify with backend.
    setIsAuthenticated(true);
    console.log(`User ${username} securely logged in.`);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardGrid />;
      case 'zmluvy': return <DataTable />;
      case 'subjekty': return <EntityLookup />;
      case 'analyza': return <ReactFlowProvider><EntityGraph /></ReactFlowProvider>;
      case 'mapa': return <GeoMap />;
      default: return <DashboardGrid />;
    }
  };

  return (
    <div className="app-shell">
      {isAuthenticated ? (
        <>
          <Sidebar currentView={currentView} onNavigate={setCurrentView} />
          <div className="main-content">
            <TopBar />
            <main className="content-area pt-no-padding">
              {renderContent()}
            </main>
          </div>
        </>
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
