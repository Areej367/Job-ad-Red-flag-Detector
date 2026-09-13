export default function handler(_req: any, res: any) {
  if (res.setHeader) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
  }

  if (res.status && res.json) {
    return res.status(200).json({ status: "ok" });
  }

  res.statusCode = 200;
  return res.end(JSON.stringify({ status: "ok" }));
}
