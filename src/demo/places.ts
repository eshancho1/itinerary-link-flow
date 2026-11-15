// Hand-typed sample places for demo mode. NOT from any API (Google terms forbid storing
// Places responses). Long-running, well-known spots only, so the demo doesn't show closures.
// Coordinates are approximate. Place IDs are fake.

import type { LatLng, Place, StopKind } from '@/types/plan';
import { mapsSearchUrl } from '@/lib/geo';

export type DemoAreaId = 'east-village' | 'williamsburg' | 'west-village';

export type DemoPlace = Place & { kind: StopKind };

export type DemoArea = {
  id: DemoAreaId;
  name: string;
  borough: string;
  pin: LatLng;
  places: DemoPlace[];
};

type Opts = {
  price?: number;
  reservable?: boolean;
  address: string;
  category: string;
};

function p(
  placeId: string,
  name: string,
  kind: StopKind,
  lat: number,
  lng: number,
  { price, reservable, address, category }: Opts,
): DemoPlace {
  return {
    placeId,
    name,
    kind,
    lat,
    lng,
    priceLevel: price,
    reservable,
    address,
    category,
    bookingUrl: mapsSearchUrl(name, address),
  };
}

const EAST_VILLAGE: DemoArea = {
  id: 'east-village',
  name: 'East Village',
  borough: 'Manhattan',
  pin: { lat: 40.7265, lng: -73.985 },
  places: [
    // eat
    p('demo-ev-veselka', 'Veselka', 'eat', 40.729, -73.987, { price: 1, reservable: false, address: '144 2nd Ave', category: 'Ukrainian diner · since 1954' }),
    p('demo-ev-katz', "Katz's Delicatessen", 'eat', 40.7223, -73.9874, { price: 2, reservable: false, address: '205 E Houston St', category: 'Deli · since 1888' }),
    p('demo-ev-supper', 'Supper', 'eat', 40.7226, -73.9838, { price: 2, reservable: false, address: '156 E 2nd St', category: 'Candlelit Italian · since 1995' }),
    p('demo-ev-lucien', 'Lucien', 'eat', 40.7234, -73.9878, { price: 3, reservable: true, address: '14 1st Ave', category: 'French bistro · since 1998' }),
    p('demo-ev-ilbuco', 'Il Buco', 'eat', 40.7259, -73.9928, { price: 3, reservable: true, address: '47 Bond St', category: 'Mediterranean, candlelit · since 1994' }),
    p('demo-ev-momofuku', 'Momofuku Noodle Bar', 'eat', 40.7292, -73.9845, { price: 2, reservable: true, address: '171 1st Ave', category: 'Ramen & buns · since 2004' }),
    p('demo-ev-ippudo', 'Ippudo NY', 'eat', 40.7309, -73.9902, { price: 2, reservable: true, address: '65 4th Ave', category: 'Ramen · since 2008' }),
    p('demo-ev-mogador', 'Cafe Mogador', 'eat', 40.7272, -73.9844, { price: 2, reservable: true, address: '101 St Marks Pl', category: 'Moroccan café & brunch · since 1983' }),
    p('demo-ev-mamouns', "Mamoun's Falafel", 'eat', 40.7289, -73.9877, { price: 1, reservable: false, address: '30 St Marks Pl', category: 'Falafel · a NYC staple since 1971' }),
    p('demo-ev-kenka', 'Kenka', 'eat', 40.7292, -73.9887, { price: 1, reservable: false, address: '25 St Marks Pl', category: 'Old-school izakaya' }),
    p('demo-ev-mrpurple', 'Mr. Purple', 'eat', 40.7223, -73.9888, { price: 3, reservable: true, address: '180 Orchard St', category: 'Rooftop bar & small plates · skyline view' }),
    // do
    p('demo-ev-deathco', 'Death & Co', 'do', 40.726, -73.9846, { price: 3, reservable: false, address: '433 E 6th St', category: 'Cocktail bar · since 2006' }),
    p('demo-ev-angelika', 'Village East by Angelika', 'do', 40.731, -73.9873, { price: 2, reservable: true, address: '181 2nd Ave', category: 'Cinema in a 1926 theater' }),
    p('demo-ev-nytw', 'New York Theatre Workshop', 'do', 40.726, -73.9896, { price: 3, reservable: true, address: '79 E 4th St', category: 'Off-Broadway theater · since 1979' }),
    p('demo-ev-acebar', 'Ace Bar', 'do', 40.7238, -73.9826, { price: 1, reservable: false, address: '531 E 5th St', category: 'Skee-ball & pinball bar' }),
    p('demo-ev-nuyorican', 'Nuyorican Poets Cafe', 'do', 40.7221, -73.9806, { price: 1, reservable: true, address: '236 E 3rd St', category: 'Poetry slam & open mic · since 1973' }),
    p('demo-ev-mercury', 'Mercury Lounge', 'do', 40.7222, -73.9868, { price: 2, reservable: true, address: '217 E Houston St', category: 'Live music · since 1993' }),
    p('demo-ev-mcsorleys', "McSorley's Old Ale House", 'do', 40.7287, -73.9897, { price: 1, reservable: false, address: '15 E 7th St', category: 'Bar · since 1854' }),
    p('demo-ev-strand', 'Strand Book Store', 'do', 40.7332, -73.991, { price: 1, reservable: false, address: '828 Broadway', category: 'Bookstore · since 1927' }),
    // wander
    p('demo-ev-tompkins', 'Tompkins Square Park', 'wander', 40.7265, -73.9817, { address: 'Avenue A & E 7th St', category: 'Neighborhood park' }),
    p('demo-ev-stmarks', 'St. Marks Place stroll', 'wander', 40.7286, -73.988, { address: 'St Marks Pl & 2nd Ave', category: 'Neighborhood stroll' }),
    p('demo-ev-wburgbridge', 'Williamsburg Bridge walkway', 'wander', 40.718, -73.9867, { address: 'Delancey St & Clinton St', category: 'East River skyline view' }),
    p('demo-ev-washsq', 'Washington Square Park', 'wander', 40.7308, -73.9973, { address: 'Washington Square', category: 'Park & arch' }),
  ],
};

