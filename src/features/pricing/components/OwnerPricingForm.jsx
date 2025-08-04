import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
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
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OwnerPricingForm() {
  const [engineActive, setEngineActive] = useState(true);
  const [ruleName, setRuleName] = useState("");
  const [markup, setMarkup] = useState("");
  const [activeTab, setActiveTab] = useState("distributor");
  const navigate = useNavigate();

  const [rowsByTab, setRowsByTab] = useState({
    distributor: [],
    tour: [],
    festive: [],
  });

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
    setRowsByTab((prev) => ({
      ...prev,
      [tabKey]: prev[tabKey].filter((r) => r.id !== row.id),
    }));
    setRuleName(row.ruleName);
    setMarkup(row.ruleType);
    setActiveTab(tabKey);
    setRowsByTab((prev) => ({
      ...prev,
      [tabKey]: [{ ...row, confirmed: false }, ...prev[tabKey]],
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
    distributor: "Per Distributor",
    tour: "Per Tour",
    festive: "Per Festive Period",
  };

  return (
    <Paper sx={{ p: 4, my: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back
      </Button>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h6">Pricing Rule Engine</Typography>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={engineActive}
                onChange={() => setEngineActive(!engineActive)}
              />
            }
            label="Active"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Pricing Rule Name"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Rule Type</InputLabel>
            <Select value={markup} onChange={(e) => setMarkup(e.target.value)}>
              <MenuItem value="Markup">Mark-up</MenuItem>
              <MenuItem value="Markdown">Mark-down</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddRow}
          >
            Add New Rule
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        {Object.keys(tabLabelMap).map((tab) => (
          <Grid item key={tab}>
            <Button
              variant={activeTab === tab ? "contained" : "outlined"}
              onClick={() => setActiveTab(tab)}
            >
              {tabLabelMap[tab]}
            </Button>
          </Grid>
        ))}
      </Grid>

      {currentRows
        .filter((row) => !row.confirmed)
        .map((row) => (
          <Grid
            container
            spacing={2}
            sx={{ mt: 2 }}
            key={row.id}
            alignItems="center"
          >
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>
                  {activeTab === "festive" ? "Festive Period" : "Tour"}
                </InputLabel>
                <Select
                  value={row.type}
                  onChange={(e) => handleChange(row.id, "type", e.target.value)}
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="Z">Z</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                label="Markup %"
                value={row.markupPercent}
                onChange={(e) =>
                  handleChange(row.id, "markupPercent", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                label="Amount"
                value={row.amount}
                onChange={(e) => handleChange(row.id, "amount", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button onClick={() => confirmRow(row.id)}>Confirm</Button>
              <Button onClick={() => cancelRow(row.id)} color="error">
                Cancel
              </Button>
            </Grid>
          </Grid>
        ))}

      <Typography variant="h6" sx={{ mt: 4 }}>
        Confirmed Pricing Rules
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Rule Name</TableCell>
              <TableCell>Rule Type</TableCell>
              <TableCell>Affected</TableCell>
              <TableCell>Markup %</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Tab</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(rowsByTab).flatMap(([tabKey, rows]) =>
              rows
                .filter((row) => row.confirmed)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.ruleName}</TableCell>
                    <TableCell>{row.ruleType}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.markupPercent}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{tabKey}</TableCell>
                    <TableCell>
                      <Button onClick={() => editRow(row, tabKey)}>Edit</Button>
                      <Button onClick={() => cancelRow(row.id)} color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
            {Object.values(rowsByTab)
              .flat()
              .filter((r) => r.confirmed).length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No confirmed pricing rules yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
