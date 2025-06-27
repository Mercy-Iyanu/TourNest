import React, { useState, useEffect } from "react";

export default function PricingRuleForm() {
  const [ruleName, setRuleName] = useState("");
  const [markup, setMarkup] = useState("");
  const [engineActive, setEngineActive] = useState(true);
  const [tours, setTours] = useState([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [rows, setRows] = useState([
    {
      id: Date.now(),
      ruleName: "",
      ruleType: "",
      type: "",
      markupPercent: "",
      amount: "",
      confirmed: false,
    },
  ]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/packages");
        const data = await response.json();
        const formattedTours = data.map((tour) => ({
          id: tour._id,
          name: tour.basicInfo.tour_name,
          price: tour.pricing.pricePerPerson || 0,
          currency: tour.pricing.currency || "USD",
        }));

        setTours(formattedTours);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setLoadingTours(false);
      }
    };

    fetchTours();
  }, []);

  const calculateFinalPrice = (base, type, percent, amount) => {
    const p = parseFloat(percent || 0);
    const a = parseFloat(amount || 0);
    let final = base;

    if (type === "Markup") {
      final += (base * p) / 100 + a;
    } else if (type === "Markdown") {
      final -= (base * p) / 100 + a;
    }

    return final;
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      ruleName,
      ruleType: markup,
      type: "",
      markupPercent: "",
      amount: "",
      confirmed: false,
    };

    setRows((prev) => [...prev, newRow]);
    setRuleName("");
    setMarkup("");
  };

  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const confirmRow = (id) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, confirmed: true } : row))
    );
  };

  const editRow = (row) => {
    setRuleName(row.ruleName);
    setMarkup(row.ruleType);
    setEngineActive(row.engineActive ?? true);
    setRows((prev) => [
      { ...row, confirmed: false },
      ...prev.filter((r) => r.id !== row.id),
    ]);
  };

  const cancelRow = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        🧠 Pricing Rule Engine
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="📝 Rule Name"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <select
          value={markup}
          onChange={(e) => setMarkup(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">🎯 Select Rule</option>
          <option value="Markup">Mark-up</option>
          <option value="Markdown">Mark-down</option>
        </select>
        <button
          onClick={handleAddRow}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
        >
          ➕ Add Rule
        </button>
      </div>

      {rows
        .filter((row) => !row.confirmed)
        .map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-start bg-gray-50 p-3 rounded-md border border-gray-200"
          >
            <select
              value={row.type}
              onChange={(e) => handleChange(row.id, "type", e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">🎒 Select Tour</option>
              {loadingTours ? (
                <option disabled>Loading...</option>
              ) : fetchError ? (
                <option disabled>Error loading tours</option>
              ) : (
                tours.map((tour) => (
                  <option key={tour.id} value={tour.id}>
                    {tour.name}
                  </option>
                ))
              )}
            </select>

            <input
              type="number"
              placeholder="%"
              value={row.markupPercent}
              onChange={(e) =>
                handleChange(row.id, "markupPercent", e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />

            <input
              type="number"
              placeholder="Amount"
              value={row.amount}
              onChange={(e) => handleChange(row.id, "amount", e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />

            <div className="flex space-x-2 sm:col-span-2 justify-end">
              <button
                onClick={() => confirmRow(row.id)}
                className="bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:bg-green-700"
              >
                ✅ Confirm
              </button>
              <button
                onClick={() => cancelRow(row.id)}
                className="text-red-600 hover:underline text-sm"
              >
                ❌ Cancel
              </button>
            </div>

            {(() => {
              const selectedTour = tours.find((t) => t.id === row.type);
              const base = selectedTour?.price || 0;
              const currency = selectedTour?.currency || "USD";
              if (!selectedTour) return null;

              const final = calculateFinalPrice(
                base,
                row.ruleType,
                row.markupPercent,
                row.amount
              );

              return (
                <div className="col-span-full text-sm text-gray-600">
                  💰 <strong>Old:</strong> {currency} {base.toLocaleString()}{" "}
                  &nbsp; | &nbsp;
                  <strong>New:</strong> {currency} {final}
                </div>
              );
            })()}
          </div>
        ))}

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          📋 Confirmed Pricing Rules
        </h3>
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-md">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Rule Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Affected</th>
                <th className="px-4 py-2 text-left">Markup %</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Engine</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows
                .filter((row) => row.confirmed)
                .map((row) => {
                  const selectedTour = tours.find((t) => t.id === row.type);
                  const base = selectedTour?.price || 0;
                  const currency = selectedTour?.currency || "USD";
                  const final = calculateFinalPrice(
                    base,
                    row.ruleType,
                    row.markupPercent,
                    row.amount
                  );

                  return (
                    <tr key={row.id} className="border-t border-gray-200">
                      <td className="px-4 py-2">{row.ruleName}</td>
                      <td className="px-4 py-2">{row.ruleType}</td>
                      <td className="px-4 py-2">{row.type}</td>
                      <td className="px-4 py-2">{row.markupPercent}</td>
                      <td className="px-4 py-2">{row.amount}</td>
                      <td className="px-4 py-2">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={engineActive}
                            onChange={() => setEngineActive(!engineActive)}
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-black transition duration-200" />
                          <div className="absolute w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform duration-200" />
                        </label>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-xs">
                          <div>
                            <strong>New:</strong> {currency} {final}
                          </div>
                          <div>
                            <strong>Old:</strong> {currency}{" "}
                            {base.toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => editRow(row)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => cancelRow(row.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {rows.filter((r) => r.confirmed).length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No confirmed pricing rules yet. 🚫
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
