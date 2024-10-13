import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useLoadLogsAndJournals from "./useLoadLogsAndJournals";

export default function useLoadMoreLogs() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const [loading, setLoading] = useState(false);

  const { getPreviousLogs } = useLoadLogsAndJournals();

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      (async () => {
        try {
          await getPreviousLogs();
        } catch (error) {
          console.log({ error });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [inView, getPreviousLogs, loading]);

  return ref;
}