const WILLIAMSBURG: DemoArea = {
  id: 'williamsburg',
  name: 'Williamsburg',
  borough: 'Brooklyn',
  pin: { lat: 40.717, lng: -73.9585 },
  places: [
    // eat
    p('demo-wb-luger', 'Peter Luger Steak House', 'eat', 40.7099, -73.9623, { price: 4, reservable: true, address: '178 Broadway, Brooklyn', category: 'Steakhouse · since 1887' }),
    p('demo-wb-lilia', 'Lilia', 'eat', 40.7176, -73.9524, { price: 3, reservable: true, address: '567 Union Ave, Brooklyn', category: 'Wood-fired Italian · since 2016' }),
    p('demo-wb-maison', 'Maison Premiere', 'eat', 40.7144, -73.9614, { price: 3, reservable: true, address: '298 Bedford Ave, Brooklyn', category: 'Oyster bar, candlelit · since 2011' }),
    p('demo-wb-diner', 'Diner', 'eat', 40.7105, -73.9654, { price: 2, reservable: true, address: '85 Broadway, Brooklyn', category: 'New American in a 1920s dining car · since 1998' }),
    p('demo-wb-bestpizza', 'Best Pizza', 'eat', 40.7168, -73.9562, { price: 1, reservable: false, address: '33 Havemeyer St, Brooklyn', category: 'Pizza by the slice · since 2010' }),
    p('demo-wb-fettesau', 'Fette Sau', 'eat', 40.7142, -73.956, { price: 2, reservable: false, address: '354 Metropolitan Ave, Brooklyn', category: 'BBQ in an old garage · since 2007' }),
    p('demo-wb-devocion', 'Devoción', 'eat', 40.7158, -73.9648, { price: 1, reservable: false, address: '69 Grand St, Brooklyn', category: 'Colombian coffee café · since 2014' }),
    p('demo-wb-sundayinbk', 'Sunday in Brooklyn', 'eat', 40.7136, -73.966, { price: 2, reservable: true, address: '348 Wythe Ave, Brooklyn', category: 'Brunch & dinner · since 2016' }),
    p('demo-wb-westlight', 'Westlight', 'eat', 40.7221, -73.9573, { price: 3, reservable: true, address: '111 N 12th St, Brooklyn', category: 'Rooftop bar & small plates · skyline view' }),
    // do
    p('demo-wb-bowl', 'Brooklyn Bowl', 'do', 40.7219, -73.9575, { price: 2, reservable: true, address: '61 Wythe Ave, Brooklyn', category: 'Bowling & live music · since 2009' }),
    p('demo-wb-nitehawk', 'Nitehawk Cinema', 'do', 40.7163, -73.9626, { price: 2, reservable: true, address: '136 Metropolitan Ave, Brooklyn', category: 'Dine-in cinema · since 2011' }),
    p('demo-wb-musichall', 'Music Hall of Williamsburg', 'do', 40.7192, -73.9617, { price: 2, reservable: true, address: '66 N 6th St, Brooklyn', category: 'Live music · since 2007' }),
    p('demo-wb-spoonbill', 'Spoonbill & Sugartown', 'do', 40.7177, -73.9581, { price: 1, reservable: false, address: '218 Bedford Ave, Brooklyn', category: 'Bookstore · since 1999' }),
    p('demo-wb-barcade', 'Barcade', 'do', 40.7121, -73.9511, { price: 1, reservable: false, address: '388 Union Ave, Brooklyn', category: 'Arcade bar · since 2004' }),
    p('demo-wb-unionpool', 'Union Pool', 'do', 40.7154, -73.9515, { price: 1, reservable: false, address: '484 Union Ave, Brooklyn', category: 'Bar & live music · since 2006' }),
    // wander
    p('demo-wb-domino', 'Domino Park', 'wander', 40.7146, -73.9679, { address: '15 River St, Brooklyn', category: 'Waterfront park · skyline view' }),
    p('demo-wb-mpj', 'Marsha P. Johnson State Park', 'wander', 40.7212, -73.9616, { address: 'Kent Ave & N 8th St, Brooklyn', category: 'Waterfront park' }),
    p('demo-wb-mccarren', 'McCarren Park', 'wander', 40.7202, -73.9517, { address: 'Bedford Ave & N 12th St, Brooklyn', category: 'Neighborhood park' }),
    p('demo-wb-bedford', 'Bedford Avenue stroll', 'wander', 40.7175, -73.9578, { address: 'Bedford Ave & N 6th St, Brooklyn', category: 'Neighborhood stroll' }),
    p('demo-wb-grandferry', 'Grand Ferry Park', 'wander', 40.7156, -73.9664, { address: 'Grand St & River St, Brooklyn', category: 'Small waterfront park' }),
  ],
};

