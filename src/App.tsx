import React, { createContext, useMemo, useState } from "react";
import "./App.css";

import { Wheel } from "react-custom-roulette";

import {
  Avatar,
  Box,
  CssBaseline,
  Dialog,
  DialogContent,
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
import CloseIcon from "@mui/icons-material/Close";
import logoBlack from "./assets/image.png";
import logoWhite from "./assets/ulsablanca.png";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const data = [
  {
    option: "Permiso para constituirse como persona moral",
    style: {
      fontSize: 7,
    },
  },
  {
    option: "Protocolización del Acta Constitutiva",
    style: {
      fontSize: 7.5,
    },
  },
  {
    option: "Inscripción en el Registro Federal de Contribuyentes",
    style: { textColor: "#f9dd50", fontSize: 6.5 },
  },
  {
    option: "Inscripción del Acta Constitutiva",
    style: {
      fontSize: 9,
    },
  },
  {
    option: "Inscripción de la Empresa",
    style: {
      fontSize: 9,
    },
  },
  {
    option: "Permiso de uso de suelo y/o Construcción",
  },
  {
    option: "Inscripción de la Empresa (Salud)",
    style: { textColor: "#70bbe0", fontSize: 8 },
  },
  { option: "Registro del patrón y los trabajadores (IMSS)" },
  {
    option: "Inscripción SIEM",
    style: {
      fontSize: 12,
    },
  },
  {
    option: "Establecimiento de la Comisión de Seguridad e Higiene",
    style: {
      fontSize: 6.5,
    },
  },
  {
    option: "Comisión de Capacitación y Adiestramiento",
    style: { textColor: "#f9dd50" },
  },
  {
    option:
      "Inscripción de los Planes y Programas de Capacitación y Adiestramiento",
    style: {
      fontSize: 4.5,
    },
  },
  {
    option: "Registro de marca ante el IMPI",
    style: {
      fontSize: 8,
    },
  },
  {
    option: "Registro de la empresa en la Secretaría de Economía",
    style: {
      fontSize: 6.5,
    },
  },
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
const outerBorderWidth = 0;
const innerBorderColor = "#30261a";
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineWidth = 8;
const fontFamily = "Quicksand";
const fontSize = 7;
const textDistance = 60;
const spinDuration = 1.0;

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openTriangle, setOpenTriangle] = useState(false);
  const [openSoft, setOpenSoft] = useState(false);
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
              padding: "20px",
              color: theme.palette.text.primary,
            }}
          >
            Trámites para la apertura de un negocio
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              paddingTop: 4,
            }}
          >
            {Number(ganador) >= 0 && (
              <Dialog
                fullWidth
                maxWidth="xl"
                open={openDetail}
                onClose={() => setOpenDetail(false)}
              >
                <DialogTitle>{dataText[Number(ganador)].titulo}</DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenDetail(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <iframe height={"800px"} src={getLink[Number(ganador)].link} />
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
            <Box
              sx={{
                width: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                textDistance={textDistance}
                onStopSpinning={() => {
                  setMustSpin(false);
                  const winningOption = getWinningOption(prizeNumber, data);
                  setOpenDetail(true);
                  const index = data.findIndex(
                    (item) => item.option === winningOption
                  );
                  setGanador(index);
                }}
              />
            </Box>
            <Box
              sx={{
                width: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                style={{ fontFamily: fontFamily }}
                className={"spin-button"}
                onClick={handleSpinClick}
              >
                GIRAR
              </button>
            </Box>
            <Typography
              sx={{ marginY: 2, color: theme.palette.text.primary }}
              variant="caption"
            >
              Powered by{" "}
              <a
                href="#"
                onClick={() => setOpenTriangle(true)}
                style={{ color: theme.palette.secondary.main }}
              >
                Triangle Programming&copy;
              </a>{" "}
              &{" "}
              <a
                href="#"
                onClick={() => setOpenSoft(true)}
                style={{ color: theme.palette.primary.main }}
              >
                {" "}
                Software4All&copy;
              </a>{" "}
              (2023) <br></br>para la materia Administración de Proyectos de
              Negocios, <br /> impartida por el Profesor{" "}
              <a
                href="https://www.linkedin.com/in/keymerinclan"
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                Keymer Inclán Robles
              </a>
            </Typography>
            <Box>
              {theme.palette.mode === "dark" ? (
                <img src={logoWhite} width="200vw" />
              ) : (
                <img src={logoBlack} width="200vw" />
              )}
            </Box>
          </Box>
          <Dialog open={openTriangle} onClose={() => setOpenTriangle(false)}>
            <DialogContent dividers>
              <Typography variant="h5">Integrantes del equipo</Typography>
              <Typography gutterBottom>
                * Felipe de Jésus Soriano Silva
                <br />
                * Azucena Reyes Santiago
                <br />
                * Ángel Ricardo Chávez Velasco
                <br />* Carlos Eduardo Cruz Gómez
              </Typography>
            </DialogContent>
          </Dialog>
          <Dialog open={openSoft} onClose={() => setOpenSoft(false)}>
            <DialogContent dividers>
              <Typography variant="h5">Integrantes del equipo</Typography>
              <Typography gutterBottom>
                * Jairo Esteban Martínez Portillo
                <br />
                * Octavio Agustín Celaya Ojeda
                <br />
                * Rafael Antonio López García
                <br />* Carlos Daniel Valdez Martínex
              </Typography>
            </DialogContent>
          </Dialog>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
};

export default App;
