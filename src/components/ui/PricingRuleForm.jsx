import React, { useState, useEffect } from "react";

export default function PricingRuleForm() {
  const [ruleName, setRuleName] = useState("");
  const [markup, setMarkup] = useState("");
  const [tourId, setTourId] = useState("");
  const [markupPercent, setMarkupPercent] = useState("");
  const [amount, setAmount] = useState("");
  const [engineActive, setEngineActive] = useState(true);
  const [tours, setTours] = useState([]);
  const [pricingRules, setPricingRules] = useState([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [editingRuleId, setEditingRuleId] = useState(null);

  const fetchRules = async () => {
    try {
      const distributor = JSON.parse(localStorage.getItem("authUser"));
      if (!distributor || !distributor._id) return;

      const response = await fetch(
        `http://localhost:5000/api/pricing-rules?distributor=${distributor._id}`
      );
      const data = await response.json();
      setPricingRules(data);
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

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
    fetchRules();
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

  const handleSubmit = async () => {
    const distributor = JSON.parse(localStorage.getItem("authUser"));
    if (!distributor || !distributor._id) {
      alert("You must be logged in as a distributor to submit rules.");
      return;
    }

    if (!ruleName || !markup || !tourId) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      distributor: distributor._id,
      package: tourId,
      ruleName,
      ruleType: markup,
      markupPercent: parseFloat(markupPercent || 0),
      amount: parseFloat(amount || 0),
      isActive: engineActive,
      basePrice: base,
      finalPrice: final,
      currency,
    };

    const url = editingRuleId
      ? `http://localhost:5000/api/pricing-rules/${editingRuleId}`
      : "http://localhost:5000/api/pricing-rules";

    const method = editingRuleId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit rule");
      }

      alert(editingRuleId ? "✅ Rule updated!" : "✅ Pricing rule submitted!");
      setRuleName("");
      setMarkup("");
      setTourId("");
      setMarkupPercent("");
      setAmount("");
      setEngineActive(true);
      setEditingRuleId(null);
      fetchRules();
    } catch (err) {
      console.error("❌ Pricing rule submission error:", err);
      alert("❌ Error: " + err.message);
    }
    await fetchRules();
  };

  let base = 0,
    final = 0,
    currency = "";

  if (tourId) {
    const selectedTour = tours.find((t) => t.id === tourId);
    base = selectedTour?.price || 0;
    currency = selectedTour?.currency || "USD";
    final = calculateFinalPrice(base, markup, markupPercent, amount);
  }

  const handleEdit = (rule) => {
    setRuleName(rule.ruleName);
    setMarkup(rule.ruleType);
    setTourId(rule.package);
    setMarkupPercent(rule.markupPercent);
    setAmount(rule.amount);
    setEngineActive(rule.isActive);
    setEditingRuleId(rule._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rule?")) return;
    try {
      await fetch(`http://localhost:5000/api/pricing-rules/${id}`, {
        method: "DELETE",
      });
      fetchRules();
    } catch (error) {
      alert("Failed to delete rule");
    }
  };

  const handleToggleStatus = async (rule) => {
    try {
      await fetch(`http://localhost:5000/api/pricing-rules/${rule._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rule, isActive: !rule.isActive }),
      });
      fetchRules();
    } catch (error) {
      alert("Failed to toggle rule status");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10 mb-12 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        🧠 Pricing Rule Engine
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="📝 Rule Name"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          value={markup}
          onChange={(e) => setMarkup(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">🎯 Select Rule</option>
          <option value="Markup">Mark-up</option>
          <option value="Markdown">Mark-down</option>
        </select>

        <select
          value={tourId}
          onChange={(e) => setTourId(e.target.value)}
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
          placeholder="💯 Markup Percent"
          value={markupPercent}
          onChange={(e) => setMarkupPercent(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="💵 Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={engineActive}
            onChange={() => setEngineActive(!engineActive)}
            className="form-checkbox"
          />
          <span className="text-sm">Activate Engine</span>
        </label>
      </div>

      {tourId && (
        <div className="text-sm text-gray-600">
          💰 <strong>Old:</strong> {currency} {base.toLocaleString()} |{" "}
          <strong>New:</strong> {currency} {final.toLocaleString()}
        </div>
      )}

      <div className="flex justify-end items-center gap-3">
        {editingRuleId && (
          <button
            onClick={() => {
              setEditingRuleId(null);
              setRuleName("");
              setMarkup("");
              setTourId("");
              setMarkupPercent("");
              setAmount("");
              setEngineActive(true);
            }}
            className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:border-gray-100 transition"
          >
            ❌ Cancel Editing
          </button>
        )}

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition"
        >
          🚀 {editingRuleId ? "Update Rule" : "Submit Pricing Rule"}
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between mt-10 mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            📋 Created Pricing Rules
          </h3>
          <button
            onClick={fetchRules}
            className="text-sm text-blue-600 hover:text-gray-800"
          >
            🔄 Refresh
          </button>
        </div>
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-md">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Rule Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Tour Package</th>
                <th className="px-4 py-2 text-left">Markup %</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Old Price</th>
                <th className="px-4 py-2 text-left">New Price</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pricingRules.map((rule) => {
                const tour = rule.package;
                const tourName = tour?.basicInfo?.tour_name || "N/A";
                const base = tour?.pricing?.pricePerPerson || 0;
                const currency = tour?.pricing?.currency || "USD";
                const final = calculateFinalPrice(
                  base,
                  rule.ruleType,
                  rule.markupPercent,
                  rule.amount
                );

                return (
                  <tr key={rule._id} className="border-t border-gray-200">
                    <td className="px-4 py-2">{rule.ruleName}</td>
                    <td className="px-4 py-2">{rule.ruleType}</td>
                    <td className="px-4 py-2">{tourName}</td>
                    <td className="px-4 py-2">{rule.markupPercent}</td>
                    <td className="px-4 py-2">{rule.amount}</td>
                    <td className="px-4 py-2 text-red-800">
                      {currency} {base.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-green-500">
                      {currency} {final.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-xs text-blue-600">
                      {rule.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(rule)}
                        className="text-blue-600 hover:underline"
                      >
                        📝
                      </button>
                      <button
                        onClick={() => handleDelete(rule._id)}
                        className="text-red-600 hover:underline"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                );
              })}
              {pricingRules.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No pricing rules created yet.
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
