import { writable } from 'svelte/store';

export const HighScore = writable(0);
export const Bruker = writable("")
export const Popup = writable(false)