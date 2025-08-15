export interface AlbumType {
  id: string;
  name: string;
  artists: { name: string }[];
  images: { width: number; url: string }[];
  external_urls: { spotify: string };
  palette: string[];
}
