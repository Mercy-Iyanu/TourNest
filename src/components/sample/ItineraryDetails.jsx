import { Button, TextField, Grid } from '@mui/material';
import { useState } from 'react';

function ItineraryDetails({ itinerary, setItinerary }) {
  const [newDay, setNewDay] = useState({
    day: '',
    title: '',
    description: '',
    location: '',
    start_time: '',
    end_time: '',
  });

  const handleAddDay = () => {
    setItinerary([...itinerary, newDay]);
    setNewDay({
      day: '',
      title: '',
      description: '',
      location: '',
      start_time: '',
      end_time: '',
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Itinerary Details</h2>
      {itinerary.map((day, index) => (
        <Grid container spacing={4} key={index} className="mb-4">
          <Grid item xs={12} sm={6}>
            <TextField
              label={`Day ${day.day}`}
              value={day.title}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              value={day.description}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      ))}

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Day Number"
            value={newDay.day}
            onChange={(e) => setNewDay({ ...newDay, day: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Activity Title"
            value={newDay.title}
            onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            value={newDay.description}
            onChange={(e) => setNewDay({ ...newDay, description: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Location"
            value={newDay.location}
            onChange={(e) => setNewDay({ ...newDay, location: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Time"
            value={newDay.start_time}
            onChange={(e) => setNewDay({ ...newDay, start_time: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="End Time"
            value={newDay.end_time}
            onChange={(e) => setNewDay({ ...newDay, end_time: e.target.value })}
            fullWidth
          />
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleAddDay}>
        Add Day
      </Button>
    </div>
  );
}

export default ItineraryDetails;
