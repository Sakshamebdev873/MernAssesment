import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // ✅ Correct import
import customFetch from '../utils/customFetch';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Navbar = () => {
    const navigate = useNavigate();

    // Snackbar State
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    // Logout Function
    const logout = async () => {
        try {
            await customFetch.get('/logout');
            navigate('/');

            // ✅ Show Snackbar for logout confirmation
            setSnackbarMessage("✅ Admin successfully logged out.");
            setAlertSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("❗ Error during logout:", error);

            // ✅ Show Snackbar for logout failure
            setSnackbarMessage("❌ Failed to log out. Please try again.");
            setAlertSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const { pathname } = useLocation();

    return (
        <>
            <div className='min-h-[15vh] bg-red-400 shadow-xl rounded-b-2xl w-full px-4 flex items-center justify-between'>
                <div className='text-4xl leading-[24px] flex flex-col gap-2.5 text-white tracking-tighter'>
                    <h1>Coupon</h1>
                    <h1>Claimer</h1>
                </div>

                {pathname !== '/guest' && pathname !=='/' ? (
                    <div
                        onClick={logout}
                        className='px-6 py-2 rounded-2xl bg-white text-red-400 hover:bg-red-400 hover:border-white transition-all ease-in duration-500 hover:text-white border border-red-400 text-xl cursor-pointer'
                    >
                        Logout
                    </div>
                ) : (
                    <Link
                        to='/login'
                        className='px-6 py-2 rounded-2xl bg-white text-red-400 hover:bg-red-400 hover:border-white transition-all ease-in duration-500 hover:text-white border border-red-400 text-xl'
                    >
                        Login
                    </Link>
                )}
            </div>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <MuiAlert 
                    onClose={() => setSnackbarOpen(false)} 
                    severity={alertSeverity}
                    elevation={6}
                    variant="filled"
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default Navbar;
