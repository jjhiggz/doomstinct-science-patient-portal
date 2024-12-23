import { useEffect, useRef } from "react";
import { debounce } from "remeda";

type UseDebouncedStateParams<Watching> = {
  handler: (input: Watching) => unknown;
  watchState: Watching;
  time: number;
};

export const useOnDebouncedState = <Watching extends unknown>({
  handler,
  watchState,
  time,
}: UseDebouncedStateParams<Watching>) => {
  const debouncedFn = useRef(
    debounce(handler, {
      waitMs: time,
    })
  );

  useEffect(() => {
    debouncedFn.current?.call(watchState);
  }, [watchState]);
};
