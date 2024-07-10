import React, { useEffect, useState } from "react";
import { useDraggable } from "../../../contexts/user/DraggableContext";
import { useCardStyles, useUnmountEffect } from "@chakra-ui/react";
import { useAuth } from "../../../contexts/auth/AuthContext";

const Stopwatch = () => {
  const { session, userInfo, userPreferences, loading } = useAuth();
  const [draggableRef, dx, dy, angle] = useDraggable();

  // is the timer running?
  const [isRunning, setIsRunning] = useState(false);

  // has the timer run to completion (ie. not reset by user)
  const [isDone, setIsDone] = useState(false);

  // duration of most recent complete session
  const [duration, setDuration] = useState(0);

  const [minutes, setMinutes] = useState(Math.floor((angle / 360) * 120));
  const [seconds, setSeconds] = useState(0);

  // ensure value gets updated when dragging
  useEffect(() => {
    setMinutes(Math.floor((angle / 360) * 120));
  }, [angle]);

  // timer logic
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(async () => {
        if (seconds > 0) {
          setSeconds((s) => s - 1);
        } else if (minutes > 0) {
          setMinutes((m) => m - 1);
          setSeconds(59);
        } else {
          // timer has run to completion
          setIsDone(true);
          setIsRunning(false);
          console.log(duration);
          setDuration(Math.floor((angle / 360) * 120));
          console.log(duration);
          setMinutes(Math.floor((angle / 360) * 120));
          setSeconds(0);

          const currDuration = Math.floor((angle / 360) * 120);
          console.log(currDuration);
          const newLog = {
            id: session?.user.id,
            name: userInfo?.name,
            duration: currDuration,
          };

          try {
            await fetch(`${"http://localhost:4000"}/api/newtimer`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newLog),
            });
          } catch (error) {
            console.error("Error saving response:", error);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [minutes, seconds, isRunning]);

  const handleStart = () => {
    setIsDone(false);
    setIsRunning(true);
    setMinutes(Math.floor((angle / 360) * 120));
  };

  const handleStop = () => {
    setIsRunning(false);
    setMinutes(Math.floor((angle / 360) * 120));
    setSeconds(0);
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full h-full flex flex-col justify-center">
        <div className="w-[330px] h-[330px] bg-orange-950 rounded-full mx-auto my-auto flex justify-center">
          <div className=" w-[300px] h-[300px] bg-orange-100 rounded-full mx-auto my-auto">
            {!isRunning && (
              <div
                className="h-8 w-8 rounded-full z-100
           bg-gray-300 border-4 border-white"
                ref={draggableRef}
                style={{
                  position: "absolute",
                  cursor: "move",
                  userSelect: "none",
                  touchAction: "none",
                  transform: `translate(${dx}px, ${dy}px)`,
                }}
              />
            )}

            <div className="flex justify-center h-full w-full">
              <div className="flex flex-col justify-center">
                <p className="font-bold text-4xl">
                  {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                </p>
                {isDone ? (
                  <p className="text-gray-500 text-md p-2">
                    You stayed focused for {duration} minute(s).
                  </p>
                ) : (
                  <p className="text-gray-500 text-md p-1">minutes</p>
                )}
              </div>
            </div>

            {!isRunning ? (
              <div className="pt-8">
                <p className="text-gray-700 text-lg italic">
                  Start a study session now!
                </p>
              </div>
            ) : (
              <div className="pt-8">
                <p className="text-gray-700 text-lg italic">
                  Resetting the timer will delete your current progress.
                </p>
              </div>
            )}

            <div className="p-2">
              <button
                className="rounded-2xl bg-orange-950 text-white"
                onClick={isRunning && !isDone ? handleStop : handleStart}
                disabled={angle === 0}
              >
                <p className="p-2">
                  {isRunning ? "Reset Timer" : "Start Timer"}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
