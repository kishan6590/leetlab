import axios from "axios";
import { useAuthStore } from "../src/store/useAuthStore";
import toast from "react-hot-toast";
import { useProblemStore } from "../src/store/useProblemStore";
import { useExecutionStore } from "../src/store/useExecutionStore";
import { useSubmissionStore } from "../src/store/useSubmissionStore";
import { useAction } from "../src/store/useActions";
import { LeafyGreen } from "lucide-react";
import { usePlaylistStore } from "../src/store/usePlaylistStore";
import { use } from "react";
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
      const res = await this.axiosInstance.get(`/problems/get-problem/${id}`);
      setPorblem(res.data.problem);
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
      useProblemStore.getState();
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

  //execution

  executeCode = async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId
  ) => {
    const { setIsExecuting, setSubmission } = useExecutionStore.getState();
    try {
      setIsExecuting(true);
      console.log(
        "submission data ",
        JSON.stringify({
          source_code,
          language_id,
          stdin,
          expected_outputs,
          problemId,
        })
      );
      const res = await this.axiosInstance.post("/execute-code", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });
      setSubmission(res.data);
      console.log("res---", res.data);
      toast.success(res.data?.message || "Code executed successfully");
    } catch (error) {
      console.log("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      setIsExecuting(false);
    }
  };

  //submissions

  getAllSubmissions = async () => {
    const { setSubmissions, setIsLoading } = useSubmissionStore.getState();
    try {
      setIsLoading(true);

      const res = await this.axiosInstance.get(
        "/submission/get-all-submissions"
      );
      setSubmissions(res.data);
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error getting submissions", error);
      toast.error("Error getting submissions");
    } finally {
      setIsLoading(false);
    }
  };

  getSubmissionForProblem = async (problemId) => {
    const { setSubmission } = useSubmissionStore.getState();
    try {
      const res = await this.axiosInstance(
        `/submission/get-submissions/${problemId}`
      );
      setSubmission(res.data.submissions);
      console.log("setSub", res.data.submissions);
    } catch (error) {
      console.log("Error getting submissions for problem", error);
      toast.error("Error getting submissions for problem");
    }
  };
  getSubmissionCountForProblem = async (problemId) => {
    const { setSubmissionCount } = useSubmissionStore.getState();
    try {
      const res = await this.axiosInstance.get(
        `/submission/get-submissions-count/${problemId}`
      );
      console.log("count-", res.data);
      setSubmissionCount(res.data.count);
    } catch (error) {
      console.log("Error getting submission count for problem", error);
      toast.error("Error getting submission count for problem");
    }
  };
  //delete problem

  onDeleteProblem = async (id) => {
    const { setIsDeletingProblem } = useAction.getState();
    try {
      setIsDeletingProblem(true);
      const res = await this.axiosInstance.delete(
        `/problems/delete-problem/${id}`
      );
      console.log("del", res);
      toast.success(res.data.message);
      return res.data.success;
    } catch (error) {
      console.log(`Error deleting problem`, error);
      toast.error(`Error deleting problem`);
    } finally {
      setIsDeletingProblem(false);
    }
  };
  //playlist

  createPlaylist = async (playlistData) => {
    const { setIsLoading, setPlaylistOnCreating } = usePlaylistStore();
    try {
      setIsLoading(true);
      const res = await this.axiosInstance.post(
        "playlist/create-playlist",
        playlistData
      );

      setPlaylistOnCreating(res.data.playList);
      toast.success("Playlist created successfully");
      return res.data.playList;
    } catch (error) {
      console.error("Error creating playlist", error);
      toast.error(error.response?.data?.error || "Error creating playlist");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  getAllPlaylists = async () => {
    const { setIsLoading, setPlaylistOnCreating } = usePlaylistStore();
    try {
      setIsLoading(true);
      const res = await this.axiosInstance.get("/playlist");
      setPlaylistOnCreating(res.data.playLists);
    } catch {
      console.error("Error fetching playlists", error);
      toast.error("Failed to fetch plyalists");
    } finally {
      setIsLoading(false);
    }
  };
  getPlaylistDetails = async (playListId) => {
    const { setIsLoading, setCurrentPlaylist } = usePlaylistStore();

    try {
      setIsLoading(true);
      const res = await this.axiosInstance.get(`/playlist/${playlistId}`);

      setCurrentPlaylist(res.data.playList);
    } catch (error) {
      console.error(`Error fetching playlist details`, error);

      toast.error(`Failed to fetch playlist details`);
    } finally {
      setIsLoading(false);
    }
    addProblemToPlaylist = async () => {};
  };
  addProblemToPlaylist = async (playlistId, problemIds) => {
    const { setIsLoading, setCurrentPlaylist, currentPlaylist } =
      usePlaylistStore();
    try {
      setIsLoading(true);
      const res = await this.axiosInstance.post(
        `/playlist/${playlistId}/add-problem`,
        { problemIds }
      );
      //refresh playlist details if it is the current playlist
      if (currentPlaylist?.id === playlistId) {
        await this.getPlaylistDetails(playlistId);
      }
    } catch (error) {
      console.error(`Error adding problem to playlist`, error);
      toast.error("Failed to add problem to playlist");
    } finally {
      setIsLoading(false);
    }
  };
  removeProblemFromPlaylist = async (playlistId, problemIds) => {
    const { setIsLoading, setCurrentPlaylist, currentPlaylist } =
      usePlaylistStore();
    try {
      setIsLoading(true);
      const res = await this.axiosInstance.post(
        `/playlist/${playlistId}/remove-problems`,
        { problemIds }
      );

      toast.success("Problem removed from playlist successfully");
      //refresh playlist details if it is the current playlist
      if (currentPlaylist?.id === playlistId) {
        await this.getPlaylistDetails(playlistId);
      }
    } catch (error) {
      console.error(`Error removing problem from playlist`, error);
      toast.error("Failed to remove problem from playlist");
    } finally {
      setIsLoading(false);
    }
    deletePlaylist = async (playlistId) => {
      const { setIsLoading, setPlaylistsOnDelete } = usePlaylistStore();
      try {
        setIsLoading(true);
        await this.axiosInstance.delete(`/playlist/${playlistId}`);
        await setPlaylistsOnDelete(playlistId);
        toast.success("Playlist deleted successfully");
      } catch (error) {
        console.error(`Error deleting playlist`, error);
        toast.error("Failed to delete playlist");
      }finally {
        setIsLoading(false);
      }
    };
  };
}

const apiClient = new ApiClient();
export default apiClient;
