import mongoose from 'mongoose'

const bloodStoreSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    donor: {
      type: String,
      required: true,
    },
    anyDisease : {
      type : String,
    },
    aadhar: {
      type: Number,
      required: true,
    },
    blood_group: {
      type: String,
      required: true,
    },
    donateDate : {
     type : Date,
       default : Date.now()
    },
    active:{
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const BloodStoreModel = mongoose.model('bloodStore', bloodStoreSchema)
export default BloodStoreModel
