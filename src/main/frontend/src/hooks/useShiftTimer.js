import {useEffect} from "react";

export function useShiftTimer(active, dispatch) {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      dispatch({type: "timerTicked"});
    }, 1000);

    return () => window.clearInterval(timer);
  }, [active, dispatch]);
}
