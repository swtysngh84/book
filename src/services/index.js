import axios from "axios";

export const url = process.env.REACT_APP_API_URL;

const axiosUtil = {
  initalise: (store, history) => {
    axios.defaults.baseURL = url;
    axios.interceptors.request.use(
      (axiosConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
          axiosConfig.headers["Authorization"] = `${token}`;
        }
        return axiosConfig;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        if (error?.response?.status === 401) {
          localStorage.clear();
          history.push("/login");
        }
        // if (error?.response?.data?.isLogout) {
        //   localStorage.clear();
        //   history.push("/");
        // }
        return Promise.reject(error);
      }
    );
  },
};

export default axiosUtil;
