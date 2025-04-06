import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('button', {
  borderRadius: '8px',
  padding: '0.6em 1.2em',
  fontSize: '1em',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.25s',
  border: 'none',
});

globalStyle('button:hover', {
  backgroundColor: '#e0e0e0',
});
