import { Stack, Typography, Box, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { exerciseOptions, fetchData } from '../utils/fetchdata'

const SearchExercises = () => {
  const [search, setSearch] = useState('')
  const handleSearch = async () => {
    if (search) {
      try {
          const exerciseData = await fetchData(
              'https://exercisedb.p.rapidapi.com/exercises',
              exerciseOptions
          );
          console.log(exerciseData);
      } catch (error) {
          console.error('Error details:', error);
      }
  }
  }
  return (
   <Stack 
  alignItems="center" 
  justifyContent="center"
  sx={{
    ml: {xs: "12px", md: "400px", lg:"600px"},
    mt: { xs: "20px", md: "37px" },
    px: { xs: "20px", md: "20px" },
    width: "100%"
  }}
>
  <Typography 
    fontWeight={700}
    sx={{ 
      mr: {xs: "75px", md: "400px"},
      fontSize: { xs: '20px', lg: '44px' },
      mb: "49px",
      textAlign: "center",
      width: "200%"
    }}
  >
    Awesome Exercises You <br /> Should Know
  </Typography>
  
  <Box 
    sx={{
      mr: {xs: "27%", md: "400px"},
      position: "relative",
      mb: "72px",
      width: { xs: "80%", lg: "1170px" },
      maxWidth: "300%"
    }}
  >
    <TextField
      height="76px"
      sx={{ 
        input: { 
          fontWeight: '700', 
          border: 'none', 
          borderRadius: '4px', 
        }, 
        width: "100%",
        backgroundColor: '#fff', 
        borderRadius: '40px',
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
        width: { xs: '80px', lg: '173px' }, 
        height: '56px', 
        position: 'absolute', 
        right: '0px', 
        fontSize: { xs: '14px', lg: '20px' } 
      }}
      onClick={handleSearch}
    >
      Search
    </Button>
  </Box>
</Stack>
  )
}

export default SearchExercises