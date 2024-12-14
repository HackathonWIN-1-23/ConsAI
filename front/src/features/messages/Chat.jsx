import React, {useEffect, useState} from 'react';
import {Box, TextField, Typography, List, ListItem} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {LoadingButton} from "@mui/lab";
import axiosApi from "../../axiosApi";

const Chat = () => {
    const [messages, setMessages] = useState([
        {message: 'Привет! Как ты?', sender: 'user'},
        {message: 'Здравствуйте! Я искусственный интеллект, готов помочь вам.', sender: 'bot'},
    ]);
    const [number, setNumber] = useState(1)
    const [chatId, setChatId] = useState('');
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        try {
            setIsLoading(true);
            const response = await axiosApi.get('/api/chat/create_chat/');
            console.log(response);

            setChatId(response.data.chat_id);
        } catch (error) {
            const errorMessage = {message: 'Ошибка: не удалось получить ответ от сервера.', sender: 'bot'};
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = {message: input, sender: 'user'};
            setMessages([...messages, userMessage]);
            setInput('');

            try {
                setIsLoading(true);
                console.log(chatId, input);
                const response = await axiosApi.post('/api/chat/chating/', {id_chat: chatId, message: input, number: number});
                setNumber(number + 1);

                const botMessage = {message: response.data.message, sender: 'bot'};
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                const errorMessage = {message: 'Ошибка: не удалось получить ответ от сервера.', sender: 'bot'};
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto 40px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
        >
            <Box
                sx={{
                    padding: '16px',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: '#f5f5f5',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6">Чат с ИИ</Typography>
            </Box>
            <List
                sx={{
                    flexGrow: 1,
                    padding: '16px',
                    backgroundColor: '#fff',
                    overflowY: 'auto',
                }}
            >
                {messages.map((message, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                            marginBottom: '8px',
                        }}
                    >
                        <Box
                            sx={{
                                padding: '8px 16px',
                                borderRadius: '16px',
                                backgroundColor: message.sender === 'user' ? '#1976d2' : '#e0e0e0',
                                color: message.sender === 'user' ? '#fff' : '#000',
                            }}
                        >
                            {message.message}
                        </Box>
                    </ListItem>
                ))}
            </List>
            <Box
                sx={{
                    padding: '16px',
                    borderTop: '1px solid #ccc',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    gap: '8px',
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Введите сообщение..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                />
                <LoadingButton variant="contained" onClick={handleSend} disabled={isLoading} loading={isLoading}>
                    <SendIcon/>
                </LoadingButton>
            </Box>
        </Box>
    );
};

export default Chat;
