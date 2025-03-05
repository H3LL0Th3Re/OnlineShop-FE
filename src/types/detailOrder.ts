export interface detailOrder {
  id: string;
  invoice_id: string;
  name: string;
  status: string;
  address: string;
  postal_code: string;
  city_district: string;
  productImage: string;
  is_main_location: boolean;
  longitude: string;
  latitude: string;
  invoice: string;
  courier: Courier; // Harus bertipe objek Courier, bukan string
  delivery: {
    datetime: string;
  };
  index: string;
  origin: Origin;
  destination: Destination;
  items: Items[];
}

export interface Destination {
  contact_name: string;
  contact_phone: string;
  address: string;
}
export interface Origin {
  contact_name: string;
  contact_phone: string;
  address: string;
}
export interface Courier {
  tracking_id: string;
  shipment_fee: number;
  waybill_id: string;
  company: string;
  history: HistoryItem[]; // Harus berupa array
}

// Interface untuk setiap item di dalam history
export interface HistoryItem {
  service_type: string;
  status: string;
  note: string;
  updated_at: string;
}

export interface Items {
  value: number;
  name: string;
}
