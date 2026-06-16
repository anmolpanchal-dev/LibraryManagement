import axios from "axios";
import {
  createContext,
  useState,
  useEffect,
} from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const MembersContext = createContext();

const MembersProvider = ({ children }) => {
const [members, setMembers] = useState([]);
useEffect(() => {
  fetchMembers();
}, []);

const fetchMembers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/members"
    );

    setMembers(response.data);
  } catch (error) {
    console.error(error);
  }
};
  // ➕ Add Member
const addMember = async (member) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/members",
      member
    );

    setMembers((prev) => [
      ...prev,
      response.data,
    ]);
  } catch (error) {
    console.error(error);
  }
};

  // ❌ Delete Member
const deleteMember = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/members/${id}`
    );

    setMembers((prev) =>
      prev.filter(
        (member) => member._id !== id
      )
    );
  } catch (error) {
    console.error(error);
  }
};

  // ✏️ Update Member
const updateMember = async (
  updatedMember
) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/members/${updatedMember._id}`,
      updatedMember
    );

    setMembers((prev) =>
      prev.map((member) =>
        member._id === updatedMember._id
          ? response.data
          : member
      )
    );
  } catch (error) {
    console.error(error);
  }
};


  return (
    <MembersContext.Provider
      value={{
        members,
        addMember,
        deleteMember,
        updateMember,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};

export default MembersProvider;
