import axios from "axios";

export async function pushMetric(
  atlassianUserEmail: string,
  atlassianUserApiKey: string,
  gatewayDomain: string,
  metricSourceId: string,
  value: string |number | boolean,
): Promise<boolean> {
    const url = `https://${gatewayDomain}/gateway/api/compass/v1/metrics`;
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
                "Accept": "application/json",
            },
            body: body,
        }, {
            auth: {
                username: atlassianUserEmail,
                password: atlassianUserApiKey,
            },
        });
        return true;
    } catch (error: any) {
        console.error("Error pushing metric:", error.response ? error.response.data : error.message);
        throw new Error(`Error pushing metric: ${JSON.stringify(error.response ? error.response.data : error.message)}`);
    }
}
