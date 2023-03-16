import React, { useState } from "react";
import "./App.css";

import { Wheel } from "react-custom-roulette";

const data = [
  { option: "1" },
  { option: "2" },
  { option: "3", style: { textColor: "#f9dd50" } },
  { option: "4 " },
  { option: "5" },
  { option: "6" },
  { option: "7", style: { textColor: "#70bbe0" } },
  { option: "8" },
  { option: "9" },
  { option: "10" },
  { option: "11", style: { textColor: "#f9dd50" } },
  { option: "12" },
  { option: "13" },
  { option: "14" },
];

const dataText = [
  { titulo: "Permiso para constituirse como persona moral" },
  { titulo: "Protocolización del Acta Constitutiva" },
  { titulo: "Inscripción en el Registro Federal de Contribuyentes" },
  { titulo: "Inscripción del Acta Constitutiva" },
  { titulo: "Inscripción de la Empresa" },
  { titulo: "Permiso de uso de suelo y/o Construcción" },
  { titulo: "Inscripción de la Empresa (Salud)" },
  { titulo: "Registro del patrón y los trabajadores (IMSS)" },
  { titulo: "Inscripción en el SIEM" },
  { titulo: "Establecimiento de la Comisión de Seguridad e Higiene" },
  { titulo: "Comisión de Capacitación y Adiestramiento" },
  {
    titulo:
      "Inscripción de los Planes y Programas de Capacitación y Adiestramiento",
  },
  { titulo: "Registro de marca ante el IMPI" },
  { titulo: "Registro de la empresa en la Secretaría de Economía" },
];

const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#f9dd50"];
const textColors = ["#0b3351"];
const outerBorderColor = "#eeeeee";
const outerBorderWidth = 10;
const innerBorderColor = "#30261a";
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = "#eeeeee";
const radiusLineWidth = 8;
const fontFamily = "Nunito";
const fontSize = 20;
const textDistance = 60;
const spinDuration = 1.0;

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [ganador, setGanador] = useState<number | undefined>(undefined);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const getWinningOption = (prizeNumber: any, data: any) => {
    return data[prizeNumber].option;
  };

  return (
    <div className="App">
      <header className="App-header">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={backgroundColors}
          textColors={textColors}
          fontFamily={fontFamily}
          fontSize={fontSize}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          spinDuration={spinDuration}
          startingOptionIndex={2}
          // perpendicularText
          textDistance={textDistance}
          onStopSpinning={() => {
            setMustSpin(false);
            const winningOption = getWinningOption(prizeNumber, data);
            console.log(`The winning option is ${winningOption}`);
            setGanador(parseInt(winningOption) - 1);
          }}
        />
        <button className={"spin-button"} onClick={handleSpinClick}>
          SPIN
        </button>
        <p style={{ color: "black" }}>
          {ganador ? dataText[ganador].titulo : null}
          <br />
          {ganador ? (
            <img src="http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/387c850f1455fab.png" />
          ) : null}
          <br />
          {ganador ? "La descripcion" : null}
          <br />
        </p>
      </header>
    </div>
  );
};

export default App;
