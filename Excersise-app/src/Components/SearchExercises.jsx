  // import { Stack, Typography, Box, TextField, Button } from '@mui/material'
  // import { useEffect, useState } from 'react'
  // import { exerciseOptions, fetchData } from '../utils/fetchdata'
  // import HorizontalScrollbar from './HorizontalScrollbar'

  // const SearchExercises = ({ setExercises, bodyPart, setBodyPart}) => {
  //   const [search, setSearch] = useState('')
  //   const [bodyParts, setBodyParts] = useState([])

  //   useEffect(() => {
  //     const fetchExercisesData = async () => {
  //       const exercisesData = await fetchData(
  //         'https://exercisedb.p.rapidapi.com/exercises',
  //         exerciseOptions
  //       );
    
  //       // Extrae solo los nombres únicos de las partes del cuerpo
  //       const bodyPartsList = ['all', ...new Set(exercisesData.map((exercise) => exercise.bodyPart))];
    
  //       setBodyParts(bodyPartsList);
  //     };
    
  //     fetchExercisesData(); 
  //   }, [])
    
  //   const handleSearch = async () => {
  //     if (search) {
  //       const exerciseData = await fetchData(
  //          'https://exercisedb.p.rapidapi.com/exercises', exerciseOptions
  //       );
  //       console.log(exerciseData);
  //       const searchedExercises = exerciseData.filter(
  //         (item) => item.name.toLowerCase().includes(search)
  //         || item.target.toLowerCase().includes(search)
  //         || item.equipment.toLowerCase().includes(search)
  //         || item.bodyPart.toLowerCase().includes(search)
  //       );
  //       window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

  //       setSearch('');
  //       setExercises(searchedExercises)
        
  //     }
  //   }
  //   return (
  //     <Stack 
  //       alignItems="center" 
  //       justifyContent="center" 
  //       mt="37px" 
  //       p="20px" 
  //       width= "1270px" 
  //       sx={{ width: "1270px", maxWidth: "1270px", overflow: "hidden" }}
  //       >
  //       <Typography 
  //         fontWeight={700} 
  //         sx={{ fontSize: { lg: '44px', xs: '30px' } }} 
  //         mb="49px" 
  //         textAlign="center"
  //       >
  //         Awesome Exercises You <br /> Should Know
  //       </Typography>
  //       <Box 
  //         position="relative" 
  //         mb="72px" 
  //         display="flex" 
  //         justifyContent="center" 
  //         width="100%"
  //       >
  //         <TextField
  //           sx={{ 
  //             input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, 
  //             width: { lg: '1170px', xs: '90%' }, // 🔹 Hace que el input se adapte mejor a la pantalla
  //             backgroundColor: '#fff', 
  //             borderRadius: '40px' 
  //           }}
  //           value={search}
  //           onChange={(e) => setSearch(e.target.value.toLowerCase())}
  //           placeholder="Search Exercises"
  //           type="text"
  //         />
  //         <Button 
  //           className="search-btn" 
  //           sx={{ 
  //             bgcolor: '#FF2625', 
  //             color: '#fff', 
  //             textTransform: 'none', 
  //             width: { lg: '173px', xs: '80px' }, 
  //             height: '56px', 
  //             position: 'absolute', 
  //             right: { lg: '0px', xs: '10px' }, 
  //             fontSize: { lg: '20px', xs: '14px' } 
  //           }} 
  //           onClick={handleSearch}
  //         >
  //           Search
  //         </Button>
  //       </Box>
  //       <Box sx={{ position: 'static', width: '100%', p: '15px', overflowX: 'hidden' }}>
  //       <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
  //       </Box>
  //     </Stack>
  //   )
  // }

  // export default SearchExercises
// import { Stack, Typography, Box, TextField, Button } from '@mui/material'
// import { useEffect, useState } from 'react'
// import { exerciseOptions, fetchData } from '../utils/fetchdata'
// import HorizontalScrollbar from './HorizontalScrollbar'


// const SearchExercises = ({ setExercises, bodyPart, setBodyPart}) => {
//   const [search, setSearch] = useState('')
//   const [bodyParts, setBodyParts] = useState([])

//   useEffect(() => {
//     const fetchExercisesData = async () => {
//       const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

//       setBodyParts(['all', ...bodyPartsData]);
//     };

//     fetchExercisesData();
//   }, []);

