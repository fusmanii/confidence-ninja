import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Mic, MicOff, Video, VideoOff, Play, Pause } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SAMPLE_QUESTIONS = [
  "Tell me about a challenging project you worked on and how you overcame obstacles.",
  "How do you stay updated with the latest technologies in your field?",
  "Describe a time when you had to work with a difficult team member.",
  "What's your approach to debugging complex issues?",
];

const MAX_FREE_RECORDING_TIME = 60; // 60 seconds for free tier

const InterviewApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isQuestionPlaying, setIsQuestionPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  useEffect(() => {
    const randomQuestion = SAMPLE_QUESTIONS[Math.floor(Math.random() * SAMPLE_QUESTIONS.length)];
    setCurrentQuestion(randomQuestion);
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_FREE_RECORDING_TIME) {
            stopRecording();
            toast({
              title: "Recording limit reached",
              description: "Upgrade your plan to record longer responses.",
              variant: "destructive",
            });
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsCameraOn(true);
      setIsMicOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
      setIsMicOn(false);
    }
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(!isMicOn);
    }
  };

  const playQuestion = async () => {
    setIsQuestionPlaying(true);
    const utterance = new SpeechSynthesisUtterance(currentQuestion);
    utterance.onend = () => setIsQuestionPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const startRecording = () => {
    if (recordingTime >= MAX_FREE_RECORDING_TIME) {
      toast({
        title: "Recording limit reached",
        description: "Please upgrade your plan to record longer responses.",
        variant: "destructive",
      });
      return;
    }

    if (streamRef.current) {
      const mediaRecorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Your interview response is being recorded.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      toast({
        title: "Recording Stopped",
        description: "Your response has been saved.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8 pt-24 animate-fade-up">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-6 backdrop-blur-sm bg-white/80 border border-blue-100 shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Question:</h2>
            <p className="text-lg text-gray-700 mb-4">{currentQuestion}</p>
            <Button 
              onClick={playQuestion}
              disabled={isQuestionPlaying}
              className="mb-4"
            >
              {isQuestionPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {isQuestionPlaying ? 'Playing...' : 'Play Question'}
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-200">
              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">Camera is off</p>
                </div>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>

            {recordingTime > 0 && (
              <div className="text-center text-sm text-gray-600">
                Recording Time: {recordingTime}s / {MAX_FREE_RECORDING_TIME}s
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => isCameraOn ? stopCamera() : startCamera()}
                className="transition-all hover:scale-105"
              >
                {isCameraOn ? <VideoOff className="mr-2" /> : <Video className="mr-2" />}
                {isCameraOn ? 'Stop Camera' : 'Start Camera'}
              </Button>

              <Button
                variant="outline"
                onClick={toggleMic}
                disabled={!isCameraOn}
                className={`transition-all hover:scale-105 ${!isCameraOn ? 'opacity-50' : ''}`}
              >
                {isMicOn ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
                {isMicOn ? 'Mute' : 'Unmute'}
              </Button>

              <Button
                variant={isRecording ? "destructive" : "default"}
                onClick={() => isRecording ? stopRecording() : startRecording()}
                disabled={!isCameraOn}
                className={`transition-all hover:scale-105 ${!isCameraOn ? 'opacity-50' : ''}`}
              >
                <Camera className="mr-2" />
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InterviewApp;
