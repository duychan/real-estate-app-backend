import mongoose from 'mongoose';

const { Schema } = mongoose;

const estateSchema = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, 'Owner is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    area: {
      type: Number,
      require: [true, 'Area is required'],
    },
    neighborHood: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'EstateTypeModel',
      required: [true, 'Type of estate is required'],
    },
    currentStatus: {
      type: Schema.Types.ObjectId,
      required: [true, 'Current status is required'],
      ref: 'EstateStatusModel',
    },
    coverImg: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    thumbnail: {
      type: [String],
    },
    bedRoom: {
      type: Number,
    },
    bathRoom: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EstateModel = mongoose.model('Estates', estateSchema);
export default EstateModel;