  import { Stack, Typography, Box, TextField, Button } from '@mui/material'
  import { useEffect, useState } from 'react'
  import { exerciseOptions, fetchData } from '../utils/fetchdata'
  import HorizontalScrollbar from './HorizontalScrollbar'

  const SearchExercises = ({ setExercises, bodyPart, setBodyPart}) => {
    const [search, setSearch] = useState('')
    const [bodyParts, setBodyParts] = useState([])

    useEffect(() => {
      const fetchExercisesData = async () => {
        const exercisesData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions
        );
    
        // Extrae solo los nombres únicos de las partes del cuerpo
        const bodyPartsList = ['all', ...new Set(exercisesData.map((exercise) => exercise.bodyPart))];
    
        setBodyParts(bodyPartsList);
      };
    
      fetchExercisesData(); 
    }, [])
    
    const handleSearch = async () => {
      if (search) {
        const exerciseData = await fetchData(
            'https://exercisedb.p.rapidapi.com/exercises',
            exerciseOptions
        );
        console.log(exerciseData);
        const searchedExercises = exerciseData.filter(
          (exercise) => exercise.name.toLowerCase().includes(search),
          exercise.target.toLowerCase().includes(search),
          exercise.equipment.toLowerCase().includes(search),
          exercise.bodyPart.toLowerCase().includes(search)
        );
        setSearch('');
        setExercises(searchedExercises)
    }
    }
    return (
      <Stack 
        alignItems="center" 
        justifyContent="center" 
        mt="37px" 
        p="20px" 
        width= "1170px" 
        sx={{ width: "1170px", maxWidth: "1170px", overflow: "hidden" }}
        >
        <Typography 
          fontWeight={700} 
          sx={{ fontSize: { lg: '44px', xs: '30px' } }} 
          mb="49px" 
          textAlign="center"
        >
          Awesome Exercises You <br /> Should Know
        </Typography>
        <Box 
          position="relative" 
          mb="72px" 
          display="flex" 
          justifyContent="center" 
          width="100%"
        >
          <TextField
            sx={{ 
              input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, 
              width: { lg: '1170px', xs: '90%' }, // 🔹 Hace que el input se adapte mejor a la pantalla
              backgroundColor: '#fff', 
              borderRadius: '40px' 
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Exercises"
            type="text"
          />
          <Button 
            className="search-btn" 
            sx={{ 
              bgcolor: '#FF2625', 
              color: '#fff', 
              textTransform: 'none', 
              width: { lg: '173px', xs: '80px' }, 
              height: '56px', 
              position: 'absolute', 
              right: { lg: '0px', xs: '10px' }, 
              fontSize: { lg: '20px', xs: '14px' } 
            }} 
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
        <Box sx={{ position: 'static', width: '100%', p: '20px', overflowX: 'hidden' }}>
        <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
        </Box>
      </Stack>
    )
  }

  export default SearchExercises