import express from "express";
import { getMovies, getMovieById } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/all", getMovies);       // Get all movies
router.get("/:id", getMovieById); // Get movie by ID

export default router;
