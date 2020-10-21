import React, { useState, useEffect, useRef } from 'react'
import UseKeyPress from './Functions/UseKeyPress'
// import { useLocation } from 'react-router-dom'

const App = () => {
  const [grid, setGrid] = useState(null)
  const [player, setPlayer] = useState({vert: 14, hori: 5 })
  const [keyPressed, setKeyPressed] = useState(false);
  const { pathname } = window.location.href

  const playerRef = useRef({});
  playerRef.current = player;

  const createGrid = ({vert, hori}) => {
    const height = 15
    const width = 10
    let grid = Array(height).fill().map(x => Array(width).fill("+"))
    grid[vert][hori] = 'player'
    setGrid(grid)
    }

    const downHandler = ( event, player) => {
      const key = event.key

      console.log(key, 'pressed')
      if (key !==  keyPressed) setKeyPressed(key)
      
      //* new player allocation
      let hori = player.hori

      switch (key) {
      // Move right
      case 'ArrowRight': if (hori < 9) hori += 1
      break
  
      // Move Left
      case 'ArrowLeft': if (hori > 0) hori -= 1
        break

      // Shoot / space bar
      case ' ': console.log('shoot')
        break
    }
  
      let newPlayer = { ...player, hori }
      setPlayer(newPlayer)
      // console.log(player, 'current', newPlayer, 'new')

      //* Update grid
      createGrid(newPlayer)
    }

    const upHandler = (event, player) => {
      console.log(event.key, 'released')
      // console.log(event.type) gives keyup
      if (event.key !== keyPressed) setKeyPressed(false);
    }

    //* Determine whether it is a key up of key down(for the hook)
    const handleKeyEvent = (event, arg) => event.type === 'keydown' ? 
    downHandler(event, arg) :
    upHandler(event, arg)

  useEffect(() => {
    createGrid(playerRef.current)
    //* Event handler for pressed keys
    // window.addEventListener('keydown', 
    // (event) => setGrid(UseKeyPress(event, playerRef.current)),
    // (event) => createGrid(UseKeyPress(event, playerRef.current)));
    window.addEventListener('keydown', 
    (event) => { 
      const newLocation = UseKeyPress(event, playerRef.current)
      setPlayer(newLocation)
      // setGrid(newLocation)
      createGrid(newLocation)
    })

    //* Event handler for lifted keys
    window.addEventListener("keyup", (event) => UseKeyPress(event, playerRef.current));
    
    // //* To see if player position is updating
    setInterval(() => console.log(playerRef.current), 2500 );

    // //* update grid
    // setInterval(() => createGrid(playerRef.current), 2500 );

  return () => {
    window.removeEventListener("keydown", (event) => handleKeyEvent(event, player));
    window.removeEventListener("keyup", (event) => handleKeyEvent(event, player));
    };
  }, [pathname])

  if (!grid) return null
  return (
    <>
    <h1>Space Invaders</h1>
    <div className='grid'>
    { 
    grid.map( (row, index) => (<div prop={`grid-row${index}`} className='column'>
        {row.map( (sq, i) => (<div prop={`grid-col${index,i}`} className={`square ${sq}`}>{sq}</div>))}
      </div>)) 
    }
    </div>
    </>
  )
}

export default App
