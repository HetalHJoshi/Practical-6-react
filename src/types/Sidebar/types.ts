export type SortOption = 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc';

export interface SidebarFilters {
  categories: string[];
  brands: string[];
  priceRanges: [number, number][];
  ratingRanges: [number, number][];
}
