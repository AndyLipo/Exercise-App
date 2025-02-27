import { Link } from 'react-router-dom';
import { Button, Stack, Typography, Box } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  console.log('Exercise data:', exercise); // Para depuración
  
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
    {exercise.gifUrl ? (
      <>
        <img 
          src={exercise.gifUrl} 
          alt={exercise.name} 
          loading="lazy" 
          onError={(e) => {
            console.error('Image failed to load:', exercise.gifUrl);
            e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
          }}
        />
        <Typography variant="caption" display="block" sx={{ color: 'gray' }}>
          URL: {exercise.gifUrl}
        </Typography>
      </>
    ) : (
      <Box 
        sx={{ 
          height: '200px', 
          bgcolor: '#f5f5f5', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <Typography>No image available</Typography>
      </Box>
    )}
    
    <Stack direction="row">
      <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
        {exercise.bodyPart}
      </Button>
      <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
        {exercise.target}
      </Button>
    </Stack>
    <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
      {exercise.name}
    </Typography>
  </Link>
  );
};

export default ExerciseCard;
