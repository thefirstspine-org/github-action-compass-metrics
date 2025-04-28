import axios from "axios";

export async function pushMetric(
  atlassianUserEmail: string,
  atlassianUserApiKey: string,
  gatewayDomain: string,
  metricSourceId: string,
  value: string,
): Promise<boolean> {
    const url = `https://${gatewayDomain}/api/v1/metrics/${metricSourceId}`;
    try {
        const response = await axios.post(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${atlassianUserEmail}:${atlassianUserApiKey}`).toString("base64")}`,
            },
            body: JSON.stringify({
                value,
                metricSourceId,
                timestamp: new Date().toISOString(),
            }),
        });
        return true;
    } catch (error) {
        console.error("Error pushing metric:", error);
        return false;
    }
}
