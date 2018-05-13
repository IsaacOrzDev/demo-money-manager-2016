import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: {type: String, required: true},
    balance: {type: Number, required: true},
    income: {type: Number, required: true},
    expense: {type: Number, required: true}
}, {
    toJSON: {
        getters: true
    },
    toObject: {
        getters: true
    }
});

AccountSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v;
        delete ret.user;
        ret.balance = (ret.balance / 100).toFixed(2);
        ret.income = (ret.income / 100).toFixed(2);
        ret.expense = (ret.expense / 100).toFixed(2);
        ret.id = ret._id.toString();
        delete ret._id;
    }
});

AccountSchema.path("balance").get((value) => {
    return (value / 100).toFixed(2);
});
AccountSchema.path("balance").set((value) => {
    return value * 100;
});
AccountSchema.path("income").get((value) => {
    return (value / 100).toFixed(2);
});
AccountSchema.path("income").set((value) => {
    return value * 100;
});
AccountSchema.path("expense").get((value) => {
    return (value / 100).toFixed(2);
});
AccountSchema.path("expense").set((value) => {
    return value * 100;
});

export default mongoose.model('Account', AccountSchema);