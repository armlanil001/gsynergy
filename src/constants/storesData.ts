export interface Store {
  seqNo: number;
  label: string;
  city: string;
  state: string;
  id:string;
}

export const storesData: Store[] = [
  { seqNo: 1, id: "ST035", label: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
  { seqNo: 2, id: "ST046", label: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
  { seqNo: 3, id: "ST064", label: "Dallas Ranch Supply", city: "Dallas", state: "TX" },
  { seqNo: 4, id: "ST066", label: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
  { seqNo: 5, id: "ST073", label: "Nashville Melody Music Store", city: "Nashville", state: "TN" },
  { seqNo: 6, id: "ST074", label: "New York Empire Eats", city: "New York", state: "NY" },
  { seqNo: 7, id: "ST091", label: "Denver Peaks Outdoor", city: "Denver", state: "CO" },
  { seqNo: 8, id: "ST094", label: "Philadelphia Liberty Market", city: "Philadelphia", state: "PA" },
  { seqNo: 9, id: "ST097", label: "Boston Harbor Books", city: "Boston", state: "MA" },
  { seqNo: 10, id: "ST101", label: "Austin Vibe Co.", city: "Austin", state: "TX" },
  { seqNo: 11, id: "ST131", label: "Los Angeles Luxe", city: "Los Angeles", state: "CA" },
  { seqNo: 12, id: "ST150", label: "Houston Harvest Market", city: "Houston", state: "TX" },
  { seqNo: 13, id: "ST151", label: "Portland Evergreen Goods", city: "Portland", state: "OR" },
  { seqNo: 14, id: "ST156", label: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
  { seqNo: 15, id: "ST163", label: "Las Vegas Neon Treasures", city: "Las Vegas", state: "NV" },
  { seqNo: 16, id: "ST175", label: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
  { seqNo: 17, id: "ST176", label: "Miami Breeze Apparel", city: "Miami", state: "FL" },
  { seqNo: 18, id: "ST177", label: "San Diego Wave Surf Shop", city: "San Diego", state: "CA" },
  { seqNo: 19, id: "ST193", label: "Charlotte Queen’s Closet", city: "Charlotte", state: "NC" },
  { seqNo: 20, id: "ST208", label: "Detroit Motor Gear", city: "Detroit", state: "MI" }
];