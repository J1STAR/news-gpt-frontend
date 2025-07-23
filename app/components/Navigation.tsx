import { NavLink } from '@remix-run/react';

export default function Navigation() {
  return (
    <nav className="navigation-bar">
      <div className="nav-tab-item">
        <NavLink to="/" className={({ isActive }) => "nav-tab" + (isActive ? " active" : "")}>
          트렌드
        </NavLink>
      </div>
      
      <div className="nav-tab-item">
        <NavLink to="/analysis" className={({ isActive }) => "nav-tab" + (isActive ? " active" : "")}>
          산업 분석
        </NavLink>
      </div>
    </nav>
  );
} 