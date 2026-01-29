import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/products" className="navbar-brand">
                    Product Management
                </Link>

                <div className="navbar-menu">
                    <Link to="/products" className="nav-link">Products</Link>
                    {isAdmin && (
                        <Link to="/admin" className="nav-link">User Management</Link>
                    )}

                    <div className="user-info">
                        <span className="username">{user?.username}</span>
                        <span className={`role-badge ${user?.role}`}>{user?.role}</span>
                        <button onClick={handleLogout} className="btn-logout">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
