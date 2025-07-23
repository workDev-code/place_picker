import {useState, useEffect} from 'react'


export default function ProgressBar({timer}){
      const [remainingTime, setRemainingTime] = useState(timer); // TIMER = 3000
    
      useEffect(() => {
    
        const intervalId = setInterval(() => {
            console.log("interval")
          setRemainingTime(prev => {
            if (prev <= 10) {
              clearInterval(intervalId); // 🛑 Stop when 0
              return 0;
            }
            return prev - 10;
          });
        }, 10);
    
        return () => clearInterval(intervalId); // 🧹 Cleanup when unmount or re-run
      }, [timer]);
    
    return(
          <progress
            value={remainingTime}
            max={timer}
            className="w-full mt-3 h-4 border border-gray-400 rounded-lg overflow-hidden
                    [&::-webkit-progress-bar]:bg-gray-100
                    [&::-webkit-progress-value]:bg-green-500"
            />
    );
}