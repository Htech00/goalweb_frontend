import React, { useEffect, useState } from "react";
import ladda from "../assets/amico.png";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProgressPage = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState({});
  const [newProgress, setNewProgress] = useState("");
  const navigate = useNavigate();

  const fetchGoalById = async () => {
    try {
      const fetchEachGoal = await fetch(
        `https://goalweb-backend-b094.onrender.com/api/goals/${id}`
      );

      if (fetchEachGoal.ok) {
        const fetchedGoal = await fetchEachGoal.json();
        setGoal(fetchedGoal);
        setNewProgress(fetchedGoal.progress);
      } else {
        toast.error("Goal not found", { duration: 5000 });
        console.error("Goal not found");
      }
    } catch (error) {
      toast.error("Error fetching goal", { duration: 5000 });
      console.error("Error fetching goal", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const patchedGoal = await fetch(
        `https://goalweb-backend-b094.onrender.com/api/goals/${id}/progress`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ progress: Number(newProgress) }),
        }
      );
      if (patchedGoal.ok) {
        toast.success("Progress Updated Successfully!", { duration: 5000 });
        navigate("/allgoals");
      } else {
        console.error("Failed to update progress");
        toast.error("Failed to update progress", { duration: 5000 });
      }
    } catch (error) {
      toast.error("Failed to update progress", { duration: 5000 });
      console.error("Error updating progress", error);
    }
  };

  useEffect(() => {
    fetchGoalById();
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-16 my-12 px-4 sm:px-6 md:px-12 lg:px-24">
      
      {/* Image section */}
      <div className="w-full md:w-1/2 lg:max-w-[400px] flex justify-center md:justify-start mb-8 md:mb-0">
        <img
          src={ladda}
          alt="Progress Illustration"
          className="w-full max-w-[350px] h-auto object-contain"
        />
      </div>

      {/* Form section */}
      <form
        className="w-full md:w-1/2 lg:max-w-[600px] text-left"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
          Progress
        </h2>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm md:text-base text-black/70 mb-1">Goal Title</h4>
            <p className="text-base font-semibold text-black break-words">
              {goal.title}
            </p>
          </div>
          <div>
            <h4 className="text-sm md:text-base text-black/70 mb-1">Goal Description</h4>
            <p className="text-base text-black leading-relaxed break-words">
              {goal.description}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-[#0585cd29] p-6 md:p-10 lg:p-12 rounded-md space-y-8">
          <input
            type="number"
            min="0"
            max="100"
            value={newProgress}
            onChange={(e) => setNewProgress(e.target.value)}
            placeholder="Goal Progress"
            className="w-full max-w-xs px-4 py-3 rounded-md border border-[#0585cd] bg-[#0585cd05] placeholder:text-black/70 focus:outline-none focus:ring-2 focus:ring-[#0585cd]"
          />

          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-sm text-black/80">
              <span>Progress</span>
              <span>{goal.progress}%</span>
            </div>
            <div className="w-full h-3 bg-[#d9d9d9] rounded-full">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${goal.progress}%`,
                  backgroundColor:
                    goal.progress < 50
                      ? "#ff0000cc"
                      : goal.progress < 70
                      ? "#fcca03"
                      : "#339933",
                }}
              ></div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full max-w-xs bg-[#0585cd] hover:bg-[#0560a0] transition px-6 py-3 text-white text-lg font-semibold rounded-md cursor-pointer"
          >
            Update Progress
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgressPage;
