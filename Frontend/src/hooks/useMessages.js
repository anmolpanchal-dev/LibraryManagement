import { useState } from "react";
import { API } from "../api/bookApi";


const useMessages = () => {

    const [messages, setMessages] = useState([]);



    // 📩 Send Message
    const sendMessage = async (data) => {

        try {

            const res = await API.post(
                "/messages/send",
                data
            );


            setMessages((prev) => [
                ...prev,
                res.data
            ]);


            return res.data;


        } catch (error) {

            console.error(
                "Send Message Error:",
                error
            );

        }

    };




    // 📥 Get Messages
    const getMessages = async (userId) => {

        try {

            const res = await API.get(
                `/messages/${userId}`
            );


            setMessages(res.data);


        } catch (error) {

            console.error(
                "Get Messages Error:",
                error
            );

        }

    };




    return {
        messages,
        sendMessage,
        getMessages
    };

};


export default useMessages;