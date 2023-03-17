import React, { createContext, useMemo, useState } from "react";
import "./App.css";

import { Wheel } from "react-custom-roulette";

import {
  Avatar,
  CssBaseline,
  Dialog,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsIcon from "@mui/icons-material/Settings";
import { getLink } from "./utils/data";
import LoopIcon from "@mui/icons-material/Loop";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const data = [
  { option: "Permiso" },
  { option: "Protocolización A. C." },
  {
    option: "Inscripción R. F. C.",
    style: { textColor: "#f9dd50" },
  },
  { option: "Inscripción A. C." },
  { option: "Inscripción E." },
  {
    option: "Permiso U. C. y/o C.",
  },
  { option: "Inscripción E. (Salud)", style: { textColor: "#70bbe0" } },
  { option: "Registro P. T. (IMSS)" },
  { option: "Inscripción SIEM" },
  { option: "Establecimiento C. S. H." },
  { option: "Comisión C. A.", style: { textColor: "#f9dd50" } },
  {
    option: "Inscripción P. P. C. A.",
  },
  { option: "Registro IMPI" },
  { option: "Registro E. S. E." },
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
const radiusLineWidth = 8;
const fontFamily = "Source Code Pro";
const fontSize = 11;
const textDistance = 60;
const spinDuration = 1.0;

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
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

  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <div className="App" style={{ fontFamily: fontFamily }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Typography
            variant="h2"
            sx={{
              fontFamily: fontFamily,
              marginTop: "20px",
              color: theme.palette.text.primary,
            }}
          >
            Trámites para la apertura de un negocio
          </Typography>
          <header className="App-header">
            {ganador && (
              <Dialog
                fullWidth
                maxWidth="xl"
                open={openDetail}
                onClose={() => setOpenDetail(false)}
              >
                <DialogTitle>{dataText[ganador].titulo}</DialogTitle>
                <iframe height={"800px"} src={getLink[ganador].link} />
              </Dialog>
            )}
            <Dialog
              fullWidth
              maxWidth={"sm"}
              open={openSettings}
              onClose={() => setOpenSettings(false)}
            >
              <DialogTitle>Configuración</DialogTitle>
              <List sx={{ pt: 0 }}>
                <ListItem disableGutters>
                  <ListItemButton
                    key={"a"}
                    onClick={colorMode.toggleColorMode}
                    color={"default"}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        {theme.palette.mode === "dark" ? (
                          <Brightness7Icon />
                        ) : (
                          <Brightness4Icon />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Modo"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Dialog>
            <Fab
              sx={{ position: "fixed", bottom: 15, right: 10 }}
              color="secondary"
              aria-label="add"
              onClick={() => setOpenSettings(true)}
            >
              <SettingsIcon />
            </Fab>
            <Fab
              sx={{ position: "fixed", bottom: 15, right: 80 }}
              color="secondary"
              aria-label="add"
              onClick={handleSpinClick}
            >
              <LoopIcon />
            </Fab>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={backgroundColors}
              textColors={textColors}
              fontFamily={fontFamily}
              fontSize={fontSize}
              outerBorderColor={theme.palette.background.default}
              outerBorderWidth={outerBorderWidth}
              innerRadius={innerRadius}
              innerBorderColor={theme.palette.background.paper}
              innerBorderWidth={innerBorderWidth}
              radiusLineColor={theme.palette.background.paper}
              radiusLineWidth={radiusLineWidth}
              spinDuration={spinDuration}
              startingOptionIndex={2}
              // perpendicularText
              textDistance={textDistance}
              onStopSpinning={() => {
                setMustSpin(false);
                const winningOption = getWinningOption(prizeNumber, data);
                console.log(`The winning option is ${winningOption}`);
                setOpenDetail(true);
                const index = data.findIndex((item) => item.option === winningOption);
                setGanador(index);
              }}
            />
            <button
              style={{ fontFamily: fontFamily }}
              className={"spin-button"}
              onClick={handleSpinClick}
            >
              GIRAR
            </button>
            <Typography
              sx={{ marginY: 2, color: theme.palette.text.primary }}
              variant="caption"
            >
              Powered by{" "}
              <span style={{ color: theme.palette.secondary.main }}>
                Triangle Programming&copy;
              </span>{" "}
              &{" "}
              <span style={{ color: theme.palette.primary.main }}>
                {" "}
                Software4All&copy;
              </span>{" "}
              (2023) <br></br>para la materia Administración de Proyectos de
              Negocios, <br /> impartida por el Profesor{" "}
              <a
                href="www.linkedin.com/in/keymerinclan"
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                Keymer Inclán Robles
              </a>
            </Typography>
          </header>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
};

export default App;
