import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  KanbanSquare, 
  GraduationCap, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Open Positions', href: '/admin/positions', icon: Briefcase },
  { name: 'Applicants', href: '/admin/applicants', icon: Users },
  { name: 'Recruitment Pipeline', href: '/admin/pipeline', icon: KanbanSquare },
  { name: 'Qualification Standards', href: '#', icon: GraduationCap },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { name: 'Settings', href: '#', icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('session_data');
    navigate('/');
  };

  return (
    <div className="flex flex-col w-64 bg-brand-900 border-r border-brand-800 text-white">
      <div className="flex items-center justify-center h-16 px-4 bg-brand-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-brand-900 font-bold text-lg">IE</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">InsightED SCA</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-brand-800 text-white'
                      : 'text-brand-100 hover:bg-brand-800/50 hover:text-white'
                  }`
                }
              >
                <Icon className="flex-shrink-0 w-5 h-5 mr-3 text-brand-200 group-hover:text-white" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-brand-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-sm font-medium">
              HR
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">HR Admin</p>
              <p className="text-xs text-brand-200">View Profile</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-brand-200 hover:text-white p-2 rounded-md hover:bg-brand-800 transition-colors" title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
