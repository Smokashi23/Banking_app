import axios from "axios";


export async function updateUser(userId, userData) {
  try {
    const response = await axios.patch(`http://localhost:1925/admin/update_user/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user: " + error.message);
  }
}
