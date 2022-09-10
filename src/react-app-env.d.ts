/// <reference types="react-scripts" />

interface ParcelData {
  CitySender: string,
  CityRecipient: string,
  WarehouseSender: string,
  Status: string,
  WarehouseRecipient: string,
}

interface ResponseError {
  success: boolean,
  warnings: string,
}
