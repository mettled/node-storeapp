import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const user = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count : {
          type: Number,
          required: true,
          default: 1,
        },
        courseID: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
          required: true,
        }
      }
    ]
  }
});

user.methods.addToCart = function(course) {
  const courseIndex = this.cart.items.findIndex(({ courseID }) => courseID.toString() === course._id.toString());
  if (courseIndex !== -1) {
    this.cart.items[courseIndex].count += 1;
  } else {
    this.cart.items.push({ courseID: course._id });
  }
  return this.save();
}

user.methods.deleteFromCart = function(id) {
  let copiedCart = [...this.cart.items];
  const index = copiedCart.findIndex(({ courseID }) => courseID.toString() === id.toString());
  if (copiedCart[index].count === 1) {
    copiedCart = copiedCart.filter(({ courseID }) =>  courseID.toString() !== id.toString());
  } else {
    copiedCart[index].count -= 1;
  }
  this.cart.items = copiedCart;
  return this.save();
}

user.methods.clearCart = function() {
  this.cart.items = [];
  return this.save();
}

export default model('User', user);