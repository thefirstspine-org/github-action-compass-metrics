import axios from "axios";

export async function pushMetric(
  atlassianUserEmail: string,
  atlassianUserApiKey: string,
  gatewayDomain: string,
  metricSourceId: string,
  value: string,
): Promise<boolean> {
    const url = `https://${gatewayDomain}/api/v1/metrics`;
    const body = {
        value,
        metricSourceId,
        timestamp: new Date().toISOString(),
    };
    console.log(`Pushing metric to ${url} with body:`, body);
    try {
        const response = await axios.post(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${atlassianUserEmail}:${atlassianUserApiKey}`).toString("base64")}`,
            },
            body: JSON.stringify(body),
        });
        return true;
    } catch (error: any) {
        console.error("Error pushing metric:", error.response ? error.response.data : error.message);
        return false;
    }
}
