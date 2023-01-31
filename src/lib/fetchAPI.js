const BASE_URL =
  "http://ec2-3-122-253-30.eu-central-1.compute.amazonaws.com:5500/api/v1";

export const fetchApi = async (path, options = {}) => {
  try {
    const reguestionOtiosns = {
      method: options.method || "GET",
      headers: { UserId: "Temirlan", "Content-Type": "application/json" },
    };

    if (reguestionOtiosns.method !== "GET") {
      reguestionOtiosns.body = JSON.stringify(options.body);
    }

    const responce = await fetch(`${BASE_URL}/${path} `, reguestionOtiosns);
    if (!responce.ok) {
      throw new Error("Something went worng");
    }

    const result = await responce.json();

    return result;
  } catch (error) {
    throw error;
  }
};
