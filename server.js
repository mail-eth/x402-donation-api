import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

const PAYTO = process.env.PAYTO;
const PRICE = process.env.PRICE || "0.1";
const DESCRIPTION = process.env.DESCRIPTION || "Donate to support us!";
const NETWORK = process.env.NETWORK || "base";

app.get("/", (req, res) => {
  res.json({
    x402Version: 1,
    accepts: [
      {
        scheme: "exact",
        network: NETWORK,
        maxAmountRequired: PRICE,
        resource: "donate",
        description: DESCRIPTION,
        mimeType: "application/json",
        payTo: PAYTO,
        maxTimeoutSeconds: 300,
        asset: "USDC"
      }
    ]
  });
});

app.get("/donate", (req, res) => {
  res.json({
    message: "🎉 Terima kasih atas donasinya!",
    receivedAt: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Donation API berjalan di port ${PORT}`)
);
