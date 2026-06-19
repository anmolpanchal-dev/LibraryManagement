import { useState } from "react";
import axios from "axios";


const useMessages =()=>{


const [messages,setMessages]=useState([]);



const sendMessage = async(data)=>{

const res =
await axios.post(
"http://localhost:5000/api/messages/send",
data
);


setMessages(prev=>[
...prev,
res.data
]);


};



return {
messages,
sendMessage
};


}


export default useMessages;