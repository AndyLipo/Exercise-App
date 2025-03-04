;
import { useEffect, useState } from 'react';
import { Typography, Stack, Button } from '@mui/material';

import BodyPartImage from '../assets/assets/icons/body-part.png';
import TargetImage from '../assets/assets/icons/target.png';
import EquipmentImage from '../assets/assets/icons/equipment.png';
import { fetchExerciseVideos, fetchExerciseImages } from '../utils/fetchdata';

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, name, target, equipment, id, gifUrl } = exerciseDetail;

  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [exerciseImages, setExerciseImages] = useState([]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      if (id) {
        try {
          // Fetch videos
          const videos = await fetchExerciseVideos(id);
          setExerciseVideos(videos);

          // Fetch images
          const images = await fetchExerciseImages(id);
          console.log('🖼️ Imágenes recuperadas:', images);
          
          // Only update if images are found
          if (images && images.length > 0) {
            setExerciseImages(images);
          }
        } catch (error) {
          console.error('Error fetching exercise data:', error);
        }
      }
    };
    
    fetchExerciseData();
  }, [id]);

  if (!exerciseDetail || Object.keys(exerciseDetail).length === 0) {
    return (
      <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>
        Cargando ejercicio...
      </Typography>
    );
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyPart },
    { icon: TargetImage, name: target },
    { icon: EquipmentImage, name: equipment },
  ];

  // Log image details for debugging
  console.log('🔍 Detalles de imágenes:', {
    exerciseImages,
    gifUrl,
    imageToDisplay: exerciseImages.length > 0 ? exerciseImages[0] : (gifUrl || '')
  });

  // Determine the image to display with more robust fallback
  const imageToDisplay = 
    exerciseImages.length > 0 
      ? exerciseImages[0]  // Use first fetched image
      : (gifUrl || '');  // Fallback to gifUrl, or empty string if no gif

  return (
    <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
      {imageToDisplay && (
        <img
          src={imageToDisplay}
          alt={name}
          loading="lazy"
          className="detail-image"
          style={{
            width: '400px',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '20px'
          }}
          onError={(e) => {
            console.error('Image failed to load:', imageToDisplay);
            e.target.src = gifUrl || '';  // Fallback to gifUrl or empty string
          }}
        />
      )}

      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Typography sx={{ fontSize: { lg: '64px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
          {name}
        </Typography>
        <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} color="#4F4C4C">
          Los ejercicios te mantienen fuerte.{' '}
          <span style={{ textTransform: 'capitalize' }}>{name}</span> es uno de los mejores <br />
          ejercicios para trabajar {target}. Te ayudará a mejorar tu <br /> estado de ánimo y a ganar energía.
        </Typography>

        {extraDetail?.map((item, index) => (
          <Stack key={`${item.name}-${index}`} direction="row" gap="24px" alignItems="center">
            <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
              <img src={item.icon} alt={item.name} style={{ width: '50px', height: '50px' }} />
            </Button>
            <Typography textTransform="capitalize" sx={{ fontSize: { lg: '30px', xs: '20px' } }}>
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;