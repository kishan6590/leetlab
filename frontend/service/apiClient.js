import axios from "axios";
import { useAuthStore } from "../src/store/useAuthStore";
import toast from "react-hot-toast";
class ApiClient {
  constructor() {
    this.axiosInstance  = axios.create({
      baseURL:
        import.meta.env.MODE === "development"
          ? "http://localhost:8080/api/v1"
          : "/api/v1",
      withCredentials: true,
    });
  }

  async check() {
    const { setIsCheckingAuth, setAuthUser } = useAuthStore.getState();
    setIsCheckingAuth(true);
    try {
      const res = await this.axiosInstance.get("/auth/check");
      console.log("checkauth response-", res.data);
      setAuthUser(res.data.user);
    } catch (error) {
      console.log(`Error checking auth:`, error);
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  }

  async signup(data) {
    const { setIsSigninUp, setAuthUser } = useAuthStore.getState();
    setIsSigninUp(true);

    try {
      const res = await this.axiosInstance.post("/auth/register", data);
      setAuthUser(res.data.user);
      toast.success(res.data.message);
    } catch (error) {
      console.log(` Error signing up`, error);
      toast.error(`Error signing up`);
    } finally {
      setIsSigninUp(false);
    }
  }

  async login(data) {
    console.log("data---",data)
    const { setIsLoggingUp, setAuthUser } = useAuthStore.getState();
    setIsLoggingUp(true);
    try {
      const res = await this.axiosInstance.post("/auth/login", data);
      setAuthUser(res.data.user);
      toast.success(res.data.message);
      
    } catch (error) {
      console.log(`Error logging in`, error);
      toast.error(`Error loggin in`);
    } finally {
      setIsLoggingUp(false);
    }
  }

  async logout() {
    const { setAuthUser } = useAuthStore.getState();
    try {
      await this.axiosInstance.post("/auth/logout");
      setAuthUser(null);
      toast.success("Logout sccessful");
    } catch (error) {
      console.log(`Error logging out`, error);
      toast.error(`Error logging out`);
    }
  }
}

const apiClient = new ApiClient();
export default apiClient;
