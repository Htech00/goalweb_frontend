import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../assets/pen.png";
import can from "../assets/can.png";
import { toast } from "react-hot-toast";

const AllGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const res = await fetch("https://goalweb-backend-b094.onrender.com/api/goals/all");
      const data = await res.json();
      setGoals(data);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://goalweb-backend-b094.onrender.com/api/goals/${id}/delete`, {
        method: "DELETE",
      });
      fetchGoals();
      toast.success("Goal Deleted Successfully!", { duration: 5000 });
    } catch (error) {
      toast.error("Failed to delete goal", { duration: 5000 });
      console.error("Delete error:", error);
    }
  };

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
          <span className="text-xl sm:text-2xl font-medium">Loading All Goals...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-10 lg:px-[100px] my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-[36px] text-black m-0">
          All Goals
        </h2>
        <Link
          to="/newgoal"
          className="font-montserrat font-semibold text-lg sm:text-[20px] text-[#0585cd] cursor-pointer no-underline"
        >
          + Create New Goals
        </Link>
      </div>

      <div className="mt-10 flex flex-col gap-14">
        {goals.length === 0 ? (
          <div className="text-start p-6 shadow-md flex flex-col gap-6 mt-10">
            <p>You don't have any Goals yet</p>
          </div>
        ) : (
          goals.map(({ title, description, progress, _id }) => (
            <div
              key={_id}
              className="text-start px-4 sm:px-6 lg:px-[35px] pt-6 pb-12 shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3">
                {progress === 100 && (
                  <h4 className="font-montserrat font-semibold text-base sm:text-lg text-[#0585cd] m-0">
                    🎉 Congratulations! You have completed this Goal
                  </h4>
                )}
                <h3 className="font-montserrat font-semibold text-xl sm:text-2xl lg:text-[28px] text-black m-0 break-words">
                  {title.toUpperCase()}
                </h3>
                <p className="font-montserrat font-normal text-base sm:text-[20px] leading-snug text-black/80 m-0 break-words">
                  {description}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="w-full max-w-[368px] flex flex-col items-start gap-3">
                  <div className="flex justify-between w-full">
                    <p className="font-montserrat text-sm sm:text-[16px] text-black/80 m-0">Progress</p>
                    <p className="font-montserrat text-sm sm:text-[16px] text-black/80 m-0">{progress}%</p>
                  </div>
                  <div className="w-full bg-[#d9d9d9] h-3 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor:
                          progress < 50
                            ? "#ff0000cc"
                            : progress < 70
                            ? "#fcca03"
                            : "#339933",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/progress/${_id}`}
                    className="no-underline flex items-center justify-center gap-2 rounded-[10px] p-4 bg-[#0585cd] text-white text-base font-semibold font-montserrat hover:bg-[#036ab3] transition"
                    aria-label="Edit goal"
                  >
                    <img src={pen} alt="Edit Icon" className="w-5 h-5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="no-underline flex items-center justify-center gap-2 rounded-[10px] p-4 bg-white border border-[#0585cd] text-[#0585cd] text-base font-semibold font-montserrat hover:bg-[#e6f4fb] transition"
                    aria-label="Delete goal"
                  >
                    <img src={can} alt="Delete Icon" className="w-5 h-5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllGoals;
