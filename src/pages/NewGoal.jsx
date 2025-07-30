import React, { useState } from "react";
import ladda from "../assets/amico.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const NewGoal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newGoal = { title, description, progress: Number(progress) };

    try {
      const postNewGoal = await fetch(
        "https://goalweb-backend-xt0f.onrender.com/api/goals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGoal),
        }
      );

      if (postNewGoal.ok) {
        toast.success("Goal Added Successfully!", { duration: 5000 });
        navigate("/allgoals");
      } else {
        toast.error("Failed to post goal", { duration: 5000 });
        console.error("Failed to post goal");
      }
    } catch (error) {
      toast.error("Failed to post goal", { duration: 5000 });
      console.error("Error creating goal", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 my-12 mx-4 md:mx-12 lg:mx-24">

      <span className="w-full md:w-1/2 lg:w-[400px] flex justify-center md:justify-start mt-8 md:mt-0">
        <img
          src={ladda}
          alt="Illustration"
          className="w-full h-auto object-contain"
        />
      </span>
      <form
        className="flex flex-col w-full md:w-1/2 lg:w-[600px] bg-[#0585cd29] p-6 md:p-10 lg:p-[60px_50px] gap-8 md:gap-12 rounded-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Goal Title"
          className="w-full max-w-xs px-3 py-3 rounded-md border border-[#0585cd] bg-[#0585cd05] placeholder:text-black/70 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#0585cd]"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <textarea
          rows="10"
          placeholder="Goal Description"
          className="w-full max-w-full px-3 py-3 rounded-md border border-[#0585cd] bg-[#0585cd05] placeholder:text-black/70 placeholder:text-base resize-vertical focus:outline-none focus:ring-2 focus:ring-[#0585cd]"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          type="number"
          placeholder="Goal Progress"
          className="w-full max-w-xs px-3 py-3 rounded-md border border-[#0585cd] bg-[#0585cd05] placeholder:text-black/70 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#0585cd]"
          value={progress}
          onChange={(event) => {
            const num = Number(event.target.value);
            if (num < 0) {
              setProgress(0);
            } else if (num > 100) {
              setProgress(100);
            } else {
              setProgress(num);
            }
          }}
          min="0"
          max="100"
          required
        />
        <button
          type="submit"
          className="bg-[#0585cd] px-6 py-4 rounded-[10px] font-semibold text-xl text-white cursor-pointer hover:bg-[#0560a0] transition"
        >
          Create Goal
        </button>
      </form>

    </div>
  );
};

export default NewGoal;
