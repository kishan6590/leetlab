import db from "../libs/db.js";
export const createPlaylist = async function (req, res) {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;
    const existingPlaylist = await db.playlist.findUnique({
      where: { name },
    });
    if (existingPlaylist) {
      return res.status(400).json({
        error: "This Playlist already exists",
        success: false,
      });
    }
    const playlist = await db.playlist.create({
      data: { name, description, userId },
    });
    res.status(201).json({
      message: "Playlist created successfully",
      success: true,
      playlist,
    });
  } catch (error) {}
  console.error("Error creating playlist:", error);
  res.status(500).json({ error: `Failed to create playlist` });
};
export const getAllListDetails = async function (req, res) {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: { problem: true },
        },
      },
    });
    return res.status(200).json({
      message: `Playlist fetched successfully`,
      success: true,
      playlists,
    });
  } catch (error) {
    console.error(`Error fetching playlist:`, error);
    return res.status(500).json({
      error: `Failed to fetch playlist`,
    });
  }
};
export const getPlayListDetails = async function (req, res) {
  const playlistId = req.params;
  try {
    const playlist = db.playlist.findUnique({
      where: { id: playlistId, userId: req.user.id },
      include: { problems: { include: { problem: true } } },
    });
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    return res.status(200).json({
      success: true,
      message: `Playlist fetched  successfully`,
      playlist,
    });
  } catch (error) {
    console.error(`Error fetching playlist:`, error);
    return res.status(500).json({
      error: `Failed to fetch playlist`,
    });
  }
};
export const addProblemToPlaylist = async function (req, res) {
  const { playlistId } = req.params;
  const { problemIds } = req.body;
  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: `Invalid or missing problemId` });
    }
    const problemsInPlaylist = await db.problemsInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
    });
    return res.status(201).json({
      message: `Problem added to playlist successfully`,
      success: true,
      problemsInPlaylist,
    });
  } catch (error) {
    console.error(`Error to add problem in playlist:`, error);
    return res.status(500).json({
      error: `Failed to add problem in playlist`,
    });
  }
};
export const deletePlaylist = async function (req, res) {
  const { playlistId } = req.params;
  try {
    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });
    return res.status(200).json({
      success: true,
      message: `Playlist deleted successfully`,
      deletedPlaylist,
    });
  } catch (error) {
    console.error(`Error in deleting playlist:`, error);
    return res.status(500).json({
      error: `Failed to delete playlist`,
    });
  }
};
export const removeProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;
  try {
    if (!Array.isArray(problemIds) || problemIds.length == 0) {
      return res.status(400).json({
        error: `Invalid or missing problemId`,
      });
    }
    const deletedProblem = await db.problemsInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });
    return res.status(200).json({
      success: true,
      deletedProblem,
      message: `Problem removed from playlist successfully`,
    });
  } catch (error) {
    console.error(`Error removing problem from playlist`, error.message);
    return res
      .status(500)
      .json({ error: `Failed to remove problem from playlist` });
  }
};
