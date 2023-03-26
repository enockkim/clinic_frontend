export interface Prescription {
  prescriptionId?: number;
  appointmentId: number;
  itemId: number;
  dosageNumber: number;
  remarks?: string;
  status: number;
  availability?: number;
}

export interface Inventory{
  itemId?: number,
  category: number,
  brandName: string,
  medication: string,
  administrationType: number,
  unit: string,
  unitCost: number,
  stock?: number,
  UnitOfMeasure: number
}

export interface InvetoryCategory{
  categoryId: number,
  categoryName: string
}

export interface UnitOfMeasure {
    uomId: number,
    uomName: number,
    uomAbbreviation: string
}   

export interface AdministrationType {
    administrationTypeId: number,
    administrationType1: string
}

export interface AddStock {
    itemId: number,
    stock: number
}