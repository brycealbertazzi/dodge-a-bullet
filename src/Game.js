import React, {useState, useEffect, useRef} from 'react'
import ball from './assets/blackball.png'
import './Game.css'
import backgroundMusic from './assets/BackgroundMusic.mp3'
import bulletTop from './assets/BulletTop.png'
import bulletBottom from './assets/BulletBottom.png'
import bulletLeft from './assets/BulletLeft.png'
import bulletRight from './assets/BulletRight.png'
import { Bullet } from './components/Bullet'
import { BulletStartingPositions } from './Utils'

export const Game = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [score, setScore] = useState(0)
    const audioRef = useRef(null)
    const [gameInProgress, setGameInProgress] = useState(false)
    const [bullets, setBullets] = useState([])
    const bulletPngArray = [bulletTop, bulletBottom, bulletLeft, bulletRight]

    const startGame = () => {
        setGameInProgress(true)
        autoPlayBackgroundMusic()

        // Start on mouse move animation
        let animationFrameId
        const updateMousePosition = (e) => {
            animationFrameId = requestAnimationFrame(() => handleMouseMove(e))
        }
        document.addEventListener('mousemove', updateMousePosition)

        const intervalId = startBulletInstantion()

        return () => {
            document.removeEventListener('mousemove', updateMousePosition)
            cancelAnimationFrame(animationFrameId)
            clearInterval(intervalId)
        }
    }

    const gameOver = () => {
        setGameInProgress(false)
        resetBall()
        setScore(0)
        audioRef.current.pause()
        audioRef.current.currentTime = 0
    }

    const instantiateBullet = (startEdge, bulletPng) => {
        const bullet = <Bullet
            bulletPng={bulletPng}
            speed={20}
            startEdge={startEdge}
            onDestroyBullet={onDestroyBullet}
        />
        setBullets(prevBullets => {
            return [
                ...prevBullets,
                bullet
            ]
        })
    }

    // Begin instantiating bullets on screen at a specified interval, this will continue until the game is over
    const startBulletInstantion = () => {
        const bulletInstantiationInterval = setInterval(() => {
            // Generate a random number between 0 and 3 for the startEdge
            const rand = Math.floor(Math.random() * 4)
            instantiateBullet(Object.values(BulletStartingPositions)[rand], bulletPngArray[rand])
        }, 1000)
        return bulletInstantiationInterval
    }

    const onDestroyBullet = (key) => {
        // Remove the bullet with key from the screen
    }

    const autoPlayBackgroundMusic = () => {
        if (audioRef.current) {
            audioRef.current.play()
        }
    }

    const resetBall = () => {
        const startPosition = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
        setPosition(startPosition)
    }

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        const newPosition = {
            x: clientX - 50,
            y: clientY - 50,
        }
        setPosition(newPosition)
    }

    useEffect(() => {
        console.log(bullets)
    }, [bullets])

    useEffect(() => {
        resetBall()
        window.addEventListener('resize', () => {
            resetBall()
        })
    }, [])

    return (
        <div className='background'>
            <audio ref={audioRef} src={backgroundMusic} type="audio/mp3" />
            <div className='top-of-screen'>
                <div></div>
                <h1 className='game-title'>DODGE A BULLET</h1>
                <h1 className='score'>{score}</h1>
            </div>
            <div className="ball-container">
                <img
                    src={ball}
                    alt="BlackBall"
                    style={{ position: 'absolute', top: position.y, left: position.x, width: '100px', height: '100px' }}
                />
            </div>
            <div>
                <button hidden={gameInProgress} className='start-button' onClick={() => startGame()}>START</button>
            </div>
            {/* Show bullets on screen, they will be moving and start at any edge of the screen */}
            <div>
                {bullets}
            </div>
        </div>
    )
}
