import { Schema, Model, model, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

// Shopping list items
const ShoppingListItem: Schema = new Schema({
  barcode: {
    type: String,
    required: true
  },
  display_name: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    default: null
  },
  amount: {
    type: Number,
    required: true
  }
});

interface IShoppingListItem extends Schema {
  barcode: string;
  display_name: string;
  manufacturer: string;
  amount: number;
}

interface IPermissions extends Schema {
  bcdsWrite: boolean;
}

interface IUserModel extends Document {
  username: string;
  password: string;
  shoppingList: IShoppingListItem[];
  permissions: IPermissions;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  shoppingList: [ShoppingListItem],
  permissions: {
    type: Object,
    default: {
      bcdsWrite: false
    }
  }
});

// Hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  const user: any = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User: Model<IUserModel> = model('User', UserSchema);
export = User;
