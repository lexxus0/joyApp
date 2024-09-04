import { Container, Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoodList from "../components/mood/MoodList";
import MoodStats from "../components/mood/MoodStats";
import Search from "../components/search/Search";
import { FaPlus } from "react-icons/fa";
import { selectMoodNotes } from "../redux/mood/selectors";
import { useAppSelector } from "../redux/hooks";

const MoodPage: React.FC = () => {
  const navigate = useNavigate();
  const notes = useAppSelector(selectMoodNotes);

  const handleAddNew = () => {
    navigate("/mood/form");
  };

  const handleShowMoreStats = () => {
    navigate("/mood/stats");
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 20, pb: 11 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8.5}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Search />

            <Button
              variant="contained"
              onClick={handleAddNew}
              sx={{
                backgroundColor: "mediumvioletred",
                ml: 2,
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              <FaPlus className="mr-3" />
              New
            </Button>
          </Box>

          <MoodList />
        </Grid>

        <Grid item xs={12} md={3.5}>
          <MoodStats />
          {notes.length !== 0 && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleShowMoreStats}
              fullWidth
              sx={{ mt: 2 }}
            >
              Show More Stats
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoodPage;
