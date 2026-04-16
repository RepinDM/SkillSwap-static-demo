import { API_URL } from "./config";
import { fetchWithRefresh } from "./fetchWithRefresh";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const updateUserSkills = (data: FormData) =>
  fetchWithRefresh(`${API_URL}edit_user_skills/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: data,
  }).then(checkResponse);