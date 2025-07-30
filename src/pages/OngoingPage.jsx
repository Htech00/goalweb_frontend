import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../assets/pen.png";
import can from "../assets/can.png";
import { toast } from "react-hot-toast";

const OngoingPage = () => {
  const [ongoingGoals, setOngoingGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOngoingGoals = async () => {
    try {
      const response = await fetch(
        "https://goalweb-backend-xt0f.onrender.com/api/goals/ongoing"
      );
      const data = await response.json();
      setOngoingGoals(data);
    } catch (error) {
      console.error("Error fetching ongoing goals:", error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://goalweb-backend-xt0f.onrender.com/api/goals/${id}/delete`,
        { method: "DELETE" }
      );
      toast.success("Goal Deleted Successfully!", { duration: 5000 });
      fetchOngoingGoals();
    } catch (error) {
      toast.error("Failed to delete goal", { duration: 5000 });
      console.error("Failed to delete goal:", error);
    }
  };

  useEffect(() => {
    fetchOngoingGoals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div role="status" className="flex items-center gap-5">
          <svg
            className="w-10 h-10 text-gray-200 animate-spin fill-[#0585cd]"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="10" />
            <path
              d="M93 50a43 43 0 11-86 0 43 43 0 0186 0z"
              fill="currentFill"
            />
          </svg>
          <span className="text-xl sm:text-2xl font-medium">Loading Ongoing Goals...</span>
        </div>
      </div>
    );
  }

  if (ongoingGoals.length === 0) {
    return (
      <div className="mx-[100px] my-[32px]">
        <div className="flex items-center justify-between">
          <h2 className="font-montserrat font-bold text-[36px] text-black m-0">
            Ongoing Goals
          </h2>
          <Link
            to="/newgoal"
            className="no-underline font-montserrat font-semibold text-[20px] text-[#0585cd] cursor-pointer"
          >
            + Create New Goals
          </Link>
        </div>
        <div className="text-start px-[35px] my-[50px] pt-[24px] pb-[50px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex flex-col gap-[35px]">
          <p>You don't have any Ongoing goals</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-[100px] my-[32px]">
      <div className="flex items-center justify-between">
        <h2 className="font-montserrat font-bold text-[36px] text-black m-0">Ongoing</h2>
        <Link
          to="/newgoal"
          className="no-underline font-montserrat font-semibold text-[20px] text-[#0585cd] cursor-pointer"
        >
          + Create New Goals
        </Link>
      </div>

      {ongoingGoals.map(({ title, description, progress, _id }) => (
        <div className="mt-[40px] flex flex-col gap-[60px]" key={_id}>
          <div className="text-start px-[35px] pt-[24px] pb-[50px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex flex-col gap-[35px]">
            <div className="flex flex-col gap-[12px]">
              <h3 className="font-montserrat font-semibold text-[28px] text-black m-0 break-words">
                {title.toUpperCase()}
              </h3>
              <h4 className="font-montserrat font-semibold text-[20px] text-[#0585cd] m-0">
                In Progress
              </h4>
              <p className="font-montserrat font-normal text-[20px] leading-[24.38px] text-black/80 m-0 break-words">
                {description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-[368px] flex flex-col items-start gap-[12px]">
                <div className="flex justify-between w-full items-start">
                  <p className="font-montserrat font-normal text-[16px] text-black/80 m-0">Progress</p>
                  <p className="font-montserrat font-normal text-[16px] text-black/80 m-0">{progress}%</p>
                </div>
                <div className="w-full bg-[#d9d9d9] h-[12px] rounded-[10px]">
                  <div
                    className="h-[12px] rounded-[10px]"
                    style={{
                      width: `${progress}%`,
                      backgroundColor:
                        progress < 50 ? "#ff0000cc" : progress < 70 ? "#fcca03" : "#339933",
                    }}
                  />
                </div>
              </div>

              <div className="w-fit flex gap-[100px] cursor-pointer">
                <Link
                  to={`/progress/${_id}`}
                  className="no-underline flex items-center justify-center gap-[10px] rounded-[10px] p-[16px] bg-[#0585cd] cursor-pointer"
                >
                  <img src={pen} alt="Update icon" />
                  <p className="font-montserrat font-semibold text-[20px] text-white m-0">
                    Update Progress
                  </p>
                </Link>

                <button
                  onClick={() => handleDelete(_id)}
                  className="no-underline flex items-center justify-center gap-[10px] rounded-[10px] p-[16px] bg-white border border-[#0585cd] cursor-pointer"
                >
                  <img src={can} alt="Delete icon" />
                  <p className="font-montserrat font-semibold text-[20px] text-[#0585cd] m-0">Delete</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OngoingPage;
