import React, { useState, useEffect } from 'react'
import { BulletStartingPositions } from '../Utils'
import {v4 as uuidv4} from 'uuid'

export const Bullet = ({bulletPng, speed, startEdge, onDestroyBullet}) => {
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const bulletKey = uuidv4()

    const moveBullet = () => {
        switch (startEdge) {
            case BulletStartingPositions.TOP:
                setPosition((prevPosition) => ({
                    top: prevPosition.top + speed,
                    left: prevPosition.left,
                }))
                break
            case BulletStartingPositions.BOTTOM:
                setPosition((prevPosition) => ({
                    top: prevPosition.top - speed,
                    left: prevPosition.left,
                }))
                break
            case BulletStartingPositions.LEFT:
                setPosition((prevPosition) => ({
                    top: prevPosition.top,
                    left: prevPosition.left + speed,
                }))
                break
            case BulletStartingPositions.RIGHT:
                setPosition((prevPosition) => ({
                    top: prevPosition.top,
                    left: prevPosition.left - speed,
                }))
                break
            default:
                break
        }
    };

    const moveInterval = setInterval(() => {
        moveBullet();

        switch (startEdge) {
            case BulletStartingPositions.TOP:
                // Check if the bullet has reached the bottom of the screen
                if (position.top > window.innerHeight) {
                    clearInterval(moveInterval);
                    onDestroyBullet(bulletKey);
                }
                break
            case BulletStartingPositions.BOTTOM:
                // Check if the bullet has reached the top of the screen
                if (position.top < 0) {
                    clearInterval(moveInterval);
                    onDestroyBullet(bulletKey);
                }
                break
            case BulletStartingPositions.LEFT:
                // Check if the bullet has reached the right of the screen
                if (position.left > window.innerWidth) {
                    clearInterval(moveInterval);
                    onDestroyBullet(bulletKey);
                }
                break
            case BulletStartingPositions.RIGHT:
                // Check if the bullet has reached the left of the screen
                if (position.left < 0) {
                    clearInterval(moveInterval);
                    onDestroyBullet(bulletKey);
                }
                break
            default:
                break
        }
        
    }, 16);

    useEffect(() => {
        switch (startEdge) {
            case BulletStartingPositions.TOP:
                setPosition({ top: 0, left: Math.random() * window.innerWidth })
                break
            case BulletStartingPositions.BOTTOM:
                setPosition({ top: window.innerHeight, left: Math.random() * window.innerWidth })
                break
            case BulletStartingPositions.LEFT:
                setPosition({ top: Math.random() * window.innerHeight, left: 0 })
                break
            case BulletStartingPositions.RIGHT:
                setPosition({ top: Math.random() * window.innerHeight, left: window.innerWidth })
                break
            default:
                break
        }
    }, [])

    return (
        <img
            key={bulletKey}
            className="bullet"
            src={bulletPng}
            alt="bullet"
            style={{ top: position.top, left: position.left }}
        />
    )
}
