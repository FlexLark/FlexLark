export interface Category {  
  id: string;
  name: string;
  description?: string;
  icon?: string;
  parentCategoryId?: string;
  
  metaData?: Record<string, any>;
}