import axios from "axios";
import { useAuthStore } from "../src/store/useAuthStore";
import toast from "react-hot-toast";
import { useProblemStore } from "../src/store/useProblemStore";
class ApiClient {
  constructor() {
    this.axiosInstance = axios.create({
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
    console.log("data---", data);
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
  // problems

  createProblem = async (data) => {
    try {
      const res = await this.axiosInstance.post(
        "/problems/create-problem",
        data
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  getAllProblems = async () => {
    const { setProblems, setIsProblemsLoading } = useProblemStore.getState();
    try {
      setIsProblemsLoading(true);
      const res = await this.axiosInstance.get("/problems/get-all-problems");
      setProblems(res.data);
    } catch (error) {
      console.log(`Error getting all problems:`, error);
      toast.error(`Error in getting problems`);
    } finally {
      setIsProblemsLoading(false);
    }
  };
  getProblemById = async (id) => {
    const { setIsProblemLoading, setPorblem } = useProblemStore.getState();
    try {
      setIsProblemLoading(true);
      const res = await this.axiosInstance.post(`/problems/get-problems/${id}`);
      setPorblem(res.data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(`Error getting Problem`, error);
      toast.error(`Error in getting problem`);
    } finally {
      setIsProblemLoading(false);
    }
  };
  getSolvedProblemByUser = async () => {
    const { setIsSolvedProblemsLoading, setSolvedProblems } =
      useProblemStore().getState();
    try {
      setIsSolvedProblemsLoading(true);
      await this.axiosInstance.get("/problems/get-solved-problem");
      setSolvedProblems(res.data);
    } catch (error) {
      console.log(`Error getting solved problems`, error);
      toast.error(`Error getting solved problems  `);
    } finally {
      setIsSolvedProblemsLoading(false);
    }
  };
}

const apiClient = new ApiClient();
export default apiClient;
