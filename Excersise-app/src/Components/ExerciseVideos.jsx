import { Box, Typography, Stack } from '@mui/material';

const ExerciseVideos = ({ exerciseVideos, name }) => {
  console.log('Exercise Videos in Component:', exerciseVideos);

  // If no videos are available, show a message
  if (!exerciseVideos || exerciseVideos.length === 0) {
    return (
      <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
        <Typography 
          sx={{ fontSize: { lg: '44px', xs: '25px' } }} 
          fontWeight={700} 
          color="#000" 
          mb="33px"
        >
          No videos found for <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name}</span>
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
      <Typography sx={{ fontSize: { lg: '44px', xs: '25px' } }} fontWeight={700} color="#000" mb="33px">
        Watch <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name}</span> exercise videos
      </Typography>
      <Stack 
        sx={{ 
          flexDirection: { lg: 'row', xs: 'column' }, 
          gap: { lg: '110px', xs: '20px' } 
        }} 
        justifyContent="flex-start" 
        flexWrap="wrap" 
        alignItems="center"
      >
        {exerciseVideos.map((item, index) => (
          <a 
            key={item.video.videoId}
            href={item.video.video}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              textDecoration: 'none', 
              color: 'inherit', 
              margin: '10px',
              width: '300px'
            }}
          >
            <img 
              src={item.video.thumbnails[0].url} 
              alt={item.video.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px'
              }}
            />
            <Box sx={{ 
              backgroundColor: '#f0f0f0', 
              padding: '10px', 
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px'
            }}>
              <Typography 
                sx={{ 
                  fontSize: { lg: '18px', xs: '14px' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }} 
                fontWeight={600} 
                color="#000"
              >
                {item.video.title}
              </Typography>
              <Typography fontSize="14px" color="#000">
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;