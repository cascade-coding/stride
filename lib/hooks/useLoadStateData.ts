import { useAppSelector } from "../hooks";

function useLoadStateData() {
  const latestLog = useAppSelector((state) =>
    state.log.logs.find((log) => log.latest === true)
  );

  return { latestLog };
}

export default useLoadStateData;
