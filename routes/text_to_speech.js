const express = require("express");
const ask = require("../api/bot");
const { spawn } = require("child_process");
const tts = express.Router();

// TTS endpoint
tts.get("/tts", async (req, res) => {
  const { input } = req.query;

  if (!input) {
    return res.status(400).send("Please provide text to convert to speech.");
  }
  const response = await ask(input);
  console.log(response);

  // Set headers for audio output
  res.set({
    "Content-Type": "audio/wav",
    "Transfer-Encoding": "chunked",
  });

  // Spawn eSpeak process with real-time output
  const espeak = spawn("espeak", [
    "--stdout",
    "-s",
    "140", // Speed: slower than default for clarity
    "-p",
    "25", // Pitch: lowered slightly for a more natural tone
    "-a",
    "220", // Amplitude: increased for fuller sound
    "-v",
    "default+m3"
  ]);

  // Write the response text to the espeak process's stdin
  espeak.stdin.write(response);
  espeak.stdin.end();

  // Pipe the output directly to the response
  espeak.stdout.pipe(res);

  espeak.on("error", (error) => {
    console.error("Error:", error);
    res.status(500).send("Error generating speech.");
  });
});

module.exports = tts;
