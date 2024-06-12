export interface County {
  id: number,
  name: string,
}

export interface Subcounty {
    id: number,
    fk_county_id: number,
    name: number,
}

export interface Wards {
    id: number,
    fk_subcounty_id: number,
    name: string
}