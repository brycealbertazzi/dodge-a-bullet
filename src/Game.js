import React, {useState, useEffect, useRef} from 'react'
import ball from './blackball.jpg'

export const Game = () => {
    const positionRef = useRef({ x: 0, y: 0 })
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const speed = 20
    const boundaries = {
        lowerX: 0,
        lowerY: 0,
        upperX: window.innerWidth - 150,
        upperY: window.innerHeight - 150
    }

    const resetBall = () => {
        const startPosition = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
        positionRef.current = startPosition
        setPosition(startPosition)
    }

    const canMoveInDirection = (key) => {
        let canMove = true
        switch (key) {
            case 'w':
                canMove = positionRef.current.y > boundaries.lowerY
                if (!canMove) positionRef.current.y = boundaries.lowerY
                return canMove
            case 'a':
                canMove = positionRef.current.x > boundaries.lowerX
                if (!canMove) positionRef.current.x = boundaries.lowerX
                return positionRef.current.x > boundaries.lowerX
            case 's':
                canMove = positionRef.current.y < boundaries.upperY
                if (!canMove) positionRef.current.y = boundaries.upperY
                return positionRef.current.y < boundaries.upperY
            case 'd':
                canMove = positionRef.current.x < boundaries.upperX
                if (!canMove) positionRef.current.x = boundaries.upperX
                return positionRef.current.x < boundaries.upperX
            default:
                return false
        }
    }

    const handleKeyDown = (e) => {
        console.log(positionRef.current)
        const key = e.key
        // Handle WASD keys
        if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
            if (!canMoveInDirection(key)) return
            const newPosition = {
                x: positionRef.current.x + (key === 'd' ? speed : key === 'a' ? -speed : 0),
                y: positionRef.current.y + (key === 's' ? speed : key === 'w' ? -speed : 0)
            }
            positionRef.current = newPosition
            setPosition(positionRef.current)
        }
    }

    const addEventListeners = () => {
        window.addEventListener('resize', () => {
            resetBall()
        })
        window.addEventListener('keypress', handleKeyDown)
    }

    useEffect(() => {
        addEventListeners()
        resetBall()
    }, [])

    return (
        <div>
            <div className="ball-container">
                <img
                    src={ball}
                    alt="BlackBall"
                    style={{ position: 'absolute', top: position.y, left: position.x, width: '100px', height: '100px' }}
                />
            </div>
        </div>
    )
}
