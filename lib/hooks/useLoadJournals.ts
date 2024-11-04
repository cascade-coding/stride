import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addJournals,
  updatePageEndedStatus,
  updatePageNumber,
  updateTotalPageNumber,
} from "../features/log/journalSlice";
import { getDateTime } from "../services";
import { previousJournals } from "@/app/actions/journal/read";

function useLoadJournals() {
  const dispatch = useAppDispatch();

  const journalPageNumber = useAppSelector((state) => state.journal.pageNumber);
  const journalPageEnded = useAppSelector((state) => state.journal.pageEnded);

  const getPreviousJournals = async () => {
    if (journalPageEnded === true) return;
    const { today } = getDateTime();

    dispatch(updatePageNumber());

    try {
      const journals = await previousJournals({
        page: journalPageNumber,
        today,
      });

      if (journals && "errorMessage" in journals) return null;

      dispatch(updateTotalPageNumber(journals.meta.totalPages));
      dispatch(addJournals(journals.journals));

      if (journals.meta.currentPage >= journals.meta.totalPages) {
        dispatch(updatePageEndedStatus(true));
      }

      return { message: "data loaded" };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  };

  return { getPreviousJournals };
}

export default useLoadJournals;
