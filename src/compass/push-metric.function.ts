import axios from "axios";

export async function pushMetric(
  userEmail: string,
  userApiKey: string,
  gatewayDomain: string,
  metricSourceId: string,
  value: string,
): Promise<boolean> {
    const url = `${gatewayDomain}/api/v1/metrics/${metricSourceId}`;
    try {
        const response = await axios.post(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${userEmail}:${userApiKey}`).toString("base64")}`,
            },
            body: JSON.stringify({
                value: value,
            }),
        });
        return true;
    } catch (error) {
        console.error("Error pushing metric:", error);
        return false;
    }
}
