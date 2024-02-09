import { Request, Response } from "express";
import ping from "ping";
import { v4 as uuidv4 } from "uuid";

export interface Website {
  id: string;
  name: string;
  url: string;
  latency?: number | "unknown";
}

const websites: Website[] = [
  {
    id: uuidv4(),
    name: "Google",
    url: "google.com",
  },
  {
    id: uuidv4(),
    name: "Facebook",
    url: "facebook.com",
  },
  {
    id: uuidv4(),
    name: "Amazon",
    url: "amazon.com",
  },
  {
    id: uuidv4(),
    name: "Mako",
    url: "mako.com",
  },
];

const createWebsite = async (req: Request, res: Response) => {
  try {
    const website = req.body;
    const { time } = await ping.promise.probe(website.url);
    websites.push({ id: uuidv4(), latency: time, ...website });
    return websites
      ? res.status(200).json(websites)
      : res.status(404).json({ message: "Not Found" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const removeWebsite = async (req: Request, res: Response) => {
  try {
    const { websiteId } = req.params;
    const indexToRemove = websites.findIndex(
      (website) => website.id === websiteId
    );
    if (indexToRemove !== -1) {
      websites.splice(indexToRemove, 1);
    }
    return websites
      ? res.status(200).json(websites)
      : res.status(404).json({ message: "Not Found" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateWebsite = async (req: Request, res: Response) => {
  try {
    const websiteInfo = req.body;
    const indexToUpdate = websites.findIndex(
      (website) => website.id === websiteInfo.id
    );
    if (indexToUpdate !== -1) {
      const latency =
        websiteInfo.url === websites[indexToUpdate].url
          ? websites[indexToUpdate].latency
          : (await ping.promise.probe(websiteInfo.url)).time;
      websites[indexToUpdate] = { ...websiteInfo, latency };
    }
    return websites
      ? res.status(200).json(websites)
      : res.status(404).json({ message: "Not Found" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getManyWebsites = async (req: Request, res: Response) => {
  try {
    for (let website of websites) {
      const { time } = await ping.promise.probe(website.url);
      website.latency = time;
    }

    return websites
      ? res.status(200).json(websites)
      : res.status(404).json({ message: "Not Found" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { createWebsite, getManyWebsites, removeWebsite, updateWebsite };
