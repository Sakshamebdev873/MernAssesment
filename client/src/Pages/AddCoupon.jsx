import React from "react";
import {
  Form,
  redirect,
  useNavigation,
  useParams,
  useLoaderData,
} from "react-router-dom";
import customFetch from "../utils/customFetch";

// Action for updating the coupon
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post(`/add`, data);
    return redirect("/dashboard");
  } catch (error) {
    console.error("❗ Error updating coupon:", error);
  }
};
const AddCoupon = () => {
  // const { id } = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // ✅ Load coupon data for pre-filling
  // const coupon = useLoaderData();

  return (
    <>
        <h1 className="text-[24px] mt-4 text-center leading-[24px] text-black  " >****It's user choice they can enter code if they want otherwise it is auto generated****</h1>
    <div className="flex items-center justify-center mt-8">
      <div className="h-[50vh] rounded-2xl flex justify-center items-center gap-8 w-[90vw] bg-gray-200  ">
        <Form
          method="post"
          className="flex items-center justify-between gap-8 px-28"
        >
          {/* Status Field */}
          <div className="mt-8">
            <h1 className="text-xl leading-[20px]">Status</h1>
            <select
              name="status"
              id="status"
              className="w-[20vw] h-[25px] mt-4 rounded-[10px] bg-white"
             // ✅ Pre-filled value
            >
              <option value="available">Available</option>
              <option value="claimed">Claimed</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          {/* Discount Field */}
          <div className="mt-8">
            <h1 className="text-xl leading-[20px]">Discount/Save</h1>
            <input
              type="text"
              name="title"
              id="title"
          // ✅ Pre-filled value
              className="w-[20vw] h-[25px] mt-4 rounded-[10px] bg-white"
            />
          </div>

          {/* Coupon Code Field */}
          <div className="mt-8">
            <h1 className="text-xl leading-[20px]">Coupon Code</h1>
            <input
              type="text"
              name="code"
              id="code"
               // ✅ Pre-filled value
              placeholder="Code"
              className="w-[20vw] h-[25px] mt-4 rounded-[10px] bg-white"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="px-4 py-2 mt-8 text-red-400 text-[20px] font-medium rounded-[10px] border"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      </div>
    </div>
    </>
  );
};

export default AddCoupon;
