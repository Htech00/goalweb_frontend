import { getUserId } from "../utils/getUserId";


const USER_ID = getUserId();
const BASE_URL = `https://goalweb-backend1.onrender.com/api/goals/${USER_ID}`;

export const fetchAllGoals = () =>
  fetch(`${BASE_URL}/all`).then((res) => res.json());

export const fetchOngoingGoals = () =>
  fetch(`${BASE_URL}/ongoing`).then((res) => res.json());

export const fetchCompletedGoals = () =>
  fetch(`${BASE_URL}/completed`).then((res) => res.json());

export const fetchGoalById = (id) =>
  fetch(`${BASE_URL}/${id}`).then((res) => res.json());

export const createGoal = (goal) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  }).then((res) => res.json());

export const updateGoalProgress = (id, progress) =>
  fetch(`${BASE_URL}/${id}/progress`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ progress }),
  }).then((res) => res.json());

export const deleteGoal = (id) =>
  fetch(`${BASE_URL}/${id}/delete`, { method: "DELETE" }).then((res) =>
    res.json()
  );
