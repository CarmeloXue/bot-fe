import { useState } from "react";

export const useVoiceRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream, {
                mimeType: "audio/webm",
            });

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setAudioChunks((prevChunks) => [...prevChunks, event.data]);
                }
            };

            recorder.onstop = () => {
                if (audioChunks.length > 0) {
                    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
                    const url = URL.createObjectURL(audioBlob);
                    setAudioUrl(url);
                    setAudioChunks([]); // Clear chunks after use
                }
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
            setIsPaused(false);
        } catch (err) {
            console.error("Error starting recording:", err);
            alert("Error starting recording. Please ensure your browser supports it.");
        }
    };

    const pauseRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.pause();
            setIsPaused(true);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "paused") {
            mediaRecorder.resume();
            setIsPaused(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            setIsPaused(false);
        }
    };

    return {
        isRecording,
        isPaused,
        audioUrl,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
    };
};
