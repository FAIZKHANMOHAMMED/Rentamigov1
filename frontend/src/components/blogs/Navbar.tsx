import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, PenSquare, LogIn, LogOut } from 'lucide-react';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<string | null>(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            setUser(sessionStorage.getItem('user'));
        };

        // Listen for storage changes in case user logs in/out in another tab
        window.addEventListener('storage', checkUser);
        
        return () => {
            window.removeEventListener('storage', checkUser);
        };
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setUser(null);
        toast.success("Logged out successfully");
        navigate('/blogs');
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-black">Rentamigo</span>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <Link to="/" className="px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 rounded-md flex items-center">
                            <Home className="h-5 w-5 mr-1" />
                            Home
                        </Link>
                        <Link to={user ? "/Blogs/create" : "/login"} className="px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 rounded-md flex items-center">
                            <PenSquare className="h-5 w-5 mr-1" />
                            Create a blog
                        </Link>
                        {user ? (
                            <>
                                <Link to='/Blogs/Dashboard' className="ml-3 px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md flex items-center">
                                    <LogIn className="h-5 w-5 mr-1" />
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="ml-3 px-4 py-2 text-sm font-medium text-red-500 hover:bg-gray-100 rounded-md flex items-center">
                                    <LogOut className="h-5 w-5 mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="ml-3 px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md flex items-center">
                                <LogIn className="h-5 w-5 mr-1" />
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="px-4 py-2 flex flex-col space-y-2">
                        <Link to="/" className="px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 rounded-md flex items-center justify-center">
                            <Home className="h-5 w-5 mr-1" />
                            Home
                        </Link>
                        <Link to={user ? "/Blogs/create" : "/login"} className="px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 rounded-md flex items-center justify-center">
                            <PenSquare className="h-5 w-5 mr-1" />
                            Create a blog
                        </Link>
                        {user ? (
                            <>
                                <Link to='/Blogs/Dashboard' className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md flex items-center justify-center">
                                    <LogIn className="h-5 w-5 mr-1" />
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-gray-100 rounded-md flex items-center justify-center">
                                    <LogOut className="h-5 w-5 mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md flex items-center justify-center">
                                <LogIn className="h-5 w-5 mr-1" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
