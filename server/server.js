
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "https://YOUR-FRONTEND-DOMAIN"
  ]
}));
const PORT = 3000;

// Serve files from the folder containing index.html,
// investments.html, style.css, and the other website files.
const websiteFolder = path.resolve(__dirname, "..");

app.use(express.static(websiteFolder));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FinPath backend is running!"
  });
});

app.get("/api/stocks", async (req, res) => {
  const token = process.env.TAPETIDE_TOKEN;

  if (!token) {
    return res.status(500).json({
      message: "TAPETIDE_TOKEN is missing from server/.env"
    });
  }

  try {
    const response = await fetch(
      "https://api.tapetide.com/v1/quotes?symbols=RELIANCE,TCS,INFY,HDFCBANK,ICICIBANK",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
        signal: AbortSignal.timeout(15000)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: result?.error?.message || "Stock request failed."
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Stock error:", error.message);
    res.status(502).json({
      message: "Unable to connect to the stock service."
    });
  }
});

app.get("/api/mutual-funds/:schemeCode", async (req, res) => {
  const code = req.params.schemeCode;

  if (!/^\d+$/.test(code)) {
    return res.status(400).json({
      message: "Enter a numeric scheme code."
    });
  }

  try {
    const response = await fetch(
      `https://api.mfapi.in/mf/${encodeURIComponent(code)}`,
      { signal: AbortSignal.timeout(15000) }
    );

    const result = await response.json();

    if (!response.ok || !Array.isArray(result.data)) {
      return res.status(502).json({
        message: "NAV service unavailable or scheme not found."
      });
    }

    res.json({
      meta: result.meta || {},
      data: result.data
    });
  } catch (error) {
    console.error("NAV error:", error.message);
    res.status(502).json({
      message: "Unable to connect to the NAV service."
    });
  }
});

app.get("/api/indices", async (req, res) => {
  const token = process.env.TAPETIDE_TOKEN;

  if (!token) {
    return res.status(500).json({
      message: "Tapetide token is missing."
    });
  }

  const indices = [
    { name: "Nifty 50", slug: "nifty-50" },
    { name: "Nifty Bank", slug: "nifty-bank" },
    { name: "Nifty IT", slug: "nifty-it" }
  ];

  try {
    const results = await Promise.all(
      indices.map(async index => {
        const response = await fetch(
          `https://api.tapetide.com/v1/indices/${index.slug}/levels`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            },
            signal: AbortSignal.timeout(15000)
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            `${index.name}: ${
              result?.error?.message || "Request failed"
            }`
          );
        }

        const rows = Array.isArray(result.data)
          ? result.data
          : [];

        return {
          name: index.name,
          latest: rows.length ? rows[rows.length - 1] : null,
          asOf: result.meta?.as_of || null
        };
      })
    );

    res.json({ data: results });
  } catch (error) {
    console.error("Index API error:", error.message);

    res.status(502).json({
      message: error.message || "Could not load index levels."
    });
  }
});
app.get("/api/indices", async (req, res) => {
  const token = process.env.TAPETIDE_TOKEN;

  if (!token) {
    return res.status(500).json({
      message: "Tapetide token is missing."
    });
  }

  const indices = [
    { name: "Nifty 50", slug: "nifty-50" },
    { name: "Nifty Bank", slug: "nifty-bank" },
    { name: "Nifty IT", slug: "nifty-it" }
  ];

  try {
    const results = await Promise.all(
      indices.map(async (index) => {
        const response = await fetch(
          `https://api.tapetide.com/v1/indices/${index.slug}/levels`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            },
            signal: AbortSignal.timeout(15000)
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.error?.message || "Index request failed"
          );
        }

        const rows = Array.isArray(result.data)
          ? result.data
          : [];

        return {
          name: index.name,
          latest: rows.length
            ? rows[rows.length - 1]
            : null,
          asOf: result.meta?.as_of || null
        };
      })
    );

    res.json({ data: results });
  } catch (error) {
    console.error("Index API error:", error.message);

    res.status(502).json({
      message: error.message || "Could not load index data."
    });
  }
});
app.get("/api/indices", async (req, res) => {
  const token = process.env.TAPETIDE_TOKEN;

  if (!token) {
    return res.status(500).json({
      message: "Tapetide token is missing."
    });
  }

  const indices = [
    { name: "Nifty 50", slug: "nifty-50" },
    { name: "Nifty Bank", slug: "nifty-bank" },
    { name: "Nifty IT", slug: "nifty-it" }
  ];

  try {
    const results = await Promise.all(
      indices.map(async (index) => {
        const response = await fetch(
          `https://api.tapetide.com/v1/indices/${index.slug}/levels`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            },
            signal: AbortSignal.timeout(15000)
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.error?.message || "Index request failed"
          );
        }

        const rows = Array.isArray(result.data)
          ? result.data
          : [];

        return {
          name: index.name,
          latest: rows.length
            ? rows[rows.length - 1]
            : null,
          asOf: result.meta?.as_of || null
        };
      })
    );

    res.json({ data: results });
  } catch (error) {
    console.error("Index API error:", error.message);

    res.status(502).json({
      message: error.message || "Could not load index data."
    });
  }
});
app.listen(PORT, () => {
  console.log("Website folder:", websiteFolder);
  console.log(`FinPath running at http://localhost:${PORT}`);
});
