import { useState } from "react";
import Board from "./Board";
import { Campeon } from "../functions/Campeon";
const Game = () => {
  const [historial, setHistorial] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [turnoNum, setTurnoNum] = useState(0);
  const [TurnoX, setTurnoX] = useState(true);

  const Cambio = (i) => {
    //Guardamos un array con todos los arrays de los cuadrados
    const ahistorial = historial.slice(0, turnoNum + 1);

    //Cogemos de todos los arrays el ultimo, es decir el actual
    const actual = ahistorial[ahistorial.length - 1];
    const squares = actual.squares.slice();

    if (Campeon(squares) || squares[i]) {
      return;
    }
    squares[i] = TurnoX ? "X" : "O";
    setHistorial(
      ahistorial.concat([
        {
          squares: squares,
        },
      ])
    );
    setTurnoNum(ahistorial.length);
    setTurnoX(!TurnoX);
  };

  const Saltar = (turno) => {
    setTurnoNum(turno);
    setTurnoX(turno % 2 === 0);
  };

  const actual = historial[turnoNum];
  const winner = Campeon(actual.squares);

  //imprimimos los botones para movernos en el historial
  const moves = historial.map((turno, move) => {
    const desc = move === 0 ? "Reiniciar" : "Ir al movimiento #" + move;
    return (
      <li key={move}>
        <button onClick={() => Saltar(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Campeon: " + winner;
  } else {
    status = "Siguiente Jugador: " + (TurnoX ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={actual.squares} onClick={(i) => Cambio(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
