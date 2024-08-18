import express from "express";

import { login, register } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/api/auth/register", register);
  router.post("/api/auth/login", login);
};
