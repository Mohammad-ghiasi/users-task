// "use server"
import axios from "axios";

const addressFinder = async (lat: number, lng: number) => {
  const API_KEY = "service.c21d29853a2f45c0a581732ac40e762e";
  const url = `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Api-Key": API_KEY,
      },
    });

    return response.data.formatted_address || "آدرس نامشخص";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "خطا در دریافت آدرس!";
  }
};

export default addressFinder;


// AIzaSyBNt-X_qKtkwZiQkOBpWq16aCM3d6CJ1WM