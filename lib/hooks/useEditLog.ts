import { updateStatus } from "@/app/actions/log/edit";
import { useAppDispatch } from "../hooks";
import { updateLog } from "../features/log/logSlice";

function useEditLog() {
  const dispatch = useAppDispatch();

  const handleStatusChange = async (value: string, logId: string) => {
    try {
      const log = await updateStatus({ value, logId });

      if ("errorMessage" in log) return;

      dispatch(updateLog({ ...log, latest: true }));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  return { handleStatusChange };
}

export default useEditLog;