const WEST_VILLAGE: DemoArea = {
  id: 'west-village',
  name: 'West Village',
  borough: 'Manhattan',
  pin: { lat: 40.7336, lng: -74.003 },
  places: [
    // eat
    p('demo-wv-viacarota', 'Via Carota', 'eat', 40.7333, -74.0037, { price: 3, reservable: false, address: '51 Grove St', category: 'Italian trattoria · since 2014' }),
    p('demo-wv-buvette', 'Buvette', 'eat', 40.7329, -74.004, { price: 2, reservable: false, address: '42 Grove St', category: 'Wine bar & small plates · since 2011' }),
    p('demo-wv-joes', "Joe's Pizza", 'eat', 40.7306, -74.0021, { price: 1, reservable: false, address: '7 Carmine St', category: 'Pizza by the slice · since 1975' }),
    p('demo-wv-johns', "John's of Bleecker Street", 'eat', 40.7317, -74.0034, { price: 1, reservable: false, address: '278 Bleecker St', category: 'Coal-oven pizza · since 1929' }),
    p('demo-wv-minetta', 'Minetta Tavern', 'eat', 40.73, -74.0006, { price: 4, reservable: true, address: '113 MacDougal St', category: 'Steakhouse & bistro · since 1937' }),
    p('demo-wv-donangie', 'Don Angie', 'eat', 40.7374, -74.0015, { price: 3, reservable: true, address: '103 Greenwich Ave', category: 'Italian-American · since 2017' }),
    p('demo-wv-cornerbistro', 'Corner Bistro', 'eat', 40.7381, -74.0034, { price: 1, reservable: false, address: '331 W 4th St', category: 'Burgers · since 1966' }),
    p('demo-wv-reggio', 'Caffe Reggio', 'eat', 40.7302, -74.0003, { price: 1, reservable: false, address: '119 MacDougal St', category: 'Café · since 1927' }),
    p('demo-wv-chelseamarket', 'Chelsea Market', 'eat', 40.7424, -74.006, { price: 2, reservable: false, address: '75 9th Ave', category: 'Food hall' }),
    p('demo-wv-lebain', 'Le Bain at The Standard', 'eat', 40.7408, -74.0081, { price: 3, reservable: true, address: '848 Washington St', category: 'Rooftop bar · Hudson view' }),
    // do
    p('demo-wv-comedycellar', 'Comedy Cellar', 'do', 40.7302, -74.0004, { price: 2, reservable: true, address: '117 MacDougal St', category: 'Stand-up comedy · since 1982' }),
    p('demo-wv-vanguard', 'Village Vanguard', 'do', 40.736, -74.0017, { price: 3, reservable: true, address: '178 7th Ave S', category: 'Jazz club · since 1935' }),
    p('demo-wv-smalls', 'Smalls Jazz Club', 'do', 40.7345, -74.0026, { price: 2, reservable: true, address: '183 W 10th St', category: 'Jazz club · since 1994' }),
    p('demo-wv-ifc', 'IFC Center', 'do', 40.7312, -74.0012, { price: 2, reservable: true, address: '323 6th Ave', category: 'Indie cinema · since 2005' }),
    p('demo-wv-threelives', 'Three Lives & Company', 'do', 40.7347, -74.0016, { price: 1, reservable: false, address: '154 W 10th St', category: 'Bookstore · since 1968' }),
    p('demo-wv-bluenote', 'Blue Note', 'do', 40.7309, -74.0007, { price: 3, reservable: true, address: '131 W 3rd St', category: 'Jazz club · since 1981' }),
    p('demo-wv-lpr', 'Le Poisson Rouge', 'do', 40.7285, -74.0002, { price: 2, reservable: true, address: '158 Bleecker St', category: 'Live music · since 2008' }),
    // wander
    p('demo-wv-pier45', 'Hudson River Park, Pier 45', 'wander', 40.7339, -74.0108, { address: 'Christopher St & West St', category: 'Waterfront pier · sunset view' }),
    p('demo-wv-washsq', 'Washington Square Park', 'wander', 40.7308, -73.9973, { address: 'Washington Square', category: 'Park & arch' }),
    p('demo-wv-commerce', 'Commerce & Bedford St stroll', 'wander', 40.7316, -74.0047, { address: 'Commerce St & Bedford St', category: 'Quiet, crooked streets' }),
    p('demo-wv-littleisland', 'Little Island', 'wander', 40.742, -74.0102, { address: 'Pier 55, Hudson River Park', category: 'Park on the Hudson' }),
    p('demo-wv-highline', 'The High Line', 'wander', 40.7398, -74.0082, { address: 'Gansevoort St & Washington St', category: 'Elevated park' }),
  ],
};

export const DEMO_AREAS: Record<DemoAreaId, DemoArea> = {
  'east-village': EAST_VILLAGE,
  williamsburg: WILLIAMSBURG,
  'west-village': WEST_VILLAGE,
};

export const DEMO_AREA_IDS = Object.keys(DEMO_AREAS) as DemoAreaId[];
