
export const customImageLoader = ({ src, width, quality }:any) => {
  return `${src}?w=${width}&q=${quality || 75}&custom-cache-header=${encodeURIComponent('public, max-age=21600, stale-while-revalidate')}`;
};

