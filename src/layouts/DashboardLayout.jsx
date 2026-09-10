import React, { useState } from 'react';
import { PortalHeader } from '../components/PortalHeader';
import { RoleSidebar } from '../components/RoleSidebar';

export const DashboardLayout = ({ currentUser, onLogout, role, children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [adminViewMode, setAdminViewMode] = useState('admin');

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const activeRole = role || currentUser?.role || 'provider';

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col selection:bg-spiceGold selection:text-pineCanopy">
      {/* Sticky Header with Role Badge */}
      <PortalHeader
        currentUser={currentUser}
        onLogout={onLogout}
        isDark={isDark}
        toggleTheme={toggleTheme}
        adminViewMode={adminViewMode}
        setAdminViewMode={setAdminViewMode}
      />

      {/* Sidebar + Main Content Layout */}
      <div className="flex flex-1 relative">
        <RoleSidebar
          role={activeRole}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          currentOrgName={currentUser?.name}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-x-hidden min-h-[calc(100vh-80px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
