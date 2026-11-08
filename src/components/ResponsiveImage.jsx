import React from 'react';
import { thumbnailPreview, thumbnailSrcSet } from '../lib/media';

// Galleries request a display-sized image. Inspection views retain the source file.
export default function ResponsiveImage({ src, sizes = '(min-width: 1024px) 50vw, 100vw', fetchPriority, loading = fetchPriority === 'high' ? 'eager' : 'lazy', ...props }) {
  return <img src={thumbnailPreview(src)} srcSet={thumbnailSrcSet(src)} sizes={sizes} loading={loading} fetchpriority={fetchPriority} decoding="async" {...props} />;
}
