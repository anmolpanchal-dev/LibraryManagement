import { createContext, useState, useEffect } from "react";

import API from "../api/api";

// eslint-disable-next-line react-refresh/only-export-components
export const MembersContext = createContext();

const MembersProvider = ({ children }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  // 📥 Get Members
  const fetchMembers = async () => {
    try {
      const response = await API.get("/members");

      setMembers(response.data);
    } catch (error) {
      console.error("Fetch Members Error:", error);
    }
  };

  // ➕ Add Member
  const addMember = async (member) => {
    try {
      const response = await API.post("/members", member);

      setMembers((prev) => [...prev, response.data]);

      return {
        success: true,

        data: response.data,
      };
    } catch (error) {
      return {
        success: false,

        message: error.response?.data?.message || "Something went wrong",
      };
    }
  };

  // ❌ Delete Member
  const deleteMember = async (id) => {
    try {
      await API.delete(`/members/${id}`);

      setMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (error) {
      console.error("Delete Member Error:", error);
    }
  };

  // ✏️ Update Member
  const updateMember = async (updatedMember) => {
    try {
      const response = await API.put(
        `/members/${updatedMember._id}`,

        updatedMember,
      );

      setMembers((prev) =>
        prev.map((member) =>
          member._id === updatedMember._id ? response.data : member,
        ),
      );
    } catch (error) {
      console.error("Update Member Error:", error);
    }
  };

  return (
    <MembersContext.Provider
      value={{
        members,

        fetchMembers,

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
