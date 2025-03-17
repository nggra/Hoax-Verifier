import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { idlFactory  } from 'declarations/backend';
import '/index.css';
import { HttpAgent, Actor } from "@dfinity/agent";

Chart.register(...registerables);

const backendCanisterId = "4lp6h-uyaaa-aaaab-qbmlq-cai";

const createActor = async () => {
  const agent = new HttpAgent({ host: "https://ic0.app" });
  return Actor.createActor(idlFactory, { agent, canisterId: backendCanisterId });
};

const App = () => {
  const [newsText, setNewsText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyNews = async () => {
    if (!newsText.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const actor = await createActor();
      const response = await actor.checkNews(newsText);

      // Pastikan respons berbentuk objek yang berisi informasi hasil analisis
      setResult(response);
    } catch (error) {
      console.error("Error verifying news:", error);
      setResult({ status: "Error", reason: "Terjadi kesalahan saat memproses berita.", confidence: 0, evidence: {} });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Verifikasi Hoax/Fakta Berita</h2>

        <textarea
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Masukkan berita untuk diperiksa..."
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
        ></textarea>

        <button
          onClick={verifyNews}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Memeriksa..." : "Cek Fakta"}
        </button>

        {result && (
          <div className="mt-4 p-3 border rounded-md bg-gray-100">
            <strong>Hasil:</strong> {result.status}
            <p><strong>Alasan:</strong> {result.reason}</p>
            <p><strong>Tingkat Kepercayaan:</strong> {result.confidence}%</p>

            {result.evidence && Object.keys(result.evidence).length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-semibold">Analisis Faktor Hoax</h3>
                <Bar
                  data={{
                    labels: Object.keys(result.evidence),
                    datasets: [
                      {
                        label: "Tingkat Kepercayaan",
                        data: Object.values(result.evidence),
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
