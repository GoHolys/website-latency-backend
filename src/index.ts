import cors from "cors";
import express from "express";
import http from "http";
import { config } from "./config/config";
import websiteRoutes from "./routes/website";

const router = express();

router.use(
  cors({
    credentials: true,
  })
);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

router.use("/latency", websiteRoutes);


router.use((req, res, next) => {
  const error = new Error("Not found");
  console.log(error);

  return res.status(404).json({ message: error.message });
});

const server = http.createServer(router);

server.listen(8080, config.server.port, () =>
  console.log(`Server is running on port ${config.server.port}`)
);
