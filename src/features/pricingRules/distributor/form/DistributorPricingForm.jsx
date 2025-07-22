import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DistributorBookingWidget from "../../../widget/DistributorBookingWidget";

export default function DistributorPricingForm() {
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
  const navigate = useNavigate();

  const distributorId = "68594092aa4431e16f6248db";

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
    if (type === "Markup") final += (base * p) / 100 + a;
    else if (type === "Markdown") final -= (base * p) / 100 + a;
    return final;
  };

  const handleSubmit = async () => {
    const distributor = JSON.parse(localStorage.getItem("authUser"));
    if (!distributor || !distributor._id) return alert("Login required.");
    if (!ruleName || !markup || !tourId) return alert("Fill all fields.");

    const selectedTour = tours.find((t) => t.id === tourId);
    const base = selectedTour?.price || 0;
    const currency = selectedTour?.currency || "USD";
    const final = calculateFinalPrice(base, markup, markupPercent, amount);

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
      if (!response.ok) throw new Error("Submission failed");
      alert(editingRuleId ? "Rule updated" : "Rule submitted");
      setRuleName("");
      setMarkup("");
      setTourId("");
      setMarkupPercent("");
      setAmount("");
      setEngineActive(true);
      setEditingRuleId(null);
      fetchRules();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

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
    if (!window.confirm("Delete this rule?")) return;
    try {
      await fetch(`http://localhost:5000/api/pricing-rules/${id}`, {
        method: "DELETE",
      });
      fetchRules();
    } catch (err) {
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

  const selectedTour = tours.find((t) => t.id === tourId);
  const base = selectedTour?.price || 0;
  const currency = selectedTour?.currency || "USD";
  const final = calculateFinalPrice(base, markup, markupPercent, amount);

  return (
    <Paper sx={{ p: 4, my: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back
      </Button>
      <Typography variant="h5" gutterBottom>
        Pricing Rule Engine
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Rule Name"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Rule Type</InputLabel>
            <Select value={markup} onChange={(e) => setMarkup(e.target.value)}>
              <MenuItem value="Markup">Mark-up</MenuItem>
              <MenuItem value="Markdown">Mark-down</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Tour Package</InputLabel>
            <Select value={tourId} onChange={(e) => setTourId(e.target.value)}>
              {loadingTours ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : fetchError ? (
                <MenuItem disabled>Error loading tours</MenuItem>
              ) : (
                tours.map((tour) => (
                  <MenuItem key={tour.id} value={tour.id}>
                    {tour.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="number"
            label="Markup Percent"
            value={markupPercent}
            onChange={(e) => setMarkupPercent(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={engineActive}
                onChange={() => setEngineActive(!engineActive)}
              />
            }
            label="Activate Engine"
          />
        </Grid>
      </Grid>

      {tourId && (
        <Typography sx={{ mt: 2 }} variant="body2">
          Old: {currency} {base.toLocaleString()} | New: {currency}{" "}
          {final.toLocaleString()}
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="flex-end">
        {editingRuleId && (
          <Grid item>
            <Button
              onClick={() => {
                setEditingRuleId(null);
                setRuleName("");
                setMarkup("");
                setTourId("");
                setMarkupPercent("");
                setAmount("");
                setEngineActive(true);
              }}
            >
              Cancel Editing
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {editingRuleId ? "Update Rule" : "Submit Pricing Rule"}
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Created Pricing Rules
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Rule Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Tour Package</TableCell>
              <TableCell>Markup %</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Old Price</TableCell>
              <TableCell>New Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                <TableRow key={rule._id}>
                  <TableCell>{rule.ruleName}</TableCell>
                  <TableCell>{rule.ruleType}</TableCell>
                  <TableCell>{tourName}</TableCell>
                  <TableCell>{rule.markupPercent}</TableCell>
                  <TableCell>{rule.amount}</TableCell>
                  <TableCell>
                    {currency} {base.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {currency} {final.toLocaleString()}
                  </TableCell>
                  <TableCell>{rule.isActive ? "Active" : "Inactive"}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEdit(rule)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(rule._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {pricingRules.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No pricing rules created yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <DistributorBookingWidget distributorId={distributorId} />
    </Paper>
  );
}
