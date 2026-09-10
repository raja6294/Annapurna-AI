import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  PlusCircle,
  Truck,
  LayoutDashboard,
  Search,
  Gift,
  CheckCircle2,
  History,
  Globe,
  Settings,
  Building2,
  Users,
  Utensils,
  Sparkles,
  Cpu,
  BarChart3,
  ShieldCheck,
  LogOut,
  ArrowRightLeft
} from 'lucide-react';

export const RoleSidebar = ({ role, isCollapsed, onToggleCollapse, currentOrgName, onLogout }) => {
  const location = useLocation();

  const getNavItems = () => {
    switch (role) {
      case 'provider':
        return [
          { label: 'Register Surplus', path: '/provider/register-surplus', icon: PlusCircle, badge: 'AI Scan' },
          { label: 'Pickup & Delivery', path: '/provider/deliveries', icon: Truck, badge: 'Live' },
        ];

      case 'ngo':
        return [
          { label: 'Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
          { label: 'Food Opportunities', path: '/ngo/food-opportunities', icon: Search, badge: 'Live' },
          { label: 'My Accepted Food', path: '/ngo/incoming', icon: Gift },
          { label: 'Pickup / Receiving', path: '/ngo/deliveries', icon: Truck },
          { label: 'Distribution', path: '/ngo/distribution', icon: CheckCircle2 },
          { label: 'History', path: '/ngo/history', icon: History },
          { label: 'Impact', path: '/ngo/impact', icon: Globe },
        ];

      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
          { label: 'Providers', path: '/admin/providers', icon: Building2 },
          { label: 'NGOs', path: '/admin/ngos', icon: Users, badge: 'Audit' },
          { label: 'Food Listings', path: '/admin/food-listings', icon: Utensils },
          { label: 'Offers', path: '/admin/donations', icon: Gift },
          { label: 'Routes & Deliveries', path: '/admin/deliveries', icon: Truck },
          { label: 'AI Monitoring', path: '/admin/ai-monitoring', icon: Sparkles },
          { label: 'Matching Engine', path: '/admin/matching', icon: Cpu },
          { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
          { label: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldCheck },
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-64px)] border-r border-border/80 bg-card/95 backdrop-blur-md flex flex-col justify-between transition-all duration-300 z-30 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 space-y-6 overflow-y-auto custom-scrollbar flex-1">
        {/* Role Header */}
        {!isCollapsed && (
          <div className="px-3 py-3.5 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">
              ANNAPURNA AI
            </span>
            <h4 className="font-display font-bold text-sm text-foreground truncate">
              {role === 'provider'
                ? 'Provider Portal'
                : role === 'ngo'
                ? 'NGO Receiver Portal'
                : 'Admin Governance'}
            </h4>
            <p className="text-[11px] text-spiceGold font-mono truncate mt-0.5">
              {currentOrgName || (role === 'provider' ? 'Taj Grand Kitchens' : role === 'ngo' ? 'Hope Welfare Centre' : 'MoFPI Ops')}
            </p>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1 font-sans">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== `/` && location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-pineCanopy text-spiceGold font-bold shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-spiceGold' : 'text-muted-foreground'}`} />
                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1 truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-md bg-spiceGold/20 text-spiceGold text-[9px] font-mono font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls: Logout & Collapse */}
      <div className="p-3 border-t border-border/80 space-y-2">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-brickUrgency/30 bg-brickUrgency/10 hover:bg-brickUrgency/20 text-xs font-mono font-bold text-brickUrgency transition-all"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span>Logout</span>}
        </button>

        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border bg-background hover:bg-muted text-xs font-mono text-muted-foreground transition-all"
        >
          <ArrowRightLeft className="h-3.5 w-3.5 text-spiceGold" />
          {!isCollapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </aside>
  );
};

export default RoleSidebar;
