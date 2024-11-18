import React from "react";
import { useVoiceRecorder } from "../hooks/useVoiceRecorder";

const VoiceRecorder = () => {
    const {
        isRecording,
        isPaused,
        audioUrl,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
    } = useVoiceRecorder();

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Voice Recorder</h1>
            <div style={{ marginBottom: "20px" }}>
                {!isRecording ? (
                    <button onClick={startRecording}>Start Recording</button>
                ) : isPaused ? (
                    <button onClick={resumeRecording}>Resume Recording</button>
                ) : (
                    <button onClick={pauseRecording}>Pause Recording</button>
                )}
                <button onClick={stopRecording} disabled={!isRecording}>
                    Stop Recording
                </button>
            </div>
            {audioUrl && (
                <div>
                    <audio controls>
                        <source src={audioUrl} type="audio/webm" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default VoiceRecorder;
