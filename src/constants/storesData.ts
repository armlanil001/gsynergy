export interface Store {
  seqNo: number;
  store: string;
  city: string;
  state: string;
}

export const storesData: Store[] = [
  { seqNo: 1, store: 'Atlanta Outfitters', city: 'Atlanta', state: 'GA' },
  { seqNo: 2, store: 'Chicago Charm Boutique', city: 'Chicago', state: 'IL' },
  { seqNo: 3, store: 'Houston Harvest Market', city: 'Houston', state: 'TX' },
  { seqNo: 4, store: 'Seattle Skyline Goods', city: 'Seattle', state: 'WA' },
  { seqNo: 5, store: 'Miami Breeze Apparel', city: 'Miami', state: 'FL' },
  { seqNo: 6, store: 'Denver Peaks Outdoor', city: 'Denver', state: 'CO' },
  { seqNo: 7, store: 'Boston Harbor Books', city: 'Boston', state: 'MA' },
  { seqNo: 8, store: 'Los Angeles Luxe', city: 'Los Angeles', state: 'CA' },
  { seqNo: 9, store: 'Phoenix Sunwear', city: 'Phoenix', state: 'AZ' },
  { seqNo: 10, store: 'Nashville Melody Music Store', city: 'Nashville', state: 'TN' },
  { seqNo: 11, store: 'New York Empire Eats', city: 'New York', state: 'NY' },
  { seqNo: 12, store: 'Dallas Ranch Supply', city: 'Dallas', state: 'TX' },
  { seqNo: 13, store: 'San Francisco Bay Trends', city: 'San Francisco', state: 'CA' },
];