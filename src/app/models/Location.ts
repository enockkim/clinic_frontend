export interface County {
  id: number,
  county_name: string,
}

export interface Subcounty {
    subcountyId: number,
    countyId: number,
    subcountyName: number,
}

export interface Wards {
    id: number,
    subcountyId: number,
    ward: string
}