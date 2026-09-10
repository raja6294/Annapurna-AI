import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export const ProtectedRoute = ({ currentUser, allowedRoles, children }) => {
  const location = useLocation();

  // 1. Not Authenticated -> Redirect to landing page / role selection
  if (!currentUser || !currentUser.role) {
    return <Navigate to="/" state={{ from: location, authRequired: true }} replace />;
  }

  const userRole = currentUser.role.toLowerCase();

  // 2. Admin Has Elevated Access to all environments
  if (userRole === 'admin') {
    return children;
  }

  // 3. Strict Role-Based Access Check
  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full premium-card p-8 text-center space-y-6 border-2 border-brickUrgency/40 shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brickUrgency/10 text-brickUrgency mx-auto ring-4 ring-brickUrgency/20">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <div>
            <span className="font-mono text-xs text-brickUrgency font-bold uppercase tracking-wider block mb-1">
              Security Gate Protocol
            </span>
            <h1 className="text-3xl font-display font-bold text-foreground">
              403 — Access Denied
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-2 leading-relaxed">
              Your active role (<strong className="text-foreground uppercase">{userRole}</strong>) is not authorized to access <code className="text-spiceGold bg-muted px-1.5 py-0.5 rounded">{location.pathname}</code>.
            </p>
          </div>

          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <Link
              to={userRole === 'provider' ? '/provider/register-surplus' : userRole === 'ngo' ? '/ngo/dashboard' : '/admin/dashboard'}
              className="btn-primary-gold w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to {userRole.toUpperCase()} Portal</span>
            </Link>

            <Link
              to="/"
              className="py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground text-xs font-mono font-bold"
            >
              Switch Role Gateway
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
