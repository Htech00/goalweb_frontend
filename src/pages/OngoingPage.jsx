import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../assets/pen.png";
import can from "../assets/can.png";
import { toast } from "react-hot-toast";

const OngoingPage = () => {
  const [ongoingGoals, setOngoingGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get or generate userId from localStorage
  const getUserId = () => {
    let userId = localStorage.getItem("goalAppUserId");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("goalAppUserId", userId);
    }
    return userId;
  };

  const fetchOngoingGoals = async () => {
    const userId = getUserId();
    try {
      const response = await fetch(
        `https://goalweb-backend-b094.onrender.com/api/goals/ongoing?userId=${userId}`
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
        `https://goalweb-backend-b094.onrender.com/api/goals/${id}/delete`,
        {
          method: "DELETE",
        }
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
            <path d="M93 50a43 43 0 11-86 0 43 43 0 0186 0z" fill="currentFill" />
          </svg>
          <span className="text-xl sm:text-2xl font-medium">Loading Ongoing Goals...</span>
        </div>
      </div>
    );
  }

  if (ongoingGoals.length === 0) {
    return (
      <div className="px-4 sm:px-8 md:px-16 lg:px-[100px] py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-[36px] text-black">
            Ongoing Goals
          </h2>
          <Link
            to="/newgoal"
            className="no-underline font-montserrat font-semibold text-[18px] sm:text-[20px] text-[#0585cd]"
          >
            + Create New Goals
          </Link>
        </div>
        <div className="text-start px-6 py-8 mt-10 shadow-md rounded-md">
          <p>You don't have any ongoing goals.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-[100px] py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-[36px] text-black">Ongoing</h2>
        <Link
          to="/newgoal"
          className="no-underline font-montserrat font-semibold text-[18px] sm:text-[20px] text-[#0585cd]"
        >
          + Create New Goals
        </Link>
      </div>

      <div className="flex flex-col gap-10 mt-10">
        {ongoingGoals.map(({ title, description, progress, _id }) => (
          <div
            key={_id}
            className="text-start px-6 py-8 shadow-md rounded-md flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-montserrat font-semibold text-xl sm:text-2xl text-black break-words">
                {title.toUpperCase()}
              </h3>
              <h4 className="font-montserrat font-semibold text-base sm:text-lg text-[#0585cd]">
                In Progress
              </h4>
              <p className="font-montserrat font-normal text-base sm:text-lg text-black/80 leading-relaxed break-words">
                {description}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Progress Bar */}
              <div className="w-full max-w-md flex flex-col gap-2">
                <div className="flex justify-between text-sm text-black/80">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-[#d9d9d9] h-[12px] rounded-[10px]">
                  <div
                    className="h-[12px] rounded-[10px]"
                    style={{
                      width: `${progress}%`,
                      backgroundColor:
                        progress < 50 ? "#ff0000cc" : progress < 70 ? "#fcca03" : "#339933",
                    }}
                  ></div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/progress/${_id}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#0585cd] text-white font-semibold text-base sm:text-lg hover:bg-[#0560a0] transition"
                >
                  <img src={pen} alt="Update" className="w-5 h-5" />
                  Update Progress
                </Link>
                <button
                  onClick={() => handleDelete(_id)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[#0585cd] text-[#0585cd] font-semibold text-base sm:text-lg hover:bg-[#f0faff] transition cursor-pointer"
                >
                  <img src={can} alt="Delete" className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingPage;
