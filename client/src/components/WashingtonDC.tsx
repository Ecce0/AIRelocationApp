import { useEffect, useState } from "react";
import apiClient from "../api/apiClient/apiClient";
import type { MetricsResponse } from "../api/api-spec/MetricsResponse";

const WashingtonDC = () => {
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .post<MetricsResponse>("/metrics", {
        city: "Washington, DC",
        job: "Cloud Engineer"
      })
      .then(res => setData(res.data))
      .catch(err => console.error("Metrics fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!data) return <p className="text-center mt-8 text-red-500">No data found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Washington, DC Metrics</h1>
      <div className="bg-white shadow-md rounded-xl p-4 max-w-lg mx-auto">
        <p><strong>Job:</strong> {data.job}</p>
        <p><strong>Average Salary:</strong> ${data.salary}</p>
        <p><strong>Affordability Index:</strong> {data.affordability.toFixed(2)}</p>
        <h3 className="font-semibold mt-4">Cost of Living:</h3>
        <ul className="list-disc ml-6">
          <li>Monthly Net Salary: ${data.costOfLiving.avg_monthly_net_salary}</li>
          <li>Transport Pass: ${data.costOfLiving.monthly_transport_pass}</li>
          <li>Utilities: ${data.costOfLiving.basic_utilities}</li>
        </ul>
      </div>
    </div>
  );
}
export default WashingtonDC;