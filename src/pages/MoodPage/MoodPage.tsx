import { Container, Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoodList from "../../components/mood/MoodList/MoodList";
import MoodStats from "../../components/mood/MoodStats/MoodStats";
import Search from "../../components/Search/Search";

const MoodPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/mood/form");
  };

  const handleShowMoreStats = () => {
    navigate("/mood/stats");
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Search />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddNew}
          sx={{ ml: 2 }}
        >
          New +
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8.5}>
          <MoodList />
        </Grid>

        <Grid item xs={12} md={3.5}>
          <MoodStats />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleShowMoreStats}
            fullWidth
            sx={{ mt: 2 }}
          >
            Show More Stats
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoodPage;
