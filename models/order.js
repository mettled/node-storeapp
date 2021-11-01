import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const order = Schema({
  courses: [{
    courseID: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    count: {
      type:  Number,
      default: 1,
    }
  }],
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    default: 0,
  }
})

export default model('Order', order);