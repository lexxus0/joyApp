import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  changeFilterName,
  changeFilterMood,
  changeStartDate,
  changeEndDate,
  clearFilters,
} from "../../redux/filter/slice";
import {
  selectNameFilter,
  selectMoodFilter,
  selectStartDate,
  selectEndDate,
} from "../../redux/filter/selectors";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

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
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterName(e.target.value));
  };

  const handleMoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeFilterMood(Number(e.target.value)));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeStartDate(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEndDate(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md mb-6">
      <label htmlFor="searchInput" className="block text-gray-700 mb-2">
        Find by title:
      </label>
      <input
        id="searchInput"
        type="text"
        value={nameFilter}
        onChange={handleNameChange}
        placeholder="Enter title..."
        className="p-2 border border-gray-300 rounded-lg w-full mb-4"
      />

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full p-2 bg-blue-500 text-white rounded-lg focus:outline-none">
              <span>Filter Options</span>
              {open ? (
                <ChevronUpIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </Disclosure.Button>
            <Transition
              as="div"
              enter="transition ease-out duration-300"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition ease-in duration-300"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="mt-4">
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

                <label htmlFor="startDate" className="block text-gray-700 mb-2">
                  Start date:
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate || ""}
                  onChange={handleStartDateChange}
                  className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                />

                <label htmlFor="endDate" className="block text-gray-700 mb-2">
                  End date:
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate || ""}
                  onChange={handleEndDateChange}
                  className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                />

                <button
                  onClick={handleClearFilters}
                  className="p-2 bg-red-500 text-white rounded-lg mt-4"
                >
                  Clear Filters
                </button>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Search;
