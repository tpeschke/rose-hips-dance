import { useState } from 'react'
import './hamburgerMenuIcon.css'

export default function HamburgerMenuIcon({isOpen, setIsOpen}: {isOpen: Boolean, setIsOpen: Function}) {
    return (
        <div id="nav-icon" className={isOpen ? 'open' : ''} onClick={_ => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}