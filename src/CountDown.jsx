import {useState, useEffect} from 'react';

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
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
     
    return(
        <>
            <div className="timer">
                {/* <h1>Countdown Timer</h1> */}
                {(!isActive && !isCompleted) && (
                    <div className="input-section">
                        <input
                            type="number"
                            value={inputMinutes}
                            onChange={handleChange}
                            placeholder="Enter minutes (max 120)"
                        />
                        <button onClick={startTimer} disabled={inputMinutes === '' || inputMinutes === '0'}>
                            Start
                        </button>
                    </div>
                )}
                <div className="time">
                    {formatTime(seconds)}
                </div>
                {(isActive || isCompleted) && (
                    <button className='resetButton' onClick={resetTimer}>
                    Reset
                    </button>
                )}
                {isCompleted && <div className="completed">Your Time Is Up!</div>}
            </div>
        </>
    );
}

export default CountDown;