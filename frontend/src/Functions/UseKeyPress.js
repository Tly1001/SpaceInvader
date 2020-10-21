import React, { useState, useEffect, useRef } from 'react'

const UseKeyPress = (event, player) => {
  // State for keeping track of whether key is pressed
  // const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  const downHandler = ( event, player) => {
    const key = event.key

    console.log(key, 'pressed')
    // if (key !==  keyPressed) setKeyPressed(key)
    
    //* new player allocation
    let hori = player.hori

    //* Key bindings
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
    // setPlayer(newPlayer)
    // console.log(player, 'current', newPlayer, 'new')

    // //* Update grid
    // createGrid(newPlayer)

    return newPlayer
  }

  // If released key is our target key then set to false
  const upHandler = (event, player) => {
    console.log(event.key, 'released')
    // console.log(event.type) gives keyup
    // if (event.key !== keyPressed) setKeyPressed(false);
  }

  //* Determine whether it is a key up of key down
  return event.type === 'keydown' ? downHandler(event, player) :upHandler(event, player)
}

export default UseKeyPress