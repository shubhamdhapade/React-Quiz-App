import { use, useEffect, useState } from "react";
export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);
    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        return () => clearTimeout(timer);
    }, [timeout, onTimeout]);
    useEffect(() => {
        const interval =setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 100);
        }, 100);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <progress
                max={timeout} value={remainingTime}
                className={`w-1/2 h-2 m-0 bg-[#9e5ef8] rounded-3xl overflow-hidden
                    [&::-webkit-progress-bar]:bg-[#6a558a]
                    [&::-webkit-progress-bar]:rounded-3xl
                    [&::-webkit-progress-value]:bg-[#9e5ef8]
                    [&::-webkit-progress-value]:rounded-3xl
                    [&::-webkit-progress-value]:transition-all
                    [&::-webkit-progress-value]:duration-500
                    [&::-webkit-progress-value]:ease-in-out
                `}
            />
        </>
    );
}