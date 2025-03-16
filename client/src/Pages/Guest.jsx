import React, { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const loader = async () => {
    try {
        const { data } = await customFetch.get("/coupons");
        return data;
    } catch (error) {
        console.log(error);
        return { error: "Failed to fetch coupons" };
    }
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Guest = () => {
    const data = useLoaderData();
    const [coupons, setCoupons] = useState(data?.coupon || []);
    
    const sortedCoupons = [...coupons].sort((a, b) => {
        if (a.status === "available" && b.status === "claimed") return -1;
        if (a.status === "claimed" && b.status === "available") return 1;
        return 0;
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    // ✅ Polling Mechanism for Real-Time Updates
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const { data } = await customFetch.get("/coupons");
                setCoupons(data.coupon || []);
            } catch (error) {
                console.error("❗ Failed to fetch updated coupons: ", error);
            }
        };

        const interval = setInterval(fetchCoupons, 5000); 
        return () => clearInterval(interval); 
    }, []);

    // ✅ Corrected handleClaim Logic with Immediate State Update
    const handleClaim = async (code) => {
        try {
            const response = await customFetch.get(`/claim/${code}`);

            if (response.data.success) {
                setSnackbarMessage(response.data.success);
                setAlertSeverity("success");

                // ✅ Refresh the coupons after successful claim
                const updatedData = await customFetch.get("/coupons");
                setCoupons(updatedData.data.coupon || []);
            }

            setSnackbarOpen(true);
        } catch (err) {
            console.error("❗ Please wait a few minutes more", err);
            setSnackbarMessage("❌ Please wait 10 minutes....");
            setAlertSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = (_, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    return (
        <>
            <h1 className="text-4xl font-medium text-center mt-12 leading-[20px] text-red-400">
                Welcome Claim Free Coupon !!
            </h1>
<h1 className="text-2xl leading-[24px] text-black text-center mt-8 " >****After claiming coupon once time user can take it after 10 minutes****</h1>
            <div className="mt-8 flex items-center flex-col gap-8 justify-center">
                {sortedCoupons.map((item, index) => {
                    const { _id, code, title, status } = item;

                    return (
                        <div
                            key={index}
                            className={`w-[80vw] h-[20vh] rounded-2xl shadow-2xl px-20 flex items-center justify-between ${
                                status === "claimed" ? "bg-gray-300" : "bg-gray-100"
                            }`}
                        >
                            <img
                                src="https://plus.unsplash.com/premium_photo-1710147459819-eb44124ee66f?q=80&w=1470"
                                alt="Coupon"
                                className="w-[150px] h-[100px] rounded-2xl"
                            />

                            <div className="flex flex-col gap-2.5 font-medium text-[15px] leading-[20px] capitalize">
                                <h1 className="lowercase">Code: {code}</h1>
                                <h1>Save/Discount: {title}</h1>
                                <h1
                                    className={status === "claimed" ? "text-red-500" : "text-green-500"}
                                >
                                    Status: {status}
                                </h1>

                                <button
                                    type="button"
                                    onClick={() => handleClaim(_id)}
                                    className={`px-4 py-2 text-white rounded transition-all ${
                                        status === "claimed"
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-red-400 hover:bg-white hover:text-red-400"
                                    }`}
                                    disabled={status === "claimed"}
                                >
                                    {status === "claimed" ? "Claimed" : "Claim Coupon"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Guest;
