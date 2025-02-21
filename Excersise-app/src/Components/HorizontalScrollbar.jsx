import { Box } from "@mui/material";
import BodyPart from "./BodyPart";
import "react-horizontal-scrolling-menu/dist/styles.css";

import ExerciseCard from "./ExerciseCard";

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  return (
    <Box
     sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", // Tamaño más pequeño
        gap: "100px", // Menos espacio entre elementos
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      {data.map((item) => (
        <Box key={item.id || item}>
          {bodyParts ? (
            <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
          ) : (
            <ExerciseCard exercise={item} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default HorizontalScrollbar;