//   const handleSearch = async () => {
//     console.log('Iniciando búsqueda con término:', search);
  
//     if (search) {
//       try {
//         const exerciseData = await fetchData(search); // Pasa el término de búsqueda aquí
//         console.log('Datos completos de ejercicios:', exerciseData);
  
//         if (exerciseData.length === 0) {
//           console.log('No se encontraron ejercicios');
//         } else {
//           const searchedExercises = exerciseData.filter(
//             (exercise) =>
//               exercise.name.toLowerCase().includes(search.toLowerCase()) ||
//               exercise.target.toLowerCase().includes(search.toLowerCase()) ||
//               exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
//               exercise.bodyPart.toLowerCase().includes(search.toLowerCase())
//           );
  
//           console.log('Ejercicios después del filtrado:', searchedExercises);
  
//           setSearch('');
//           setExercises(searchedExercises);
//           window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
  
//           console.log('Estado actualizado con ejercicios filtrados');
//         }
//       } catch (error) {
//         console.error('Error en la búsqueda:', error);
//       }
//     }
//   };
  
  
  
  

//   return (
//     <Stack 
//       alignItems="center"
//       justifyContent="center"
//       mt="37px"
//       p="20px"
//       width= "1270px"
//       sx={{ width: "1270px", maxWidth: "1270px", overflow: "hidden" }}
//     >
//       <Typography
//         fontWeight={700}
//         sx={{ fontSize: { lg: '44px', xs: '30px' } }}
//         mb="49px"
//         textAlign="center"
//       >
//         Awesome Exercises You <br /> Should Know
//       </Typography>
//       <Box
//         position="relative"
//         mb="72px"
//         display="flex"
//         justifyContent="center"
//         width="100%"
//       >
//         <TextField 
//           sx={{
//             input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
//             width: { lg: '1170px', xs: '90%' },
//             backgroundColor: '#fff',
//             borderRadius: '40px'
//           }}
//           value={search}
//           onChange={(e) => setSearch(e.target.value.toLowerCase())}
//           placeholder="Search Exercises"
//           type="text"
//         />
//         <Button
//           className="search-btn"
//           sx={{
//             bgcolor: '#FF2625',
//             color: '#fff',
//             textTransform: 'none',
//             width: { lg: '173px', xs: '80px' },
//             height: '56px',
//             position: 'absolute',
//             right: { lg: '0px', xs: '10px' },
//             fontSize: { lg: '20px', xs: '14px' }
//           }}
//           onClick={handleSearch}
//         >
//           Search
//         </Button>
//       </Box>
//       <Box sx={{ position: 'static', width: '100%', p: '15px', overflowX: 'hidden' }}>
//         <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
//       </Box>
//     </Stack>
//   )
// }

// export default SearchExercises
import { Stack, Typography, Box, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchExercisesBySearch, fetchBodyParts } from '../utils/fetchdata';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchBodyPartsData = async () => {
      const bodyPartsData = await fetchBodyParts();
      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchBodyPartsData();
  }, []);

  const handleSearch = async () => {
    console.log('Iniciando búsqueda con término:', search);

    if (search) {
      try {
        const exerciseData = await fetchExercisesBySearch(search);
        console.log('Datos completos de ejercicios:', exerciseData);

        if (exerciseData.length === 0) {
          console.log('No se encontraron ejercicios');
        } else {
          const searchedExercises = exerciseData.filter(
            (exercise) =>
              exercise.name.toLowerCase().includes(search.toLowerCase()) ||
              exercise.target.toLowerCase().includes(search.toLowerCase()) ||
              exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
              exercise.bodyPart.toLowerCase().includes(search.toLowerCase())
          );

          console.log('Ejercicios después del filtrado:', searchedExercises);

          setSearch('');
          setExercises(searchedExercises);
          window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

          console.log('Estado actualizado con ejercicios filtrados');
        }
      } catch (error) {
        console.error('Error en la búsqueda:', error);
      }
    }
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      mt="37px"
      p="20px"
      width="1270px"
      sx={{ width: '1270px', maxWidth: '1270px', overflow: 'hidden' }}
    >
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="49px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px" display="flex" justifyContent="center" width="100%">
        <TextField
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '1170px', xs: '90%' },
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
      <Box sx={{ position: 'static', width: '100%', p: '15px', overflowX: 'hidden' }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts={bodyParts}
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
