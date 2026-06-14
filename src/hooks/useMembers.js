import { useContext } from "react";
import { MembersContext } from "../context/MembersContext";

const useMembers = () => {
  return useContext(MembersContext);
};

export default useMembers;