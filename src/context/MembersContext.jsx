import {
  createContext,
  useState,
  useEffect,
} from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const MembersContext = createContext();

const MembersProvider = ({ children }) => {
const [members, setMembers] = useState(() => {
  const savedMembers = localStorage.getItem("members");
  if (savedMembers) return JSON.parse(savedMembers);

  return [
  { id: 1, name: "Anmol", email: "anmol@gmail.com", phone: "9876543210" },
  { id: 2, name: "Rahul", email: "rahul@gmail.com", phone: "9876543211" },
  { id: 3, name: "Aman Sharma", email: "aman@gmail.com", phone: "9876543212" },
  { id: 4, name: "Ravi Kumar", email: "ravi@gmail.com", phone: "9876543213" },
  { id: 5, name: "Neha Singh", email: "neha@gmail.com", phone: "9876543214" },

  { id: 6, name: "Priya Verma", email: "priya@gmail.com", phone: "9876543215" },
  { id: 7, name: "Amit Yadav", email: "amit@gmail.com", phone: "9876543216" },
  { id: 8, name: "Sandeep Raj", email: "sandeep@gmail.com", phone: "9876543217" },
  { id: 9, name: "Karan Mehta", email: "karan@gmail.com", phone: "9876543218" },
  { id: 10, name: "Simran Kaur", email: "simran@gmail.com", phone: "9876543219" },

  { id: 11, name: "Vikram Singh", email: "vikram@gmail.com", phone: "9876543220" },
  { id: 12, name: "Mohit Jain", email: "mohit@gmail.com", phone: "9876543221" },
  { id: 13, name: "Pooja Sharma", email: "pooja@gmail.com", phone: "9876543222" },
  { id: 14, name: "Anjali Gupta", email: "anjali@gmail.com", phone: "9876543223" },
  { id: 15, name: "Deepak Kumar", email: "deepak@gmail.com", phone: "9876543224" },

  { id: 16, name: "Rohit Verma", email: "rohit@gmail.com", phone: "9876543225" },
  { id: 17, name: "Harsh Patel", email: "harsh@gmail.com", phone: "9876543226" },
  { id: 18, name: "Sneha Reddy", email: "sneha@gmail.com", phone: "9876543227" },
  { id: 19, name: "Arjun Nair", email: "arjun@gmail.com", phone: "9876543228" },
  { id: 20, name: "Kavya Iyer", email: "kavya@gmail.com", phone: "9876543229" },

  { id: 21, name: "Nikhil Bansal", email: "nikhil@gmail.com", phone: "9876543230" },
  { id: 22, name: "Shreya Ghosh", email: "shreya@gmail.com", phone: "9876543231" },
  { id: 23, name: "Manish Kumar", email: "manish@gmail.com", phone: "9876543232" },
  { id: 24, name: "Aditya Rao", email: "aditya@gmail.com", phone: "9876543233" },
  { id: 25, name: "Meera Joshi", email: "meera@gmail.com", phone: "9876543234" },

  { id: 26, name: "Yash Thakur", email: "yash@gmail.com", phone: "9876543235" },
  { id: 27, name: "Sahil Khan", email: "sahil@gmail.com", phone: "9876543236" },
  { id: 28, name: "Komal Bhat", email: "komal@gmail.com", phone: "9876543237" },
  { id: 29, name: "Rajesh Sharma", email: "rajesh@gmail.com", phone: "9876543238" },
  { id: 30, name: "Divya Patel", email: "divya@gmail.com", phone: "9876543239" },

  { id: 31, name: "Aarav Mehra", email: "aarav@gmail.com", phone: "9876543240" },
  { id: 32, name: "Isha Malhotra", email: "isha@gmail.com", phone: "9876543241" },
  { id: 33, name: "Tushar Gupta", email: "tushar@gmail.com", phone: "9876543242" },
  { id: 34, name: "Kunal Singh", email: "kunal@gmail.com", phone: "9876543243" },
  { id: 35, name: "Ritika Sharma", email: "ritika@gmail.com", phone: "9876543244" },

  { id: 36, name: "Abhishek Yadav", email: "abhishek@gmail.com", phone: "9876543245" },
  { id: 37, name: "Shivam Mishra", email: "shivam@gmail.com", phone: "9876543246" },
  { id: 38, name: "Bhavna Singh", email: "bhavna@gmail.com", phone: "9876543247" },
  { id: 39, name: "Suresh Kumar", email: "suresh@gmail.com", phone: "9876543248" },
  { id: 40, name: "Neeraj Sharma", email: "neeraj@gmail.com", phone: "9876543249" },

  { id: 41, name: "Alok Verma", email: "alok@gmail.com", phone: "9876543250" },
  { id: 42, name: "Gaurav Jain", email: "gaurav@gmail.com", phone: "9876543251" },
  { id: 43, name: "Pankaj Singh", email: "pankaj@gmail.com", phone: "9876543252" },
  { id: 44, name: "Naveen Kumar", email: "naveen@gmail.com", phone: "9876543253" },
  { id: 45, name: "Shubham Patel", email: "shubham@gmail.com", phone: "9876543254" },

  { id: 46, name: "Manoj Yadav", email: "manoj@gmail.com", phone: "9876543255" },
  { id: 47, name: "Arun Kumar", email: "arun@gmail.com", phone: "9876543256" },
  { id: 48, name: "Sakshi Jain", email: "sakshi@gmail.com", phone: "9876543257" },
  { id: 49, name: "Priyanshu Singh", email: "priyanshu@gmail.com", phone: "9876543258" },
  { id: 50, name: "Rohan Das", email: "rohan@gmail.com", phone: "9876543259" },
  ];
});
  // ➕ Add Member
const addMember = (member) => {
  if (!member.name || !member.email || !member.phone) return;

  const newMember = {
    id: Date.now(),
    ...member,
  };

  setMembers((prev) => [...prev, newMember]);
};

  // ❌ Delete Member
  const deleteMember = (id) => {
    setMembers((prev) =>
      prev.filter((m) => m.id !== id)
    );
  };

  // ✏️ Update Member
const updateMember = (updatedMember) => {
  setMembers((prev) =>
    prev.map((m) =>
      m.id === updatedMember.id ? updatedMember : m
    )
  );
};

useEffect(() => {
  localStorage.setItem(
    "members",
    JSON.stringify(members)
  );
}, [members]);

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
