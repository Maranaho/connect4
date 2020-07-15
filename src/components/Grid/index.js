import React, { useState, useEffect } from 'react'
import './Grid.css'

const Token = ({turn,drop}) => <div
  style={drop}
  className={`token ${turn ? 'p2' : 'p1'}`}>
  Player{turn ? 1 : 2}
</div>

const Grid = ()=>{
  const row = 7
  const line = 6
  const [ game,setGame ] = useState(null)
  const [ turn,setTurn ] = useState(true)
  const [ huhuh,setHuhuh ] = useState(false)

  const top = -300
  const [ drop,setDrop ] = useState({ease:0,x:0,y:top})

  const size = 100
  const roWbuilder = []
  const lineBuilder = []
  const dimensions = {
    'width': row * size,
    'height': line * size
  }
  const ease = 'cubic-bezier(0.49, 0.07, 0.97, 0.63)'
  const masterTime = 50

  const checkWin = (game,column) => {
    console.log(column)
  }



  const handleCellClick =e=>{
    const selectedCol = Number(e.target.getAttribute('a'))
    checkWin(game,selectedCol)
    if (game[selectedCol].count >= line) {
      handleFullRowClick()
      return
    }
    const current = [...game]
    const transition = ((line-1) - current[selectedCol].count) * masterTime
    setTurn(!turn)
    dropAToken(selectedCol,selectedCol,transition)
    setTimeout(()=>{
      current[selectedCol].player[(line-1) - current[selectedCol].count] = turn
      current[selectedCol].count++
      setGame(current)
    },transition)
  }

  const dropAToken= (currRow,currLine,transition) =>{
    let drop = {
      ease: 0,
      x: currRow * 100,
      y: top
    }
    setDrop(drop)
    setTimeout(()=>{
      drop = {
        ease: transition/1000,
        x: currRow * 100,
        y: currLine * 100
      }
      setDrop(drop)
    },1)
    setTimeout(()=>{
      drop = {
        ease:0,
        x:0,
        y: top
      }
      setDrop(drop)
    },transition)
  }


  const handleFullRowClick = ()=> {
    setHuhuh(true)
    setTimeout(()=>{setHuhuh(false)},1000)
  }

  const init=()=> {
    for (let a = 0; a < row; a++) {
      roWbuilder.push(a)
    }

    for (let a = 0; a < line; a++) {
      lineBuilder.push(a)
    }
  }
/*
  const handleRowChange=e=>{
    setRow(Number(e.target.value))
    const current = [...game]

  }
  const handleLineChange=e=>{
    setLine(Number(e.target.value))
    const current = [...game]
  }
  */


  const setup =()=>{
    let game = []
    for (let a = 0; a < row; a++) {
      let players = []
      for (let b = 0; b < line; b++) {
        players.push(null)
      }
      game.push({count:0,player:players})
    }
    setGame(game)
    return
  }

  useEffect(()=>setup(),[])

  init()

  return (
    <div>
      {/*<input type="number" value={row} min="1" max={8} onChange={handleRowChange}/>
    <input type="number" value={line} min="1" max={7} onChange={handleLineChange}/>*/}
      <article className={huhuh ? 'show huhuh' : 'huhuh'}>huhuh</article>
      <Token
        drop={{
          'transition': drop.ease+'s '+ ease + '0s',
          'transform': 'translate('+ drop.x +'px,'+ drop.y +'px)'
        }}
        turn={turn}/>
      <div className="stack">
        <main className="Grid"  onClick={handleCellClick} style={dimensions}>
          {roWbuilder.map((g,a)=>(
            <section key={a}>
              {lineBuilder.map((r,b)=>(
                  <article key={b+'row'} a={a}>
                      <i>{`R${a} - L${b}`}</i>
                  </article>
                )
              )}
            </section>
          ))}
        </main>
        <main className="tokens"  style={dimensions}>
          {roWbuilder.map((g,a)=>(
            <section key={a}>
              {lineBuilder.map((r,b)=>{
                let css = ''
                if (game !== null && game[a].player[b] !== null) {
                  css = game[a].player[b] ? 'p1' : 'p2'
                }
                return <article className={css} key={b}></article>})}
            </section>
          ))}
        </main>
      </div>
    </div>
)}

export default Grid
