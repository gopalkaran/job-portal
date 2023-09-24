import { createContext, useContext, useReducer } from "react";

const GlobalStore = createContext(null);
const GlobalDispatch = createContext(null);

const initialState = {
  allCandidates: [],
  shortlistedCandidates: [],
  rejectedCandidates: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "STORE_LIST":
      return { ...state, allCandidates: [...action.payload] };
    case "SHORTLIST":
      const updatedList = state.allCandidates.map((candidate) => {
        return candidate.id === action.payload?.candidateId
          ? candidate.rejected || candidate.shortlisted
            ? candidate
            : { ...candidate, shortlisted: true }
          : candidate;
      });
      const filteredCandidates = updatedList.filter(
        (candidate) => candidate.shortlisted
      );
      return {
        ...state,
        allCandidates: updatedList,
        shortlistedCandidates: filteredCandidates
      };

    case "REJECT":
      const modifiedList = state.allCandidates.map((candidate) => {
        return candidate.id === action.payload?.candidateId
          ? candidate.rejected || candidate.shortlisted
            ? candidate
            : { ...candidate, rejected: true }
          : candidate;
      });
      const filteredList = modifiedList.filter(
        (candidate) => candidate.rejected
      );
      return {
        ...state,
        allCandidates: modifiedList,
        rejectedCandidates: filteredList
      };
    default:
      return state;
  }
};

export function CandidateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalDispatch.Provider value={dispatch}>
      <GlobalStore.Provider value={state}>{children}</GlobalStore.Provider>
    </GlobalDispatch.Provider>
  );
}

export function useCandidateStore() {
  return useContext(GlobalStore);
}
export function useCandidateDispatch() {
  return useContext(GlobalDispatch);
}
