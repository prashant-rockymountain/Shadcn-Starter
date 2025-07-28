import axios from "axios";
import { toast } from "sonner";
import { ApiStatus } from "@/helper/helper";
const httpRequest = axios.create({withCredentials:true});


httpRequest.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  function (response) {
    if (response.status === ApiStatus.STATUS_200) {
      return response;
    } else if (response.status === ApiStatus.STATUS_201) {
      return response;
    } else if (response.status === ApiStatus.STATUS_403) {
   
    } else {
      toast.error(response.data?.message);
    }
  },
  function (error) {
    toast.error(error?.response?.data?.message);
    return Promise.reject(error);
  }
);

export default httpRequest;
