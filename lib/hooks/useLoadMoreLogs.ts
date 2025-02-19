import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useLoadLogs from "./useLoadLogs";
import { useAppSelector } from "../hooks";

export default function useLoadMoreLogs() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const logPageEnded = useAppSelector((state) => state.log.pageEnded);

  const [loading, setLoading] = useState(false);

  const { getPreviousLogs } = useLoadLogs();

  useEffect(() => {
    if (inView && !loading && !logPageEnded) {
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
  }, [inView, getPreviousLogs, loading, logPageEnded]);

  return { ref, loading };
}
