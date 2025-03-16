import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import customFetch from "../utils/customFetch";
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/coupons");
    const { coupon } = data;
    // console.log(coupon);
    return coupon;
  } catch (error) {
    console.log(error);
  }
};
const AdminDahboard = () => {
  const initialCoupons = useLoaderData();
  const [coupons, setCoupons] = useState([]); // ✅ Use state for reactivity

  // ✅ Corrected Data Fetching with Polling Logic
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await customFetch.get("/coupons");
        setCoupons(data.coupon);
      } catch (error) {
        console.error("❗ Failed to fetch updated coupons: ", error);
      }
    };
    console.log(initialCoupons);
    const interval = setInterval(fetchCoupons, 5000); // ✅ Polling every 5 seconds
    return () => clearInterval(interval); // ✅ Cleanup on unmount
  }, []); // ✅ Removed `coupon` from dependency array to prevent infinite loop

  const handleDelete = async (id) => {
    try {
      await customFetch.delete(`/delete/${id}`);
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon._id !== id)
      );
      console.log("✅ Coupon deleted successfully.");
    } catch (error) {
      console.error("❗ Failed to delete coupon:", error);
    }
  };
  return (
    <>
      <h1 className="text-5xl leading-[24px] font-medium text-black text-center mt-16 ">
        Admin Panel
      </h1>

      <div className="mt-12 flex items-center justify-center gap-6 ">
        <Link
          to="/add"
          className="px-6 py-2 rounded-2xl bg-white text-red-400 hover:bg-red-400 hover:border-white transition-all ease-in duration-500 hover:text-white border border-red-400 text-xl"
        >
          Add Coupon
        </Link>

        <Link
          to="/ip"
          className="px-6 py-2 rounded-2xl bg-white text-red-400 hover:bg-red-400 hover:border-white transition-all ease-in duration-500 hover:text-white border border-red-400 text-xl"
        >
          Show Claimed user Ip Address
        </Link>
      </div>
      <div className="flex flex-col gap-8  mt-12 justify-center items-center">
        {coupons.length > 0 ? (
          coupons.map((item, index) => {
            const { _id, status, title } = item;
            return (
              <div
                key={index}
                className="flex items-center px-12 py-4 justify-between rounded-2xl bg-gray-100 w-[80vw] h-[20vh] "
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1710147459819-eb44124ee66f?q=80&w=1470"
                  className="w-[150px] h-[100px] rounded-2xl"
                  alt="#"
                />
                <div className="flex flex-col items-center justify-center gap-4 ">
                  <h1>Status :{status}</h1>
                  <h1>Title :{title}</h1>
                  <div className="flex justify-between gap-4 items-center  ">
                    <Link
                      to={`/edit/${_id}`}
                      className="px-2 py-2 rounded-2xl bg-white text-red-400 hover:bg-red-400 hover:border-white transition-all ease-in duration-500 hover:text-white border border-red-400 text-xl"
                    >
                      Edit Coupon
                    </Link>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="px-2 py-2 rounded-2xl bg-white text-red-400 hover:bg-red-400 hover:border-white transition-all ease-in duration-500 hover:text-white border border-red-400 text-xl"
                    >
                      Delete Coupon
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-[18px] leading-[25px] text-black ">
            <p>Please wait.....</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDahboard;
