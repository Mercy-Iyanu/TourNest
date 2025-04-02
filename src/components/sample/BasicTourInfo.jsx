import { TextField, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';

function BasicTourInfo({ tourInfo, setTourInfo }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Basic Tour Information</h2>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tour Name"
            value={tourInfo.tour_name || ''}
            onChange={(e) => setTourInfo({ ...tourInfo, tour_name: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            value={tourInfo.description || ''}
            onChange={(e) => setTourInfo({ ...tourInfo, description: e.target.value })}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Tour Type</InputLabel>
            <Select
              value={tourInfo.tour_type || ''}
              onChange={(e) => setTourInfo({ ...tourInfo, tour_type: e.target.value })}
            >
              <MenuItem value="adventure">Adventure</MenuItem>
              <MenuItem value="cultural">Cultural</MenuItem>
              <MenuItem value="historical">Historical</MenuItem>
              <MenuItem value="culinary">Culinary</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Location"
            value={tourInfo.location || ''}
            onChange={(e) => setTourInfo({ ...tourInfo, location: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Region"
            value={tourInfo.region || ''}
            onChange={(e) => setTourInfo({ ...tourInfo, region: e.target.value })}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default BasicTourInfo;
