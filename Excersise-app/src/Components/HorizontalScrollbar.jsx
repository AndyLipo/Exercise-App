
import { Box } from "@mui/material";
import BodyPart from "./BodyPart";
import "react-horizontal-scrolling-menu/dist/styles.css";
import ExerciseCard from "./ExerciseCard";

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  return (
    <Box
  sx={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // Esto crea 3 columnas iguales
    gap: "200px",
    overflowX: "auto",
    padding: "10px",
    // Para un mejor desplazamiento
    scrollBehavior: "smooth",
    "-webkit-overflow-scrolling": "touch",
    "&::-webkit-scrollbar": {
      height: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
    },
  }}
>
  {data.map((item) => (
    <Box 
      key={item.id || item}
      sx={{
        flexShrink: 0,
        minWidth: "200px",  // Ancho mínimo para cada tarjeta
        maxWidth: "250px",  // Ancho máximo opcional
      }}
    >
      {bodyParts ? (
        <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
      ) : (
        <ExerciseCard exercise={item} />
      )}
    </Box>
  ))}
</Box>
  )
};

export default HorizontalScrollbar;