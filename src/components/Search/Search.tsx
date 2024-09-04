import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeFilterName } from "../../redux/filter/slice";
import { selectNameFilter } from "../../redux/filter/selectors";
import { InputBase, Box } from "@mui/material";
import { SlMagnifier } from "react-icons/sl";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const nameFilter = useAppSelector(selectNameFilter);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterName(e.target.value));
  };

  return (
    <Box display="flex" alignItems="center" sx={{ width: "47.5%" }}>
      <InputBase
        placeholder="Search…"
        value={nameFilter}
        onChange={handleNameChange}
        inputProps={{ "aria-label": "search" }}
        startAdornment={<SlMagnifier className="w-5 h-5 mr-2 text-gray-500" />}
        sx={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px 16px",
          width: "100%",
          color: "white",
        }}
      />
    </Box>
  );
};

export default Search;
