import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Countdown = ({ counter, opensIn }) => {
  return (
    <Box sx={{ my: 2, textAlign: 'center' }} className="fadeInUp">
      <Typography variant="body1" color="primary.main">
        Opens in
      </Typography>
      <Typography variant="h2" sx={{ fontFamily: 'IBM Plex Mono', mb: 1 }}>
        {counter}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', day: 'numeric', month: 'long', hour: 'numeric', hour12: true }).format(new Date(opensIn))} UTC
      </Typography>
    </Box>
  );
};

export default Countdown;
