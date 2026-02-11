import {useState, useEffect} from 'react';
import { Play, RotateCcw } from 'lucide-react';

function CountDown() {
    const [inputMinutes, setInputMinutes] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    
    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (seconds === 0 && isActive) {
            clearInterval(interval);
            setIsActive(false);
            setIsCompleted(true);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);
    
    const handleChange = (e) => {
        const value = e.target.value;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) <= 120)) {
            setInputMinutes(value);
        }
    };
    
    const startTimer = () => {
        if (inputMinutes !== '' && parseInt(inputMinutes) > 0) {
            setSeconds(parseInt(inputMinutes) * 60);
            setIsActive(true);
            setIsCompleted(false);
            setInputMinutes('');
        }
    };
    
    const resetTimer = () => {
        setSeconds(0);
        setIsActive(false);
        setIsCompleted(false);
        setInputMinutes('');
    };
    
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return { minutes, secs };
    };

    const { minutes, secs } = formatTime(seconds);
    const isWarning = seconds <= 300 && seconds > 0;
     
    return(
        <div className="min-h-screen flex flex-col bg-black">
            {/* Top Bar with Brand and Controls */}
            {!isActive && (
                <div className="w-full px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10">
                    {/* Brand */}
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-1 bg-white rounded-full" />
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                TOBBA VISUALS
                            </h1>
                            <p className="text-sm tracking-wider text-white/60">
                                EVENT COUNTDOWN SYSTEM
                            </p>
                        </div>
                    </div>

                    {/* Control Panel */}
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">

                        <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none">
                            <input
                                type="number"
                                value={inputMinutes}
                                onChange={handleChange}
                                placeholder="Minutes"
                                className="flex-1 sm:flex-none w-full sm:w-32 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 bg-black border-white/20 text-white placeholder-white/40 outline-none text-base sm:text-lg font-semibold focus:border-white/40"
                            />
                            <button 
                                onClick={startTimer} 
                                disabled={inputMinutes === '' || inputMinutes === '0'}
                                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold flex items-center gap-2 bg-white text-black disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base"
                            >
                                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                                START
                            </button>
                        </div>

                        {(isActive || isCompleted) && (
                            <button 
                                onClick={resetTimer}
                                className="px-6 py-3 rounded-lg font-bold flex items-center gap-2 bg-white/10 text-white border-2 border-white/20 cursor-pointer"
                            >
                                <RotateCcw className="w-5 h-5" />
                                RESET
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Main Timer Display */}
            <div className={`flex items-center justify-center ${isActive ? 'min-h-screen' : 'flex-1 px-4 sm:px-8 py-8 sm:py-16'}`}>
                {!isCompleted ? (
                    <div className="text-center w-full">
                        {/* Timer Display */}
                        <div className={`flex items-center justify-center mb-6 sm:mb-12 ${
                            isActive ? 'gap-6 sm:gap-10 md:gap-16' : 'gap-3 sm:gap-6 md:gap-8'
                        }`}>
                            {/* Minutes */}
                            <div>
                                <div className={`px-16 py-12 rounded-3xl border-4 bg-black`}>
                                    <div className={`font-black tracking-tighter tabular-nums ${
                                        isWarning ? 'text-red-600' : 'text-white'
                                    } text-[5rem] sm:text-8xl md:text-[14rem] lg:text-[35rem]`}>
                                        {String(minutes).padStart(2, '0')}
                                    </div>
                                    {/* <div className="text-2xl font-bold tracking-widest mt-4 uppercase text-white/60">
                                        Minutes
                                    </div> */}
                                </div>
                            </div>

                            {/* Separator */}
                            <div className={`font-black ${
                                isWarning ? 'text-red-600' : 'text-white/20'
                            } text-6xl sm:text-8xl md:text-9xl lg:text-[8rem]`}>
                                :
                            </div>

                            {/* Seconds */}
                            <div>
                                <div className="px-16 py-12 rounded-3xl border-4 bg-black">
                                    <div className={`font-black tracking-tighter tabular-nums ${
                                        isWarning ? 'text-red-600' : 'text-white'
                                    } text-[5rem] sm:text-8xl md:text-[14rem] lg:text-[35rem]`}>
                                        {String(secs).padStart(2, '0')}
                                    </div>
                                    {/* <div className="text-2xl font-bold tracking-widest mt-4 uppercase text-white/60">
                                        Seconds
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Status Indicator - Only show when NOT active */}
                        {!isActive && (
                            <div className="space-y-4">
                                {seconds === 0 && (
                                    <p className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wider uppercase text-white/40">
                                        Enter Minutes to Start
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    // Completion Screen
                    <div className="text-center px-4">
                        <div className="inline-block px-24 py-16 rounded-3xl">
                            {/* <div className="text-9xl mb-6">⏰</div> */}
                            <h2 className="text-[6rem] sm:text-6xl md:text-[12rem] lg:text-[18rem] font-black tracking-tight mb-3 sm:mb-4 text-red-500">
                                TIME'S UP!
                            </h2>
                            {/* <p className="text-3xl font-bold tracking-wider uppercase text-white/60">
                                The countdown has completed
                            </p> */}
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Controls*/}
            {isActive && (
                <div className="fixed bottom-8 right-8 flex items-center gap-3 z-50">
                    <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                        <input
                            type="number"
                            value={inputMinutes}
                            onChange={handleChange}
                            placeholder="Min"
                            className="w-16 px-2 py-1 rounded border bg-black border-white/20 text-white placeholder-white/40 outline-none text-sm font-semibold focus:border-white/40"
                        />
                        <button 
                            onClick={startTimer} 
                            disabled={inputMinutes === '' || inputMinutes === '0'}
                            className="px-3 py-1 rounded font-bold flex items-center gap-1 bg-white/10 text-white border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-xs"
                        >
                            <Play className="w-3 h-3" />
                            NEW
                        </button>
                    </div>
                    <button 
                        onClick={resetTimer}
                        className="px-4 py-3 rounded-lg font-bold flex items-center gap-2 bg-black/80 backdrop-blur-sm text-white border border-white/20 cursor-pointer"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Bottom Bar */}
            {!isActive && (
                <div className="w-full px-4 sm:px-8 py-3 sm:py-4 border-t border-white/10 flex items-center justify-center">
                    <p className="text-xs sm:text-sm tracking-widest uppercase text-white/40 text-center">
                        Powered by Tobba Visuals And Productions • Professional Event Live Production
                    </p>
                </div>
            )}
        </div>
    );
}

export default CountDown;