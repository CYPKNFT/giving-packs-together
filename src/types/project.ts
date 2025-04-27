
export interface PackItem {
  id: string;
  name: string;
  quantity: number;
  cost: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  organization: string;
  imageUrl: string;
  itemsNeeded: number;
  itemsFulfilled: number;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'completed';
  estimatedCost: number;
  items: PackItem[];
}
