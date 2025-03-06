import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchExercisesBySearch, fetchBodyParts } from "../utils/fetchdata";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [searchedExercises, setSearchedExercises] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchBodyPartsData = async () => {
      const bodyPartsData = await fetchBodyParts();
      setBodyParts(["all", ...bodyPartsData]);
    };

    fetchBodyPartsData();
  }, []);

  const handleSearch = async () => {
    console.log("Iniciando búsqueda con término:", search);
    
    if (!search.trim()) {
      setSearchedExercises([]);
      setExercises([]);
      return;
    }
    
    setIsSearching(true);
  
    try {
      const exerciseData = await fetchExercisesBySearch(search);
      
      if (!exerciseData || !exerciseData.results || exerciseData.results.length === 0) {
        console.log("No se encontraron ejercicios");
        setSearchedExercises([]);
        setExercises([]);
      } else {
        console.log(`Se encontraron ${exerciseData.results.length} ejercicios`);
        setSearchedExercises(exerciseData.results);
        setExercises(exerciseData.results);
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setSearchedExercises([]);
      setExercises([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      mt="37px"
      p="20px"
      width="100%"
      sx={{ width: "100%", maxWidth: "1270px", overflow: "hidden" }}
    >
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="49px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>

      {/* Búsqueda */}
      <Box position="relative" mb="72px" display="flex" justifyContent="center" width="100%">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "70%", xs: "80%" }, // Ajustado para dispositivos móviles
            backgroundColor: "#fff",
            borderRadius: "40px",
            padding: "0 16px", // Añadido padding para mejorar la apariencia en dispositivos móviles
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "173px", xs: "70px" }, // Ajustado para pantallas más pequeñas
            height: "56px",
            position: "absolute",
            right: { lg: "0px", xs: "10px" },
            fontSize: { lg: "20px", xs: "12px" }, // Tamaño de fuente más pequeño en móvil
          }}
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? "Buscando..." : "Search"}
        </Button>
      </Box>

      {/* Scroll de Partes del Cuerpo */}
      <Box sx={{ position: "static", width: "100%", p: "15px", overflowX: "hidden" }}>
        <HorizontalScrollbar data={bodyParts} bodyParts={bodyParts} setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
