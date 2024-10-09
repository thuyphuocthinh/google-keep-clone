import { Stomp } from "@stomp/stompjs";

const startWorker = (userId: string) => {
    const socket = new WebSocket("ws://localhost:15674/ws");

    // Handle socket errors
    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    // Handle socket close event
    socket.onclose = (event) => {
        console.log("WebSocket closed:", event);
    };

    const stompClient: any = Stomp.over(socket);

    stompClient.connect(
        {
            login: "guest",
            passcode: "guest",
            userId: userId,
        },
        () => {
            // Successfully connected
            console.log("Connected to RabbitMQ");

            // Subscribe to user-specific reminder queue
            stompClient.subscribe(`/queue/reminders_${userId}`, (message: any) => {
                const reminder = JSON.parse(message.body);
                alert(`Reminder: ${reminder.note}`);
            });
        },
        (error: Error) => {
            // Handle connection errors
            console.error("STOMP error:", error);
        }
    );

    // Optional: Handle connection close event for STOMP
    stompClient.onclose = () => {
        console.log("STOMP connection closed.");
    };
};

export default startWorker;
