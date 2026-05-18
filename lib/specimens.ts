import type { SpecimenSelection } from '@/types';

export interface SpecimenItem extends SpecimenSelection {
  src: string;
}

export const SPECIMEN_GALLERY: SpecimenItem[] = [
  { id: 1,  src: '/specimens/specimen-01.jpg', label: '01 — Type is the design',              signal: 'typographic_dominance' },
  { id: 2,  src: '/specimens/specimen-02.jpg', label: '02 — Image owns the canvas',           signal: 'full_bleed_image' },
  { id: 3,  src: '/specimens/specimen-03.jpg', label: '03 — Everything at equal weight',      signal: 'information_dense' },
  { id: 4,  src: '/specimens/specimen-04.jpg', label: '04 — Color fields organize the space', signal: 'color_block' },
  { id: 5,  src: '/specimens/specimen-05.jpg', label: '05 — Color and photo together',        signal: 'color_block_photo' },
  { id: 6,  src: '/specimens/specimen-06.jpg', label: '06 — Type plus line illustration',     signal: 'type_illustration' },
  { id: 7,  src: '/specimens/specimen-07.jpg', label: '07 — Layered and collaged',            signal: 'collage_layered' },
  { id: 8,  src: '/specimens/specimen-08.jpg', label: '08 — Diagonal creates movement',       signal: 'diagonal_dynamic' },
  { id: 9,  src: '/specimens/specimen-09.jpg', label: '09 — Illustration leads',              signal: 'illustrated_grid' },
  { id: 10, src: '/specimens/specimen-10.jpg', label: '10 — Frame contains everything',       signal: 'framed_contained' },
];
