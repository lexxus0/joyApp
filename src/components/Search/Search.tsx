import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeFilterName } from "../../redux/filter/slice";
import { selectNameFilter } from "../../redux/filter/selectors";
import { InputBase, Box } from "@mui/material";
import { SlMagnifier } from "react-icons/sl";
import { selectTheme } from "../../redux/theme/selectors";
import { useTranslation } from "../../redux/lang/selectors";

const Search: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const nameFilter = useAppSelector(selectNameFilter);
  const selectedTheme = useAppSelector(selectTheme);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterName(e.target.value));
  };

  return (
    <Box display="flex" alignItems="center" sx={{ width: "47.5%" }}>
      <InputBase
        placeholder={t("searchPlaceholder")}
        value={nameFilter}
        onChange={handleNameChange}
        inputProps={{ "aria-label": "search" }}
        startAdornment={<SlMagnifier className="w-5 h-5 mr-2" />}
        sx={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px 16px",
          width: "100%",
          color: selectedTheme === "dark" ? "white" : "black",
          backgroundColor: selectedTheme === "dark" ? "transparent" : "#f0f0f0",
          "& .MuiInputBase-input": {
            color: selectedTheme === "dark" ? "white" : "black",
          },
          "& .MuiInputAdornment-root .w-5.h-5": {
            color: selectedTheme === "dark" ? "gray" : "black",
          },
          "&:hover": {
            borderColor: selectedTheme === "dark" ? "#888" : "#666",
          },
        }}
      />
    </Box>
  );
};

export default Search;
