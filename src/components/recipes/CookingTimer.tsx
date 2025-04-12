import { useState, useEffect } from 'react';
import { AlertCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface CookingTimerProps {
  time: number; // time in minutes
  onClose: () => void;
}

export function CookingTimer({ time, onClose }: CookingTimerProps) {
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(time * 60);
  const [showAlert, setShowAlert] = useState(false);

  const totalSeconds = time * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setShowAlert(true);
      // Play a sound or show notification
      // This is a mock alert, in a real app you would use Web Notifications API
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3');
      audio.play().catch(() => {
        // Fallback if audio play fails (e.g., due to autoplay restrictions)
        console.log('Audio play failed - autoplay might be blocked');
      });
    }

    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    if (minutes > 0 || hours > 0) {
      parts.push(`${minutes.toString().padStart(2, '0')}m`);
    }
    parts.push(`${secs.toString().padStart(2, '0')}s`);

    return parts.join(' ');
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(time * 60);
    setShowAlert(false);
  };

  return (
    <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-auto max-h-96 sm:max-w-md sm:rounded-t-lg">
        <SheetHeader>
          <SheetTitle className="text-center">Cooking Timer</SheetTitle>
          <SheetDescription className="text-center">
            Timer for {time} minute{time !== 1 ? 's' : ''}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="mb-3 text-4xl font-bold tabular-nums">
                {formatTime(secondsLeft)}
              </div>
              <Progress value={progress} className="h-2 w-48" />
            </div>
          </div>

          {showAlert && (
            <div className="mx-auto flex max-w-sm items-center gap-2 rounded-md bg-yellow-100 p-3 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">
                Time's up! Your food is ready.
              </span>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={handleToggle}>
              {isActive ? 'Pause' : secondsLeft === totalSeconds ? 'Start' : 'Resume'}
            </Button>
            <Button variant="outline" size="lg" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
