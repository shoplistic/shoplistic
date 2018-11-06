import { Schema, /*Model, model, Document*/ } from 'mongoose';

// Shopping list items
export const ShoppingListItemSchema: Schema = new Schema({
  barcode: {
    type: String,
    default: ''
  },
  display_name: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    default: ''
  },
  amount: {
    type: Number,
    required: true
  }
});

export interface IShoppingListItem {
  _id?: string;
  barcode: string;
  display_name: string;
  manufacturer: string;
  amount: number;
}

// export const ShoppingListItem: Model<IShoppingListItem> = model('ShoppingListItem', ShoppingListItemSchema);