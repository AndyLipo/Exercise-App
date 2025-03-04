import { Link } from 'react-router-dom';
import { Button, Stack, Typography, Box } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  console.log('Exercise data:', exercise); // Depuración

  const buttonStyle = {
    ml: '21px',
    color: '#fff',
    fontSize: '14px',
    borderRadius: '20px',
    textTransform: 'capitalize',
  };

  return (
    <Link 
      className="exercise-card" 
      to={`/exercise/${exercise.id}`} 
      aria-label={`Ver detalles del ejercicio: ${exercise.name}`}
    >
      {exercise.gifUrl ? (
        <Box 
          component="img"
          src={exercise.gifUrl}
          alt={exercise.name || 'Ejercicio'}
          loading="lazy"
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
          }}
          onError={(e) => {
            console.error('Image failed to load:', exercise.gifUrl);
            e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
          }}
        />
      ) : (
        <Box 
          sx={{ 
            height: '200px', 
            bgcolor: '#f5f5f5', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '8px',
          }}
        >
          <Typography>No image available</Typography>
        </Box>
      )}

      <Stack direction="row">
        <Button sx={{ ...buttonStyle, background: '#FFA9A9' }} aria-label={`Parte del cuerpo: ${exercise.bodyPart || 'Desconocido'}`}>
          {exercise.bodyPart || 'Desconocido'}
        </Button>
        <Button sx={{ ...buttonStyle, background: '#FCC757' }} aria-label={`Músculo objetivo: ${exercise.target || 'Desconocido'}`}>
          {exercise.target || 'Desconocido'}
        </Button>
      </Stack>

      <Typography 
        ml="21px" 
        color="#000" 
        fontWeight="bold" 
        sx={{ fontSize: { lg: '24px', xs: '20px' } }} 
        mt="11px" 
        pb="10px" 
        textTransform="capitalize"
      >
        {exercise.name || 'Ejercicio sin nombre'}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
