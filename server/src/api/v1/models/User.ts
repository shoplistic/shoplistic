import { Schema, Model, model, Document } from 'mongoose';
import { ShoppingListItemSchema, IShoppingListItem } from './ShoppingListItem';
import * as bcrypt from 'bcrypt';

interface IPermissions extends Schema {
  bcdsWrite: boolean;
}

interface IUserModel extends Document {
  username: string;
  hash: string;
  shoppingList: IShoppingListItem[];
  permissions: IPermissions;
  registerDate: string;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  shoppingList: [ShoppingListItemSchema],
  permissions: {
    bcdsWrite: {
      type: Boolean,
      default: false
    }
  },
  registerDate: {
    type: Number,
    default: Date.now
  }
});

// Hashing a password before saving it to the database
// UserSchema.pre('save', function (next) {
//   const user: any = this;
//   console.log(this);
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   });
// });

// Hashing the password before saving it
UserSchema.virtual('password').set(function (password: string) {
  const salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, salt);
});

const User: Model<IUserModel> = model('User', UserSchema);
// export const ShoppingListItem: Model<IShoppingListItem> = model('ShoppingListItem', ShoppingListItemSchema);
export = User;
