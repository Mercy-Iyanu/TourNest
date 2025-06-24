import React, { useState, useEffect } from "react";

export default function PricingRuleForm() {
  const [engineActive, setEngineActive] = useState(true);
  const [ruleName, setRuleName] = useState("");
  const [markup, setMarkup] = useState("");
  const [activeTab, setActiveTab] = useState("tour");
  const [tours, setTours] = useState([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [rowsByTab, setRowsByTab] = useState({
    tour: [],
    festive: [],
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(
          "https://sabre-tour-aggregator-backend-production.up.railway.app/api/packages"
        );
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

    setRowsByTab((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newRow],
    }));

    setRuleName("");
    setMarkup("");
  };

  const handleChange = (id, field, value) => {
    setRowsByTab((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      ),
    }));
  };

  const confirmRow = (id) => {
    setRowsByTab((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((row) =>
        row.id === id ? { ...row, confirmed: true } : row
      ),
    }));
  };

  const editRow = (row, tabKey) => {
    // Remove from read section
    setRowsByTab((prev) => ({
      ...prev,
      [tabKey]: prev[tabKey].filter((r) => r.id !== row.id),
    }));

    // Restore form fields
    setRuleName(row.ruleName);
    setMarkup(row.ruleType);
    setActiveTab(tabKey);

    // Add back to editable form
    setRowsByTab((prev) => ({
      ...prev,
      [tabKey]: [
        {
          ...row,
          confirmed: false,
        },
        ...prev[tabKey],
      ],
    }));
  };

  const cancelRow = (id) => {
    setRowsByTab((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((row) => row.id !== id),
    }));
  };

  const currentRows = rowsByTab[activeTab];
  const tabLabelMap = {
    tour: "Per Tour",
    festive: "Per Festive Period",
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Pricing Rule Engine
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Active</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={engineActive}
              onChange={() => setEngineActive(!engineActive)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-black transition-all duration-200" />
            <div className="absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform duration-200" />
          </label>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Pricing Rule Name"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          value={markup}
          onChange={(e) => setMarkup(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Rule</option>
          <option value="Markup">Mark-up</option>
          <option value="Markdown">Mark-down</option>
        </select>
        <button
          onClick={handleAddRow}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
        >
          Add New Rule
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        {Object.keys(tabLabelMap).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
              activeTab === tab
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tabLabelMap[tab]}
          </button>
        ))}
      </div>

      {currentRows
        .filter((row) => !row.confirmed)
        .map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-3"
          >
            <select
              value={row.type}
              onChange={(e) => handleChange(row.id, "type", e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-gray-800 bg-white"
            >
              <option value="">
                Select {activeTab === "festive" ? "Festive Period" : "Tour"}
              </option>

              {activeTab === "tour" && (
                <>
                  {loadingTours ? (
                    <option disabled>Loading tours...</option>
                  ) : fetchError ? (
                    <option disabled>Error loading tours</option>
                  ) : (
                    tours.map((tour) => (
                      <option
                        className="text-gray-800"
                        key={tour.id}
                        value={tour.id}
                      >
                        {tour.name}
                      </option>
                    ))
                  )}
                </>
              )}

              {activeTab === "festive" && (
                <>
                  <option value="Christmas">Christmas</option>
                  <option value="Eid">Eid</option>
                  <option value="New Year">New Year</option>
                </>
              )}
            </select>

            <input
              type="number"
              placeholder="Markup %"
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
                className="bg-black text-white px-4 py-1.5 text-sm rounded-md hover:bg-gray-900"
              >
                Confirm
              </button>
              <button
                onClick={() => cancelRow(row.id)}
                className="text-sm text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
            <div className="col-span-full px-2 text-gray-700 text-sm">
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
                  <div>
                    <strong>Current Price:</strong> {selectedTour.currency}{" "}
                    {base.toLocaleString()} <br />
                    <strong>New Price:</strong> {selectedTour.currency} {final}
                  </div>
                );
              })()}
            </div>
          </div>
        ))}

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Confirmed Pricing Rules
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 text-left">Rule Name</th>
                <th className="px-4 py-2 text-left">Rule Type</th>
                <th className="px-4 py-2 text-left">Affected</th>
                <th className="px-4 py-2 text-left">Markup %</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Tab</th>
                <th className="px-4 py-2 text-left">Prices</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rowsByTab).flatMap(([tabKey, rows]) =>
                rows
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
                      <tr
                        key={row.id}
                        className="border-t border-gray-200 text-sm"
                      >
                        <td className="px-4 py-2">{row.ruleName}</td>
                        <td className="px-4 py-2">{row.ruleType}</td>
                        <td className="px-4 py-2">{row.type}</td>
                        <td className="px-4 py-2">{row.markupPercent}</td>
                        <td className="px-4 py-2">{row.amount}</td>
                        <td className="px-4 py-2 capitalize">{tabKey}</td>
                        <td className="px-4 py-2">
                          <div className="text-xs leading-snug">
                            <div>
                              <strong>New:</strong> {currency} {final}
                            </div>
                            <div>
                              <strong>Current:</strong> {currency}{" "}
                              {base.toLocaleString()}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => editRow(row, tabKey)}
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
                  })
              )}
              {Object.values(rowsByTab)
                .flat()
                .filter((r) => r.confirmed).length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No confirmed pricing rules yet.
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
