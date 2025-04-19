
type YouTubeUrlType = 'video' | 'short' | 'playlist' | null;

export const validateYoutubeUrl = (input: string): { isValid: boolean; type: YouTubeUrlType } => {
  const videoRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(\S*)?$/;
  const shortRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/shorts\/|youtu\.be\/)([\w-]+)(\S*)?$/;
  const playlistRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=([\w-]+)(\S*)?$/;

  if (videoRegex.test(input)) {
    return { isValid: true, type: 'video' };
  } else if (shortRegex.test(input)) {
    return { isValid: true, type: 'short' };
  } else if (playlistRegex.test(input)) {
    return { isValid: true, type: 'playlist' };
  }
  
  return { isValid: false, type: null };
};

