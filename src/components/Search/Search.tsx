import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeFilterName, changeFilterMood } from "../../redux/filter/slice";
import {
  selectNameFilter,
  selectMoodFilter,
} from "../../redux/filter/selectors";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, FilterIcon } from "@heroicons/react/solid";
import { IconButton, InputBase, Box } from "@mui/material";
import { SlMagnifier } from "react-icons/sl";

const moodOptions = [
  { value: 1, label: "😞 Sad" },
  { value: 2, label: "😕 Confused" },
  { value: 3, label: "😐 Neutral" },
  { value: 4, label: "😊 Happy" },
  { value: 5, label: "😁 Very Happy" },
];

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const nameFilter = useAppSelector(selectNameFilter);
  const moodFilter = useAppSelector(selectMoodFilter);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterName(e.target.value));
  };

  const handleMoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeFilterMood(Number(e.target.value)));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={4}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={{ flexGrow: 1, maxWidth: "70%" }}
      >
        <InputBase
          placeholder="Search…"
          value={nameFilter}
          onChange={handleNameChange}
          inputProps={{ "aria-label": "search" }}
          startAdornment={
            <SlMagnifier className="w-5 h-5 mr-2 text-gray-500" />
          }
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px 8px",
            width: "100%",
          }}
        />
      </Box>

      {/* <Box display="flex" alignItems="center">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button as={IconButton} sx={{ ml: 2 }}>
                {open ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <FilterIcon className="w-5 h-5 text-gray-500" />
                )}
              </Disclosure.Button>

              <Disclosure.Panel className="absolute mt-2 bg-white rounded-lg shadow-md p-4 z-10 right-0">
                <label
                  htmlFor="moodFilter"
                  className="block text-gray-700 mb-2"
                >
                  Filter by mood:
                </label>
                <select
                  id="moodFilter"
                  value={moodFilter || ""}
                  onChange={handleMoodChange}
                  className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                >
                  <option value="">All moods</option>
                  {moodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure> */}
      {/* </Box> */}
    </Box>
  );
};

export default Search;
