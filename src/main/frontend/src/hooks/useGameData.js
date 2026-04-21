import {useEffect} from "react";
import {fetchGameData} from "../api/cases.js";

export function useGameData(dispatch) {
  useEffect(() => {
    const controller = new AbortController();

    async function loadGameData() {
      try {
        const gameData = await fetchGameData({signal: controller.signal});
        dispatch({type: "gameDataLoaded", payload: gameData});
      } catch (error) {
        if (!controller.signal.aborted) {
          dispatch({type: "gameDataFailed"});
        }
      }
    }

    loadGameData();

    return () => controller.abort();
  }, [dispatch]);
}
