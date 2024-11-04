import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useLoadJournals from "./useLoadJournals";
import { useAppSelector } from "../hooks";

export default function useLoadMoreJournals() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const journalPageEnded = useAppSelector((state) => state.journal.pageEnded);

  const [loading, setLoading] = useState(false);

  const { getPreviousJournals } = useLoadJournals();

  useEffect(() => {
    if (inView && !loading && !journalPageEnded) {
      setLoading(true);
      (async () => {
        try {
          await getPreviousJournals();
        } catch (error) {
          console.log({ error });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [inView, getPreviousJournals, loading, journalPageEnded]);

  return ref;
}
