import axios from "axios";

export const sendEmail = (formData) => {
  console.log("abe che");
  return axios.post("http://192.168.1.5:3000/send-email", {
    formData
  });
};
