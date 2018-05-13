import mongoose from 'mongoose';

const UserInfoSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    currency: {type: String, required: true},
    defaultAccount: {type: String, required: true}
});

UserInfoSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v;
        delete ret.user;
        delete ret.id;
        delete ret._id;
    }
});

export default mongoose.model("UserInfo", UserInfoSchema);